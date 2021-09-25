// 集合路由、导航，不开发前端的情况下可以将以下2行注释掉
// const nav = $.nav_admin('{0}');
// nav.update();
$.conf = {};
/**
 * 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	// 获取请求参数
	var req = ctx.request;
	var {
		query,
		body
	} = req;
	var dict = {};
	db.table = query.app + "_config";
	db.size = 0;

	// 操作sql模板
	var list = await db.get();
	for (var i = 0; i < list.length; i++) {
		var o = list[i];
		if (o.type === "number") {
			dict[o.name] = Number(o.value || '0');
		} else if (o.type === "boolean") {
			dict[o.name] = Boolean(o.value || 'false');
		} else if (o.type === "object" || o.type === "array") {
			dict[o.name] = o.value.toJSON();
		} else {
			dict[o.name] = o.value;
		}
	}
	$.cache.set("app_" + db.table, JSON.stringify(dict));
	return $.ret.obj(dict);
};

exports.main = main;
