/**
 * 第一步2，创建数据表
 * @param {Object} mysql 数据库管理
 * @param {Object} table 数据表
 */
async function create_table(mysql, table) {
	var db = mysql.db();
	var table_name = table.name;
	var arr = table_name.split("_");
	var key = arr[arr.length - 1] + "_id";
	
	var bl = await db.run("DROP TABLE `" + table_name + "`");

	// 自增主键
	var field_str = db.escapeId(key) + " INT UNSIGNED AUTO_INCREMENT COMMENT '" + table.title + "ID',\n";
	var fields = table.fields;

	// 循环拼接字段
	for (var i = 0; i < fields.length; i++) {
		var o = fields[i];
		if (o.name) {
			field_str += get_sql(db, o) + ",\n";
		}
	}
	
	// 字段添加
	var cg = table.config;
	if (cg) {
		if (cg.click_num) {
			field_str += "`hits` int(11) DEFAULT 0 NOT NULL comment '点击数',\n";
		}

		if (cg.examine) {
			field_str += "`examine_state` varchar(16) DEFAULT '未审核' NOT NULL comment '审核状态',\n";
			field_str += "`examine_reply` varchar(255) DEFAULT '' comment '审核回复',\n";
		}

		if (cg.pay) {
			field_str += "`pay_state` varchar(16) DEFAULT '未支付' NOT NULL comment '支付状态',\n";
			field_str += "`pay_type` varchar(16) DEFAULT '' comment '支付类型: 微信、支付宝、网银',\n";
		}

		if (cg.recommend) {
			field_str += "`recommend` int(11) DEFAULT '0' NOT NULL comment '智能推荐',\n";
		}

		if (cg.cart_page && cg.cart_page !== "无") {
			field_str += "`goods_id` int(11) DEFAULT '0' NOT NULL comment '关联商品ID',\n";
		}
	}

	field_str +=
		"`create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',\n `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',\n";

	// 创建数据表
	var sql =
		`CREATE TABLE ${table_name}(
	   ${field_str}
	   PRIMARY KEY (${key})
	)ENGINE=InnoDB DEFAULT CHARSET=utf8 comment '${table.title}';`;

	var bl = await db.exec(sql);
	if (bl <= 0) {
		console.error(sql)
		console.error(db.error)
	}
}

/**
 * 获取数据类型
 * @param {Object} db 数据库
 * @param {Object} o 类型
 */
function get_sql(db, o) {
	var str = "";
	switch (o.type) {
		case "文本":
			str = "varchar(64)"
			break;
		case "数字":
			str = "int(11) DEFAULT 0"
			break;
		case "图片":
			str = "varchar(255)"
			break;
		case "编辑":
			str = "longtext"
			break;
		case "多文本":
			str = "text"
			break;
		case "日期":
			str = "date"
			break;
		case "日长":
			str = "datetime"
			break;
		case "时间":
			str = "time"
			break;
		case "文件":
			str = "varchar(255)"
			break;
		case "下拉":
			str = "varchar(64)"
			break;
		case "下寻":
			str = "varchar(64)"
			break;
		case "下随":
			str = "varchar(64)"
			break;
		case "密码":
			str = "varchar(64)"
			break;
		case "手机":
			str = "varchar(16)"
			break;
		case "电话":
			str = "varchar(16)"
			break;
		case "邮箱":
			str = "varchar(125)"
			break;
		case "网址":
			str = "varchar(255)"
			break;
		case "账号":
			str = "varchar(64)"
			break;
		case "UID":
			str = "int(11) DEFAULT 0"
			break;
		default:
			str = "varchar(255)"
			break;
	}
	var str_end = "";

	// 唯一标识
	if (o.unique) {
		switch (o.unique) {
			case "非空":
				str_end = " NOT NULL";
				break;
			case "去重":
				str_end = " NOT NULL UNIQUE";
				break;
				// case "自动":
				// 	str_end = " NOT NULL UNIQUE";
				// 	break;
			default:
				if (str.indexOf("int") !== -1) {
					str_end += " NOT NULL";
				}
				break;
		}
	}
	return db.escapeId(o.name) + " " + str + str_end + ` comment '${o.title}'`;
}

module.exports = create_table;