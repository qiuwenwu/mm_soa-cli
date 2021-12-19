$.check_app = async function(db, apikey) {
	if (!apikey) {
		return $.ret.error(30000, "apikey不能为空！");
	}
	var db1 = db.new("sys_app");
	var app = await db1.getObj({
		apikey
	});
	if (!app) {
		return $.ret.error(10000, "应用不存在！");
	}

	if (app.times_today > app.times_allow) {
		return $.ret.error(10000, "今日请求已达上限！");
	}

	app.times_count += 1;
	app.times_today += 1;
	return null;
}

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

	var {
		user_id,
		apikey
	} = query;

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

	return $.ret.body({
		balance: u.coin
	});
};

exports.main = main;
