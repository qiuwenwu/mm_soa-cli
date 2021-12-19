/**
 * 转为表ID
 * @param {String} table 表名
 */
function to_table_id(table) {
	var arr = table.split('_');
	return arr[arr.length - 1] + "_id";
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
	var q = req.query;

	if (q["method"] === "add" || q["method"] === "set") {
		var body = req.body;
		var word = body.name;
		if (!body.name) {
			db.table = "dev_dict";
			var obj = await db.getObj({
				zh: word
			});
			if (obj) {
				body.name = obj;
			} else {
				var ret = await $.translate(word);
				var json = ret.result;
				if (json) {
					var en = json.dst.toLowerCase().replace(/ /g, "_").replace(/'s/g, "").replace(/-/g, "_").replace(/\./g, "").replace(
						/\?/g, "");
					body.name = en;
				}
			};
		}

		// 转换键名
		var name = body.name;
		if (name.indexOf("_id") !== -1) {
			var arr = name.split("_");
			if (arr.length > 2) {
				db.table = "dev_order_table";
				var tables = await db.run(
					"SELECT `order_id`,`title`,`name` FROM `dev_order_table` WHERE `order_id` in (SELECT `order_id` FROM `dev_order_table` WHERE `table_id` = " +
					body.table_id + ")");

				tables = tables.sort(function(o1, o2) {
					return o2.title.length - o1.title.length
				});
				var title = body.title.toLocaleUpperCase();
				for (var i = 0; i < tables.length; i++) {
					var o = tables[i];
					if (title.indexOf(o.title + "ID") !== -1) {
						name = to_table_id(o.name);
					}
				}
			}
			body.name = name;
		}
	}
	return await this.sql.run(q, req.body, db);
};

exports.main = main;
