const tpl_dir = "../../static/".fullname(__dirname);
const tpl_file = tpl_dir + '{0}.html';

$.home = {
	async model(ctx, db, file, dir) {
		var path = ctx.path;

		// 获取系统配置
		db.table = "sys_config";
		db.size = 0;
		var arr_config = await db.get({}, "", "`name`,`value`");
		var config = {};
		if (arr_config.length) {
			for (var i = 0; i < arr_config.length; i++) {
				var o = arr_config[i];
				config[o.name] = o.value;
			}
		}

		var theme_style = ctx.cookies.get("theme_style") || config.theme_style || 'default';
		var theme_color = ctx.cookies.get("theme_color") || config.theme_color || 'blue';

		// 获取当前的语言包
		var sys_lang = ctx.cookies.get("sys_lang") || config.sys_lang || 'zh_cn';
		db.table = "sys_lang";
		var arr_lang = await db.get({}, "", "`key`" + ",`" + sys_lang + "`");
		var lang = {};
		if (arr_lang.length) {
			for (var i = 0; i < arr_lang.length; i++) {
				var o = arr_lang[i];
				lang[o.key] = o[sys_lang];
			}
		}

		// 获取seo配置
		db.table = "sys_seo";
		var arr_seo = await db.get({});
		var seo = {};
		if (arr_seo.length) {
			for (var i = 0; i < arr_seo.length; i++) {
				var o = arr_seo[i];
				if (path === o.path || (path !== '/' && path.indexOf(o.path) !== -1)) {
					seo = o;
				}
			}
		}


		// 获取导航
		db.table = "sys_nav";
		var sys_nav = await db.get({});
		var nav = {};
		if (sys_nav.length) {
			for (var i = 0; i < sys_nav.length; i++) {
				var o = sys_nav[i];
				if (o.position) {
					if (!nav[o.position]) {
						nav[o.position] = [];
					}
					nav[o.position].push(o);
				}
			}
		}

		// 获取广告
		db.table = "sys_ad";
		var sys_ad = await db.get({});
		var ad = {};
		if (sys_ad.length) {
			for (var i = 0; i < sys_ad.length; i++) {
				var o = sys_ad[i];
				if (o.type) {
					if (!ad[o.type]) {
						ad[o.type] = [];
					}
					ad[o.type].push(o);
				}
			}
		}

		var sys_language;
		switch (sys_lang) {
			case "zh_tw":
				sys_language = "繁體中文";
				break;
			case "ja":
				sys_language = "日本語";
				break;
			case "ko":
				sys_language = "한글";
				break;
			case "en":
				sys_language = "English";
				break;
			default:
				sys_language = "简体中文";
				break;
		}
		// 创建与view视图通讯的模型
		var model = {
			config: Object.assign(config, $.config),
			seo: Object.assign({
				title: $.config.sys.title + "门户",
				keywords: "mm home pc",
				description: "",
				content: "",
			}, seo),
			path,
			nav,
			ad,
			theme_style,
			theme_color,
			sys_lang,
			sys_language,
			lang,
			view: function(f, m) {
				return db.tpl.view(f.fullname(dir), Object.assign({}, model, m));
			}
		};
		return model
	}
}

/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	var path = ctx.path;
	if (path.indexOf('.') === -1) {
		// 抽取文件名
		var name = path.replace("/", "");
		if (!name) {
			name = "index";
		}
		var file = tpl_file.replace("{0}", name);
		if (!file.hasFile()) {
			return;
		}
		var model = await $.home.model(ctx, db, file, tpl_dir);

		// 获取所有频道
		db.table = "cms_article_channel";
		var list_channel = await db.get({});
		model.list_channel = list_channel;
		
		var query = Object.assign({}, ctx.request.query);
		if (name.indexOf("/list") !== -1 || name.indexOf("/channel") !== -1 || name.indexOf("/type") !== -1) {
			// 获取系统配置
			db.table = ("cms_" + name).replace("/list", "").replaceAll("/", "_");
			db.page = query.page || 1;
			db.size = query.size || 10;
			delete query.page;
			delete query.size;
			model.list = await db.get(query);
		} else if (name.indexOf("/view") !== -1 || name.indexOf("/form") !== -1) {
			// 获取系统配置
			db.table = ("cms_" + name).replace("/view", "").replace("/form", "").replaceAll("/", "_");
			model.obj = await db.getObj(query);
		}

		if (list_channel.length) {
			var oj = list_channel.getObj({
				name: 'product'
			});
			var father_id = list_channel.getVal('channel_id', {
				name: 'product'
			});
			// console.log("产品频道ID", father_id);
			
			// 获取最近产品
			var ids = "";
			for(var i = 0; i < list_channel.length; i++){
				var o = list_channel[i];
				if(o.father_id === father_id){
					ids += "," + o.channel_id
				}
			}
			
			// console.log("产品相关频道ID", ids);
			if(ids){
				ids = ids.replace(",", "");
				model.list_product_latest = await db.run(`select * from cms_article where channel_id in (${ids}) AND lang = '${model.sys_lang}'`);
			}

			// 获取最近事件
			var channel_id = list_channel.getVal('channel_id', {
				name: 'event'
			});
			
			// console.log("事件频道ID", channel_id);
			if(channel_id){
				db.table = "cms_article";
				model.list_event_latest = await db.get({
					lang: model.sys_lang,
					channel_id
				});
			}
		} else {
			model.list_product_latest = [];
			model.list_event_latest = [];
		}
		return db.tpl.view(file, model);
	}
	return null;
}

exports.main = main;
