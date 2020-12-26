const file =  '../../static/index.html'.fullname(__dirname);

/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	var path = ctx.path;
	if (path.indexOf('.') === -1) {
		var type = ctx.cookies.get('sys_lang') || 'en';
		db.table = "sys_lang";
		db.size = 0;
		var arr = await db.get({}, "", "`key`" + ",`" + type + "`");
		var lang = {};
		if (arr.length) {
			for (var i = 0; i < arr.length; i++) {
				var o = arr[i];
				lang[o.key] = o[type];
			}
		}
		
		$.globalBag.congfig = $.config;
		var model = {
			os: "mm",
			app: "home",
			plugin: "phone",
			title: $.config.sys.title + "门户",
			keywords: "mm home phone",
			description: "",
			content: "",
			lang
		};
		$.log.debug("路径" + path);
		return db.tpl.view(file, model);
	}
	return null;
}

exports.main = main;