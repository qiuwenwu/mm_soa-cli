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
	
	// 服务人数
	var db1 = Object.assign({} ,db);
	db1.table = $.utils.table_name.user();
	var user_count = await db1.count({});
	
	// 运营时间
	var operation_time = await $.utils.config.getValue("operation_time");
	
	// 交易数
	var db2 = Object.assign({} ,db);
	db2.table = $.utils.table_name.order();
	var order_count = await db2.count({});
	
	return $.ret.obj({user_count ,operation_time ,order_count});
};

exports.main = main;
