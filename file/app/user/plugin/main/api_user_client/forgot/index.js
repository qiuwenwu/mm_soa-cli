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
	var {
		query,
		body
	} = req;

	var params = Object.assign({}, query, body);
	var {
		username,
		password,
		phone,
		code
	} = params;


	db.table = "user_account";
	db.key = "user_id";
	var user = await db.getObj({
		username
	});

	if (!user) {
		return $.ret.error(10000, "用户不存在");
	} else if (user.phone !== phone) {
		return $.ret.error(30000, "填写的手机号与账户绑定的不一致");
	}
	
	// 短信验证码判断
	var key = "code_forgot_" + phone;
	var value = await $.cache.get(key);
	if(!value){
		return $.ret.error(10000, '请先发送验证码！');
	}
	var json = value.toJson();
	if (code !== json.code) {
		return $.ret.bl(false, '验证码不正确！');
	}
	
	user.password = (password + user.salt).md5();
	
	return $.ret.bl(true, '密码重置成功！');
};

exports.main = main;
