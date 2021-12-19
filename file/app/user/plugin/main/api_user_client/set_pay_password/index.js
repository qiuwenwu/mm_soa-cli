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

	var user = ctx.session.user;
	var user_id = user.user_id;
	var {
		phone,
		password_pay,
		code
	} = body;

	if (!code) {
		return $.ret.error(10000, "验证码是必填字段！");
	}

	// 短信验证码判断
	var key = "code_pay_password_" + phone;
	var value = await $.cache.get(key);
	if (!value) {
		return $.ret.error(10000, '请先发送验证码！');
	}
	var json = value.toJson();
	// if (code !== json.code) {
	// 	return $.ret.error(30000, '验证码不正确！');
	// }

	if (!password_pay) {
		return $.ret.error(10000, "支付密码是必填字段！");
	} else if (!phone) {
		return $.ret.error(10000, "手机号码是必填字段！");
	}

	var db1 = db.new("user_account", "user_id");

	// console.log("修改操作", user_id, password_pay, db1.sql, db1.error);
	var password_pay = (password_pay + user.salt).md5();
	var bl = await db1.set({
		user_id
	}, {
		password_pay
	});

	if (bl > 0) {
		user.password_pay = password_pay;
		ctx.session.user = user;
		return $.ret.bl(true, "支付密码修改成功！");
	}
	return $.ret.bl(false, "支付密码修改失败！");

};

exports.main = main;
