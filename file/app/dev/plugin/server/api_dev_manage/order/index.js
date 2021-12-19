/**
 * 自动分配订单
 * @param {Object} db 数据库管理器
 * @param {Object} order 订单信息
 */
async function auto_dispense(db, order) {
	// 给该订单按算法分派给订单数少的技术员
	var db2 = Object.assign({}, db);
	db2.table = "user_account";
	var users = await db2.get({
		admin_id: 3,
		state: 1
	});
	var arr = users.map((o) => {
		return o.nickname;
	});
	var sql =
		"SELECT count(`order_id`) `count`,`handler` FROM `dev_order` WHERE `state` in (1, 3, 4) AND `handler` != '' GROUP BY `handler` ORDER BY `count` ASC";
	var orders = await db2.run(sql);
	var handler = "";
	
	for (var i = 0; i < users.length; i++) {
		var o = users[i];
		var obj = orders.getObj({
			handler: o.nickname
		});
		if (!obj) {
			handler = o.nickname;
			break;
		}
	}

	if (!handler) {
		if (orders.length) {
			handler = orders[0].handler
		} else if (users.length) {
			handler = users[0].nickname
		}
	}
	order.handler = handler;
	return order;
}

/**
 * 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	var req = ctx.request;
	var query = req.query;
	var method = query.method;
	var body = req.body;
	if (method === "add") {
		var date = new Date();
		var id = Math.ceil(Math.random() * 100000).toString();
		for (var i = 0; i < (6 - id.length); i++) {
			id += '0';
		}
		// 给订单一个ID
		body.order_number = "CS" + id + "_" + date.toStr("yyyyMMddhhmmss");

		// if (!body.handler) {
		// 	body.state = 2;
		// 	req.body = await auto_db(db, body);
		// }
	} else if (method === "set") {
		if (query.get_order) {
			delete query.get_order;
			var nickname = ctx.session.user.nickname;
			var sql =
				"SELECT `order_id` FROM `dev_order` WHERE `time_end` >= now() AND `state` < 5  AND `handler` = '" + nickname + "'";

			var db2 = Object.assign({}, db);
			var orders = await db2.run(sql);

			var num = 3;
			db2.table = "sys_config";
			var config = await db2.getObj({
				name: "order_num_max"
			});
			if (config && config.value !== '0' && !config.value) {
				num = Number(config.value) || 3
			}
			if (orders.length > num) {
				return $.ret.bl(false, '可接订单已达上限，请先完成手头上的订单！');
			}
			db.table = "dev_order";
			var list = await db.getSql("`time_end` >= now() AND `handler` = ''", "`time_end` ASC", null);
			if (list.length) {
				query.order_id = list[0].order_id;
				body.handler = nickname;
				body.state = 2;
			} else {
				return $.ret.bl(false, '没有可取订单！');
			}
		} 
		// else if (!body.handler) {
		// 	body.state = 2;
		// 	req.body = await auto_db(db, body);
		// }
	}

	return await this.sql.run(req.query, req.body, db);
}

module.exports.main = main;
