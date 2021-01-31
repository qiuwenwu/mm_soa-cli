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
	db.table = "user_account";
	db.key = "user_id";
	var user = ctx.session.user;
	var user_id = user.user_id;
	var obj = await db.getObj({
		user_id
	});
	if (obj) {
		var password = (body.password + obj.salt).md5();
		obj.password = password;
		var ret = await $.pool.api['user_client'].get('user_sign_out').main(ctx, db);
		return $.ret.bl(true, '修改密码成功！');
	} else {
		return $.ret.bl(false, '修改密码失败！原因：当前用户不存在！');
	}
};

exports.main = main;
