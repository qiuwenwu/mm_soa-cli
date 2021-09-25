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
	if (query.method !== "get") {
		var user = ctx.user;
		if (user) {
			if (query.method == "add") {
				body.user_id = user.user_id;
			}
			else if (query.method == "set") {
				query.user_id = user.user_id;
			}
		} else {
			$.ret.error(60000, "请先登录！");
		}
	}
	var ret = await this.sql.run(query, body, db);
	return ret;
};

exports.main = main;
