/**
 * 新建配置原
 * @param {Object} config 已设置配置
 * @param {String} path 页面路径
 */
function new_option(config, path) {
	var op = {};
	if (config.examine !== "无" && path == "table") {
		op.examine = true;
	}
	if (config.pay !== "无") {
		if (path == "list" || path == "details") {
			op.pay = true;
		}
	}
	if (config.print) {
		op.print = true;
	}
	if (config.import_db && path == "table") {
		op.import_db = true;
	}
	if (config.export_db && path == "table") {
		op.export_db = true;
	}
	if (config.comment) {
		if (path == "view") {
			op.can_show_comment = true;
		} else if (path == "details") {
			op.can_show_comment = true;
			op.can_comment = true;
		}
	}
	if (config.score && (path == "view" || path == "details")) {
		if (path == "view") {
			op.can_show_score = true;
		} else if (path == "details") {
			op.can_show_score = true;
			op.can_score = true;
		}
	}
	return op;
}


/**
 * 新建权限模型
 * @param {Number} table_id 表ID
 * @param {String} mod_name 模块名
 * @param {String} table_name 表名
 * @param {String} path 路径
 * @param {String} page_title 页面标题
 * @param {String} table_nav 跨表
 * @param {String} table_nav_name 跨表导航
 * @return {Object}
 */
function new_model(table_id, mod_name, table_name, path, page_title, table_nav, table_nav_name) {
	var obj = {
		// 权限名
		"table_id": table_id,
		// 权限名
		"mod_name": mod_name,
		// 表名
		"table_name": table_name,
		// 允许访问路径
		"path": path,
		// 页面名
		"page_title": page_title,
		"all": true,
		"add": (path == 'list' || path == 'view') ? false : true,
		"del": (path == 'list' || path == 'view') ? false : true,
		"set": (path == 'list' || path == 'view') ? false : true,
		"get": true,
		// 跨表查询
		"table_nav": table_nav,
		// 跨表名称
		"table_nav_name": table_nav_name,
		// 附加项
		"option": {},
		"field_add": [],
		"field_del": [],
		"field_set": [],
		"field_get": []
	};
	if (table_nav_name) {
		var nav = {}
		var arr_name = table_nav_name.split(" ");
		var arr_table = table_nav.split(" ");

		for (var i = 0; i < arr_name.length; i++) {
			var name = arr_name[i];
			if (arr_table.length > i) {
				nav[name] = arr_table[i];
			}
		}

		obj.nav = nav;
	}
	return obj;
};


/**
 * 初始配置模型
 * @param {Object} option 配置
 * @return {Object} 返回新模型
 */
function model_option(option) {
	return Object.assign({
		examine: "无",
		pay: "无",
		print: false,
		import_db: false,
		export_db: false,
		comment: false,
		score: false
	}, option)
}


/**
 * 新建权限
 * @param {Object} db 数据库管理器
 * @param {Number} order_id 订单ID
 */
async function new_auth(db, order_id) {
	db.table = "dev_order_table";
	var list_mod = await db.get({
		order_id
	});
	var auth = [];
	var ids = [];
	var has_collect = false;
	var has_cart = false;
	var has_comment = false;
	for (var i = 0; i < list_mod.length; i++) {
		var o = list_mod[i];
		var config = o.config;
		ids.push(o.table_id);
		var cg = config ? config.toJson() : {};

		if (cg.collect) {
			has_collect = true;
		}

		if (cg.cart_page !== "无") {
			has_cart = true;
		}

		if (cg.has_comment !== "无") {
			has_comment = true;
		}

		var model = new_model(o.table_id, o.title, o.name, "table", o.title, "");
		model.option = new_option(cg, "table");
		auth.push(model);

		if (cg.details_page !== "无") {
			var model = new_model(o.table_id, o.title, o.name, "view", o.title + "详情", "");
			model.option = new_option(cg, "view");
			auth.push(model);
		}
		if (cg.list_page !== "无" && cg.list_page !== '有列表') {
			var model2 = new_model(o.table_id, o.title, o.name, "list", o.title, cg.table_nav_name);
			model2.option = new_option(cg, "list");
			auth.push(model2);
		}
		if (cg.details_page !== "无" && (cg.details_page.indexOf("前") !== -1 || cg.details_page.indexOf("登") !== -
				1)) {
			var model2 = new_model(o.table_id, o.title, o.name, "details", o.title + "详情", cg.table_nav_name);
			model2.option = new_option(cg, "details");
			auth.push(model2);
		}
	}
	if (has_collect) {
		var model_list = new_model(0, "我的收藏", "collect", "list", "我的收藏", "");
		auth.push(model_list);
	}
	if (has_cart) {
		// 后台
		var model_table = new_model(0, "订单", "order", "table", "订单列表", "");
		model_table.option = new_option(model_option({
			print: true,
			export_db: true
		}), "table");
		auth.push(model_table);
		var model_view = new_model(0, "订单", "order", "view", "订单详情", "");
		model_view.option = new_option(model_option({
			print: true
		}), "view");
		auth.push(model_view);

		// 前台
		model_list = new_model(0, "订单", "order", "list", "我的订单", "");
		auth.push(model_list);
		model_details = new_model(0, "订单", "order", "details", "订单详情", "");
		model_details.option = new_option(model_option({
			comment: true,
			score: true
		}), "details");
		auth.push(model_details);


		// 后台
		model_table = new_model(0, "商品", "goods", "table", "商品列表", "");
		model_table.option = new_option(model_option({
			print: true,
			import_db: true,
			export_db: true
		}), "table");
		auth.push(model_table);
		model_view = new_model(0, "商品", "goods", "view", "商品详情", "");
		model_view.option = new_option(model_option({
			print: true
		}), "view");
		auth.push(model_view);

		// 前台
		model_list = new_model(0, "商品", "goods", "list", "商品列表", "");
		auth.push(model_list);
		model_details = new_model(0, "商品", "goods", "details", "商品详情", "");
		model_details.option = new_option(model_option({
			comment: true,
			score: true
		}), "details");
		auth.push(model_details);

		// 前台
		model_list = new_model(0, "收货地址", "address", "list", "收货地址", "");
		auth.push(model_list);
		model_details = new_model(0, "收货地址", "address", "details", "地址详情", "");
		auth.push(model_details);
	}
	if (has_comment) {
		// 后台
		var model_table = new_model(0, "评论", "comment", "table", "评论列表", "");
		auth.push(model_table);
		var model_view = new_model(0, "评论", "comment", "view", "评论详情", "");
		auth.push(model_view);

		// 前台
		var model_list = new_model(0, "评论", "comment", "list", "我的评论", "");
		auth.push(model_list);
		var model_details = new_model(0, "评论", "comment", "details", "评论详情", "");
		auth.push(model_details);
	}
	db.table = "dev_order";
	var order = await db.getObj({
		order_id
	});
	if (order && order.config) {
		var config = order.config.toJson();
		if (config.bbs_name) {
			// 后台
			var model_table = new_model(0, "论坛", "forum", "table", "论坛列表", false);
			model_table.option = new_option(model_option({
				print: true,
				import_db: true,
				export_db: true
			}), "table");
			auth.push(model_table);
			var model_view = new_model(0, "论坛", "forum", "view", "论坛详情", false);
			model_view.option = new_option(model_option({
				print: true
			}), "view");
			auth.push(model_view);

			// 前台
			model_list = new_model(0, "论坛", "forum", "list", "论坛", false);
			auth.push(model_list);
			model_details = new_model(0, "论坛", "forum", "details", "论坛详情", false);
			model_details.option = new_option(model_option({
				comment: true
			}), "details");
			auth.push(model_details);

			// 后台
			model_table = new_model(0, "论坛分类", "forum", "table", "论坛分类列表", false);
			auth.push(model_table);
			model_view = new_model(0, "论坛分类", "forum", "view", "论坛分类详情", false);
			auth.push(model_view);
		}
	}
	return {
		auth,
		ids
	}
}

/**
 * 获取授权
 * @param {Object} obj
 * @param {Array} arr
 * @return {Object} 返回权限集合
 */
function get_auth(obj, arr) {
	var table_nav_name = obj.table_nav_name;
	var mod_name = obj.mod_name;
	for (var i = 0; i < arr.length; i++) {
		var o = arr[i];
		if (o.table_name === obj.table_name && o.path === obj.path) {
			obj.field_add = [];
			obj.field_set = [];
			obj.field_del = []
			$.push(obj, Object.assign({}, o));
			obj.table_nav_name = table_nav_name;
			obj.mod_name = mod_name;
			break;
		}
	}
	return obj;
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
	var query = req.query;
	if (!query.method || query.method === "get") {
		var json = await this.sql.run(query, req.body, db);
		var res = json.result;
		if (res) {
			var list = res.list;
			if (!list.length) {
				db.table = "dev_order_auth";
				var index = await db.add({
					name: "管理员",
					order_id: query.order_id
				});
				if (index > 0) {
					var obj = await db.getObj({
						auth_id: index
					});
					if (obj) {
						list.push(obj);
					}
				}

				var index_2 = await db.add({
					name: "游客",
					order_id: query.order_id
				});
				if (index_2 > 0) {
					var obj = await db.getObj({
						auth_id: index_2
					});
					if (obj) {
						list.push(obj);
					}
				}
			}

			if (list.length) {
				var {
					auth,
					ids
				} = await new_auth(db, query.order_id);
				res.ids = ids;

				res.list = list.map((o) => {
					o.auth = [];
					if (o.power) {
						let arr = o.power.toJson();
						for (var i = 0; i < auth.length; i++) {
							var item = get_auth(Object.assign({}, auth[i]), arr);
							o.auth.push(item);
						}
					} else {
						for (var i = 0; i < auth.length; i++) {
							var item = get_auth(Object.assign({}, auth[i]), []);
							o.auth.push(item);
						}
					}

					delete o.power;
					return o;
				});
			}
		}
		return json
	} else if (query.method === "set") {
		var body = req.body;
		body.power = body.auth ? JSON.stringify(body.auth) : "[]";
		delete body.auth;
		return await this.sql.run(query, body, db);
	} else {
		return await this.sql.run(query, req.body, db);
	}
};

exports.main = main;
