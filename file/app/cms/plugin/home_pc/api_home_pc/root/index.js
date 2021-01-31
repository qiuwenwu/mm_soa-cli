const tpl_dir = "../../static/template/{0}/".fullname(__dirname);

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

		var model = await $.home.model(ctx, db, name, tpl_dir);
		if (model) {
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
				for (var i = 0; i < list_channel.length; i++) {
					var o = list_channel[i];
					if (o.father_id === father_id) {
						ids += "," + o.channel_id
					}
				}

				// console.log("产品相关频道ID", ids);
				if (ids) {
					ids = ids.replace(",", "");
					model.list_product_latest = await db.run(
						`select * from cms_article where channel_id in (${ids}) AND lang = '${model.sys_lang}'`);
				}

				// 获取最近事件
				var channel_id = list_channel.getVal('channel_id', {
					name: 'event'
				});

				// console.log("事件频道ID", channel_id);
				if (channel_id) {
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
			return db.tpl.view(model.file, model);
		}
	}
	return null;
}

exports.main = main;
