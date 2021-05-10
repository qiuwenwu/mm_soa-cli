// 加载数据库模块
const {
	Mysql
} = require("mm_mysql");

// 创建表
const create_table = require("./db/create_table.js");

// 修改权限表
const set_auth_table = require("./db/set_auth_table.js");

// 添加数据
const add_data = require("./db/add_data.js");

// 获取mysql配置
var cg = $.config.mysql;

// 列表集
var list_tables = ["access_token", "ad", "address", "article", "article_type", "auth", "cart", "collect", "comment",
	"forum", "forum_type", "goods", "goods_type", "link", "message", "nav", "notice", "order", "praise", "score",
	"slides", "upload", "user", "user_group"
];

/**
 * 第一步，创建数据库
 * @param {Object} db_src 数据库管理(源)
 * @param {Object} model 模型
 */
async function create_db(db_src, model) {
	$.log.info("********  开始刷数据库  ********");
	
	// 取出数据库名
	var db_name = model.order.order_number;

	// 准备工作，创建并连接新的数据库
	var mysql = await ready(db_src, db_name);
	
	// 建立数据模型
	var {
		auth,
		tables
	} = model;

	// 表
	for (var i = 0; i < tables.length; i++) {
		var table = tables[i];
		create_table(mysql, table);
	}
	
	// 建立数据库操作
	var db = mysql.db();
	
	// 列表集
	var lt = [...list_tables];

	// 构建表
	for (var i = 0; i < lt.length; i++) {
		var table = lt[i];
		// 创建数据库
		await db.run("DROP TABLE `" + table + "`");
		// 创建数据表
		await db.run("CREATE TABLE " + db_name + "." + table + " LIKE changsheng." + table);
		// 添加表
		var bl = await db.run("insert into " + db_name + "." + table + " select * from changsheng." + table);
		if (!bl) {
			console.error(db.error);
			break;
		}
	}
	
	// 建立数据库操作2
	var db2 = mysql.db();
	db2.table = "user_group";

	// 权限
	for (var i = 0; i < auth.length; i++) {
		var o = auth[i];
		var name = o.name;
		// 数据库操作2添加
		await db2.add({
			name
		});
		if (o.power) {
			var power = o.power.toJson();
			await set_auth_table(db, power, name, tables);
		}
	}

	/**
	 * 添加数据
	 */
	await add_data(db_src, db, model);

	$.log.info("********  结束刷数据库  ********");
}

/**
 * 准备工作，创建并连接新的数据库
 * @param {Object} db 数据库管理器
 * @param {Object} db_name 名称
 */
async function ready(db, db_name) {
	// 创建新数据库
	var bl = await db.run("create database " + db_name + ";");
	// 连接数据库
	var mysql = new Mysql(db_name, __dirname);
	mysql.config = {
		// 服务器地址
		host: cg.host,
		// 端口号
		port: cg.port,
		// 连接用户名
		user: cg.user,
		// 连接密码
		password: cg.password,
		// 数据库
		database: db_name,
		// 是否支持多个sql语句同时操作
		multipleStatements: true
	};
	mysql.open();
	return mysql;
}

module.exports = create_db;
