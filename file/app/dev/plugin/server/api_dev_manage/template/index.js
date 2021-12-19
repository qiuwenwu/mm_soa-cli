const {
	zip
} = require('compressing');

// 模板存放路径
var dir_template = "../template/".fullname();
// zip文件路径
var dir_zip = "/app/dev/static/tpl_zip".fullname();

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
	if (query.method == "add" || query.method == "set") {
		var body = req.body;
		var {
			name,
			file,
			framework,
			client
		} = body;
		var ct = client == "前台" ? "home" : "admin";
		file = dir_zip + file.replace("/dev/tpl_zip/", "");
		// 解压zip文件
		if (file.hasFile()) {
			dir = dir_template + framework + "/" + ct + "/" + name;
			// dir.addDir();
			await zip.uncompress(file, dir);
		}
	}
	return await this.sql.run(query, body, db);
};

exports.main = main;
