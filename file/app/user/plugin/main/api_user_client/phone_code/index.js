var Phone_code = require("./phone_code.js");

var phone_code = new Phone_code();

/**
 * 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	// 获取请求参数
	var req = ctx.request;
	db.table = "user_account";
	return await phone_code.run(req.query, db, ctx);
};

exports.main = main;
