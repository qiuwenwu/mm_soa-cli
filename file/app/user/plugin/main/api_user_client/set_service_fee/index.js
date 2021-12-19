// 集合路由、导航，不开发前端的情况下可以将以下2行注释掉
// const nav = $.nav_admin('{0}');
// nav.update();

/**
 *  接口主函数
 *  @param {Object} ctx HTTP上下文
 *  @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 *  @return {Object} 执行结果
 */
async function main(ctx, db) {
	// 获取请求参数
	let req = ctx.request;
	let {
		query,
		body
	} = req;

	let user = ctx.session.user;

	if (!user) {
		return $.ret.error(10000, "用户未登录!");
	}

	let {
		user_id,
		service_fee
	} = body;

	if (!user_id) {
		return $.ret.error(10000, "目标对象不能为空!");
	}

	if (!service_fee && service_fee !== 0) {
		return $.ret.error(10000, "要修改的管理费不能为空!");
	}

	let db1 = db.new("user_account");

	// 判断GM等级
	if (user.gm < 1) {
		let count = await db1.count({
			user_id,
			"referee_id": user.user_id
		});
		// 非GM判断是否是下属
		if (count < 1) {
			return $.ret.error(10000, "目标不属于您的下属用户，您无权修改!");
		}
	}

	// 修改
	let bl = await db1.set({
		user_id
	}, {
		service_fee
	});

	let ret = $.ret.bl(true, "修改成功!");
	if (bl < 1) {
		ret = $.ret.error(10000, "修改失败!");
	}
	return ret;
};

exports.main = main;
