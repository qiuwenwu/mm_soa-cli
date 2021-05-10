const {
	zip
} = require('compressing');
const project_dir = "../project/".fullname();
const save_dir = "/app/dev/static/".fullname();
const path = "/dev/";

/**
 * 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	// 获取请求参数
	var req = ctx.request;
	var q = req.query;

	var {
		order_number
	} = q;

	// 需要压缩的目录
	var dir = project_dir + order_number;

	db.table = "dev_order";
	db.key = "order_id";
	var obj = await db.getObj({
		order_number
	});

	if (obj) {
		var name = obj.name + "_" + obj.framework + "(" + order_number + ').zip';

		// 压缩后的文件路径
		var file = save_dir + name;

		var url = path + name;
		var ret;
		if (file.hasFile()) {
			ret = $.ret.body({
				url
			});
		} else {
			try {
				await zip.compressDir(dir, file);
				ret = $.ret.body({
					url
				});
			} catch (err) {
				console.error(err);
				var message = "";
				if (err.errno === -4058) {
					message = "原因是：项目还未部署！"
				}
				ret = $.ret.error(10000, "打包失败！" + message);
			}
		}
	} else {
		ret = $.ret.error(10000, "打包失败！原因是：订单不存在。");
	}

	return ret;
};

exports.main = main;
