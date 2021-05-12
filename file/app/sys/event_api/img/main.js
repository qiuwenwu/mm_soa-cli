var fs = require('fs');

var save_file_dir = "/app/sys/static/img/".fullname();
save_file_dir.addDir();
var file_path = "/sys/img/";

/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	// 在这定义要访问的数据库 (分布式开发时设置不同的数据库名)
	var body = ctx.request.body;
	for (var k in body) {
		var data = body[k];
		if (data && typeof(data) === 'string') {
			if (k.indexOf('img') !== -1 || k.indexOf('image') !== -1 || k.indexOf('icon') !== -1 ||  k.indexOf('avatar') !== -1) {
				if (data.indexOf('data:') === 0) {
					var extension = data.between('image/', ';');
					data = data.replace(/^data:image\/\w+;base64,/, "");
					var bf = Buffer.from(data, 'base64');
					var stamp = Date.now();
					var name = k + "_" + stamp + "." + extension;
					var file = save_file_dir + name;
					try {
						fs.writeFileSync(file, bf);
						body[k] = file_path + name;
					} catch (e) {
						fs.closeSync(file);
						console.log(e);
					}
				}
			}
		}
	}
	return null;
};

exports.main = main;
