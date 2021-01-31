// 集合路由、导航，不开发前端的情况下可以将以下2行注释掉
// const nav = $.nav_admin('{0}');
// nav.update();

/**
 * 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	// 获取请求参数
	var req = ctx.request;
	var method = req.query.method;

	db.table = "user_account";
	var user = ctx.session.user;
	if (user) {
		var query = {
			user_id: user.user_id
		};
		if (method === "set" || method === "submit") {
			var body = $.push({
					"phone": '',
					"nickname": '',
					"email": '',
					"signature": '',
					"avatar": ''
				}, req.body);
			var bl = await db.set(query, body);
			return $.ret.bl(bl, bl > 0 ? '更新成功！' : '更新失败！原因:' + db.error.message);
		} else {
			db.key = 'user_id';
			var obj = await db.getObj(query);
			return $.ret.obj(obj);
		}
	}
};

exports.main = main;
