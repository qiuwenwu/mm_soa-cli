// 给该订单按算法分派给订单数少的技术员
if (!body.handler) {
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
	body.handler = handler;
}
