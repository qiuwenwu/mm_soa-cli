
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

	// 操作sql模板
	var m = query.method;
	if (m === "add") {
		var user = ctx.session.user;
		body.user_id = user.user_id;
	}
	var ret = await this.sql.run(query, body, db);
	return ret;
};

exports.main = main;
