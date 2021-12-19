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

	// 操作sql模板
	var m = query.method;
	
	var {
		apikey
	} = query;
	var {
		user_id,
		amount,
		way,
		note
	} = body;

	// 应用鉴权
	var ret = await $.check_app(db, apikey);
	if (ret) {
		return ret;
	}

	// 获取用户积分
	var db2 = db.new("user_count", "user_id");
	var u = await db2.getObj({
		user_id
	});
	if (!u) {
		return $.ret.error(10000, "用户不存在！");
	}

	if (u.coin < -amount) {
		return $.rett.error(10000, "账户余额不足！")
	}

	// 修改余额并记录
	u.coin += amount;
	
	var db1 = db.new("sys_app");
	var app = await db1.getObj({
		apikey
	});
	await $.flow(db, user_id, amount,`(${app.name}) ` + note, way, u.coin);
	$.log.info("第三方应用收支", "应用：" + app.name, "用户ID：" + user_id, "额度：" + amount, "余额：" + u.coin);
	
	// 响应结果
	var ret = $.ret.bl(true, "操作成功！");
	ret.result.amount = amount;
	ret.result.balance = u.coin;
	return ret;
};

exports.main = main;
