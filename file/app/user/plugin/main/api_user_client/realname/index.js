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
	// return "hello world" + JSON.stringify(body);

	console.log(body)
	const login_user = ctx.session.user
	const qy = {
		user_id: login_user.user_id
	};
	if (!login_user) {
		return $.ret.error(10000, '获取登录用户失败');
	}
	db.table = "user_info";
	let user_info = await db.getObj(qy);
	var obj = {
		//设置图片
		img_idcard_front: body.img_idcard_front,
		img_idcard_back: body.img_idcard_back,
		img_hand_held: body.img_hand_held,
		name: body.name,
		idcard: body.idcard,
		idcard_state: 2
	};
	var bl;
	if (user_info) {
		bl = await db.set(qy, obj);
	} else {
		bl = await db.add(Object.assign({}, qy, obj));
	}
	return bl > 0 ? $.ret.bl(true, "提交成功，请耐心等待审核") : $.ret.error(10000, "提交失败！" + JSON.stringify(db.error))
};

exports.main = main;
