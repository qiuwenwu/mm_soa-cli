var fs = require("fs");

const copy_file = require("./copy_file.js");

const create_file = require("./create_file.js");

const create_db = require("./auto_db.js");

const save_dir = "/app/dev/static/".fullname();

/**
 * 转为公式
 * @param {Object} o 对象
 * @param {Object} fields 字段
 * @param {Object} tables 表名
 */
function to_formula(compute, fields, tables) {
	if (compute) {
		compute = compute.replace(/：/g, ":").replace(/。/g, ".").replace(/；/g, ";");
		if (tables) {
			for (var i = 0; i < tables.length; i++) {
				var o = tables[i];
				compute = compute.replaceAll(o.title + ".", o.name + ".");
				var _fields = o.fields_sort;
				for (var n = 0; n < _fields.length; n++) {
					var f = _fields[n];
					compute = compute.replaceAll("." + f.title, "." + f.name);
				}
			}
		}
		if (fields) {
			for (var i = 0; i < fields.length; i++) {
				var o = fields[i];
				compute = compute.replaceAll(o.title, o.name);
			}
		}
	}
	return compute;
}

/**
 * 转为表ID
 * @param {String} table 表名
 */
function to_table_id(table) {
	var arr = table.split('_');
	return arr[arr.length - 1] + "_id";
}

/**
 * 转为sql语句
 * @param {Object} formula 公式
 * @return {Array} 返回sql语句数组
 */
function to_sql(formula, table) {
	var arr_sql = [];
	if (formula) {
		var arr = formula.split("\n");
		for (var i = 0; i < arr.length; i++) {
			var str = arr[i].trim();
			if (str) {
				var ar = str.split(":");
				if (ar.length > 1) {
					var set_str = ar[1].trim();
					var table_name = set_str.left(".");
					if (table_name === table) {
						table_name = where_str.between("=", ".").trim();
					}
					var where_str = table + "." + to_table_id(table);
					var field = ar[0];
					if (field.indexOf(table_name) !== -1) {
						field = to_table_id(table_name);
					}
					var on_str = table_name + "." + field + "=" + table + "." + ar[0];
					var sql = "UPDATE `" + table_name + "`" + " INNER JOIN `" + table + "` ON " + on_str + " SET " +
						set_str +
						" WHERE " + where_str + "=";
					arr_sql.push(sql);
				}
			}
		}
	}
	return arr_sql;
}

/**
 * 转为sql查询语句
 * @param {Object} formula 公式
 * @return {Array} 返回sql语句数组
 */
function to_sql_if(formula, table) {
	var arr_sql = [];
	if (formula) {
		formula = formula.replace(/；/g, ";")
		var arr = formula.split("\n");
		for (var i = 0; i < arr.length; i++) {
			var text = arr[i];
			if (text) {
				var tip = text.right(";");
				if (tip) {
					var str = text.left(";");
					var ar = str.split(":");
					if (ar.length > 1) {
						var where_str = ar[1].trim();
						var table_name = where_str.left(".");
						if (table_name === table) {
							table_name = where_str.between("=", ".").trim();
						}
						var field = ar[0];
						if (field.indexOf(table_name) !== -1) {
							field = to_table_id(table_name);
						}
						var on_str = table_name + "." + field + "=" + table + "." + ar[0];
						var sql = "SELECT count(*) count FROM `" + table_name + "` WHERE " + on_str + " AND " +
							where_str + ";";
						arr_sql.push({
							table,
							sql,
							tip
						});
					}
				}
			}
		}
	}
	return arr_sql;
}

/**
 * 转为Vue计算语法
 * @param {String} name 名称
 * @param {String} formula 公式
 * @return {Object} vue
 */
function to_vue_compute(name, formula) {
	var arr = formula.split(" ");
	var str = "";
	for (var i = 0; i < arr.length; i++) {
		var f = arr[i];
		if (f == "+" || f == "-" || f == "*" || f == "/") {
			str += " " + f + " "
		} else {
			str += "this.form." + arr[i];
		}
	}
	return {
		name,
		formula: str
	};
}

/**
 * 转为Vue计算语法
 * @param {String} name 名称
 * @param {String} formula 公式
 * @return {Object} vue
 */
function to_check(name, formula) {
	var arr = formula.split(" ");
	var str = "";
	for (var i = 0; i < arr.length; i++) {
		var f = arr[i];
		if (f == "+" || f == "-" || f == "*" || f == "/") {
			str += " " + f + " "
		} else {
			str += "this.form." + arr[i];
		}
	}
	return {
		name,
		formula: str
	};
}

/**
 * 转为表名
 * @param {String} title 表标题
 * @param {Array} tables 表集
 * @return {String} 返回表名
 */
function to_name(title, tables) {
	var name = title;
	for (var i = 0; i < tables.length; i++) {
		var o = tables[i];
		name = name.replace(o.title, o.name);
	}
	return name;
}

/**
 * 补全配置
 * @param {Object} field 字段
 * @param {Array} tables 表格集合
 */
function full_config(obj, tables) {
	for (var i = 0; i < tables.length; i++) {
		var o = tables[i];
		if (obj.drop_down_table === o.title) {
			obj.dropdown_table = o.name;
			obj.drop_down_field = obj.drop_down_field.trim();
			for (var n = 0; n < o.fields_sort.length; n++) {
				var oj = o.fields_sort[n];
				if (obj.drop_down_field === oj.title) {
					obj.dropdown_field = oj.name;
					break;
				}
			}
			break;
		}
	}
}


/**
 * 过滤
 * @param {Object} model 模型
 * @return {Object} 成功返回null, 失败返回错误信息
 */
function add_filter(model) {
	var filter = {};

	// 获取模型 订单 和 表
	var {
		order,
		tables,
	} = model;

	if (!order) {
		return false;
	}

	var {
		config,
		tpl_home
	} = order;
	
	// 获取订单 配置
	var {
		bbs_name,
		cms,
		mall,
		training
	} = config;
	
	// 判断是否有论坛
	filter.forum = bbs_name;

	// 内容管理
	filter.cms = cms;

	// 商城
	filter.mall = mall;

	// 培训教育
	filter.training = training;

	// 获取其他模块
	var other = config.order;

	if (other) {
		// 公告
		filter.notice = other.indexOf("公告") !== -1;

		// 留言板
		filter.message = other.indexOf("留言板") !== -1;

		// 客服聊天
		filter.chat = other.indexOf("客服聊天") !== -1;
		
		filter.tpl_home = other.tpl_home;
	}

	// 表内容过滤
	for (var i = 0; i < tables.length; i++) {
		var cg = tables[i].config;

		// 是否带购物车
		if (cg.cart_page != "无") {
			filter.cart = true;
		}

		// 是否带评论页
		if (cg.comment) {
			filter.comment = true;
		}

		// 是否带收藏
		if (cg.collect) {
			filter.collect = true;
		}

		// 是否带点赞
		if (cg.praise) {
			filter.praise = true;
		}

		// 是否带注册
		if (cg.register == "前后注") {
			// 过滤注册
			filter.home_register = true;
			filter.admin_register = true;
		} else if (cg.register == "前注册") {
			// 过滤注册
			filter.home_register = true;
		} else if (cg.register == "后注册") {
			filter.admin_register = true;
		}
	}

	var arr = [];
	// 获取其他模块
	var other = config.order;

	// 公告
	if (!filter.notice) {
		arr.push("notice");
	}

	// 留言板
	if (!filter.message) {
		arr.push("message");
	}

	// 客服聊天
	if (!filter.chat) {
		arr.push("chat");
	}

	// 过滤购物车
	if (!filter.has_cart) {
		arr.push("cart");
	}

	// 过滤评论
	if (!filter.has_comment) {
		arr.push("comment");
	}

	// 过滤收藏
	if (!filter.has_collect) {
		arr.push("collect");
	}

	// 过滤点赞
	if (!filter.has_praise) {
		arr.push("praise");
	}

	model.filter = filter;
	model.filter_home = arr;
	model.filter_admin = [...arr];

	// 过滤注册页
	if (!filter.home_register) {
		model.filter_home.push("register");
	} else if (!filter.admin_register) {
		model.filter_admin.push("register");
	}
};

/**
 * 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	$.log.info("********  开始创建项目  ********");
	// console.log("创建项目");

	// 获取请求参数
	var req = ctx.request;
	var q = req.query;
	var order_id = q["order_id"];
	var ret;

	// 查询配置
	db.table = "dev_order";
	var order = await db.getObj({
		order_id
	});

	if (order) {
		if (order.config) {
			order.config = JSON.parse(order.config);
		} else {
			order.config = {};
		}

		// 压缩后的文件路径
		var zip_file = save_dir + order.order_number + '.zip';
		if (zip_file.hasFile()) {
			fs.unlinkSync(zip_file);
		}

		// 查询相关表
		db.table = "dev_order_table";
		db.page = 0;
		var tables = await db.get({
			order_id
		});

		// 查询相关字段
		db.table = "dev_order_field";

		for (var i = 0; i < tables.length; i++) {
			var o = tables[i];
			o.id = to_table_id(o.name);
			o.config = o.config ? o.config.toJson() : null;
			o.fields = await db.get({
				table_id: o.table_id
			});
			// 创建字段标题名称转换用的键值对
			o.fields_sort = o.fields.map(item => {
				return {
					title: item.title,
					name: item.name
				}
			}).sort(function(o1, o2) {
				return o2.title.length - o1.title.length;
			});
		}

		// 创建表格标题名称转换用的键值对
		var tables_sort = tables.map(item => {
			return {
				title: item.title,
				name: item.name,
				fields_sort: item.fields_sort
			}
		}).sort(function(o1, o2) {
			return o2.title.length - o1.title.length;
		});

		for (var i = 0; i < tables.length; i++) {
			var o = tables[i];

			// 存跨表计算式
			var arr_vue_compute = [];

			var table = o.config.table;
			if (table) {
				var name = to_name(table, tables_sort);
				o.config.table_name = name;
				var nav = [];
				var arr_table = name.split(' ');

				// 跨表操作转换(开始)
				var arr_name = o.config.table_nav_name.split(' ');
				for (var n = 0; n < arr_table.length; n++) {
					if (arr_name.length > n) {
						nav.push({
							table: arr_table[n],
							name: arr_name[n]
						});
					}
				}
				o.config.nav = nav;
				// 跨表操作转换(结束)
			}
			o.fields = o.fields.map(item => {
				full_config(item, tables_sort);
				item.formula = to_formula(item.compute, o.fields_sort);
				if (item.formula) {
					var vue_compute = to_vue_compute(item.name, item.formula);
					arr_vue_compute.push(vue_compute);
				}
				return item;
			});
			o.arr_vue_compute = arr_vue_compute;

			// 跨表计算转换(开始)
			o.formula = to_formula(o.config.compute, o.fields_sort, tables_sort);
			o.arr_sql = to_sql(o.formula, o.name);
			// 跨表计算转换(结束)

			// 条件转换(开始)
			o.formula_if = to_formula(o.config.if, o.fields_sort, tables_sort);
			o.arr_check = to_sql_if(o.formula_if, o.name);
			// 条件校验转换(结束)
		}

		// 查询相关权限
		db.table = "dev_order_auth";
		var auth = await db.get({
			order_id
		});

		// 模型
		var model = {
			order,
			tables,
			auth
		};

		// 添加过滤条件
		add_filter(model);

		// 第一步，创建数据库
		var message = await create_db(db, model);

		if (!message) {
			// 第二步，复制文件
			message = await copy_file(db, model);
			if (!message) {
				// 第三步，创建文件
				message = await create_file(db, model);
			}
		}

		if (message) {
			ret = $.ret.error(10000, message);
		} else {
			ret = $.ret.bl(true, "部署成功！");
		}
	} else {
		ret = $.ret.error(10000, "订单不存在！");
	}

	$.log.info("********  结束创建项目  ********");
	return ret;
};

exports.main = main;
