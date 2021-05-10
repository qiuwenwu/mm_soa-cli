const Auto_db = require('./auto_db.js');
const Auto_file = require('./auto_file.js');

var auto_db = new Auto_db();
var auto_file = new Auto_file();

/**
 * 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	var body;
	// 获取请求参数
	var req = ctx.request;
	var q = req.query;
	db.table = "dev_" + q.table;
	method = q.method || "";
	switch (method) {
		case "":
		case "get":
			q = Object.assign({}, q);
			delete q.method;
			delete q.table;
			var list = await db.get(q);
			body = $.ret.list(list);
			break;
		case "set":
			q = Object.assign({}, q);
			delete q.method;
			delete q.table;
			var bl = await db.set(q, req.body);
			body = $.ret.bl(bl);
			break;
		case "update_db":
			body = await auto_db.run(q, req.body, db);
			break;
		case "update_file":
			body = await update_file.run(q, req.body, db);
			break;
		default:
			break;
	}
	return body;
	// 操作sql模板
	// var ret = await this.sql.run(req.query, req.body, db);
	// return ret;
};

exports.main = main;
