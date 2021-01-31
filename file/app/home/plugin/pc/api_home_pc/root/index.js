$.home = {
	async model(ctx, db, name, dir, table_prefix = "cms") {
		if(!dir){
			return null;
		}

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

		var theme_name = ctx.cookies.get("theme_name") || config.theme_name || 'default';
		var theme_color = ctx.cookies.get("theme_color") || config.theme_color || 'blue';
		
		var dir_default = (dir + '').replace("{0}", 'default');
		dir = dir.replace("{0}", theme_name);
		var file = name + '.html';
		var file_1 = dir + file;
		if(file_1.hasFile() !== -1){
			file = file_1;
		}
		else {
			var file_2 = file.fullname(dir_default);
			if(file_2.hasFile() !== -1){
				file = file_2;
			}
			else 
			{
				return null;
			}
		}
		
		var path = ctx.path;
		
		// 获取当前的语言包
		var sys_lang = ctx.cookies.get("sys_lang") || config.sys_lang || 'zh_cn';
		db.table = table_prefix + "_lang";
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
		db.table = table_prefix + "_nav";
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
		db.table = table_prefix + "_ad";
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
			config: Object.assign({ sys_lang_list: [] }, config, $.config),
			seo: Object.assign({
				title: $.config.sys.title + "门户",
				keywords: "mm home pc",
				description: "",
				content: "",
			}, seo),
			file,
			path,
			nav,
			ad,
			dir,
			dir_default,
			theme_name,
			theme_color,
			sys_lang,
			sys_language,
			lang,
			view: function(f, m) {
				var vm = Object.assign({}, model, m);
				return db.tpl.view(f.fullname(dir), vm) || db.tpl.view(f.fullname(dir_default), vm);
			}
		};
		return model;
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
		
	}
	return null;
}

exports.main = main;
