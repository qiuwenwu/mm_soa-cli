/**
 * 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	// 获取请求参数
	var req = ctx.request;
	var q = req.query;
	var qpp = q["app"] || "cms";
	db.table = qpp + "_lang";
	db.size = 0;
	var type = q["type"];
	var arr = await db.get({}, "", "`key`" + ",`" + type + "`");
	var dict = {};
	if (arr.length) {
		ctx.cookies.set('sys_lang', type);
		for (var i = 0; i < arr.length; i++) {
			var o = arr[i];
			dict[o.key] = o[type];
		}
	}
	return dict;
};

exports.main = main;
