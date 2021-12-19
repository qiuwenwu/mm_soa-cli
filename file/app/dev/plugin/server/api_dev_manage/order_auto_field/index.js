/**
 * 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	var req = ctx.request;
	var qy = req.query;
	var table = qy.table;
	
	var list = await db.run(
		"SELECT * FROM dev_order_field WHERE `table_id` IN (SELECT `table_id` FROM dev_order_table WHERE name='" +
		table + "') ORDER BY `field_id` DESC;"
	);
	if (db.error) {
		console.log(db.error)
	}
	
	var lt = [];

	for (var i = 0; i < list.length; i++) {
		var o = list[i];
		if (!lt.getObj({
				name: o.name
			})) {
			lt.add(o);
		}
	}

	return $.ret.list(lt);
};

exports.main = main;
