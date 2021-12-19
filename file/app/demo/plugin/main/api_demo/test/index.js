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
	var { user_id } = user;
	db.table = "user_count";
	var u = await db.getObj({
		user_id
	});
	
	u.coin += 1000;
	return $.ret.bl(true, "修改成功");
};

exports.main = main;
