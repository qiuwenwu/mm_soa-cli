/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	// 获取请求参数
	var req = ctx.request;
	var body = Object.assign({}, req.query, req.body);
	if (body.password == body.password_old) {
		return $.ret.error(30000, "原密码（password）不能和新密码（password_old）相同！");
	}

	db.table = "user_account";
	db.key = "user_id";
	var user = ctx.session.user;
	var user_id = user.user_id;
	var obj = await db.getObj({
		user_id
	});
	if (obj) {
		var pass = (body.password_old + obj.salt).md5();
		if (obj.password !== pass) {
			return $.ret.error(30000, '修改密码失败！原因：原密码错误！');
		}
		var password = (body.password + obj.salt).md5();
		obj.password = password;
		var ret = await $.pool.api['user_client'].get('user_sign_out').main(ctx, db);
		return $.ret.bl(true, '修改密码成功！');
	} else {
		return $.ret.bl(false, '修改密码失败！原因：当前用户不存在！');
	}
};

exports.main = main;
