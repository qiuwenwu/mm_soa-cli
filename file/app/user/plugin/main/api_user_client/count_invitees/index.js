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
	if(!user){
		return $.ret.error(10000 ,"用户未登录！");
	}
	var user_id = user.user_id;
	
	var db1 = Object.assign({} ,db);
	db1.table = $.utils.table_name.account();
	var count = await db1.count({"referee_id": user_id})
	
	return $.ret.body({count});
};

exports.main = main;
