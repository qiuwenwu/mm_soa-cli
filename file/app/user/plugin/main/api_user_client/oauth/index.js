var config = "./oauth.json".loadJson(__dirname);
const Oauth = require("./oauth.js");

var oauth = new Oauth(config);

/**
 * 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	// 获取请求参数
	var req = ctx.request;
	return oauth.run(req.path, req.query, db);
};

exports.main = main;
