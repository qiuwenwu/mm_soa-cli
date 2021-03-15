const tpl_dir = "../../static/".fullname(__dirname);
const file =  '../../static/index.html'.fullname(__dirname);

/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	var path = ctx.path;
	if (path.indexOf('.') === -1) {
		var model = await $.home.model(ctx, db, file, tpl_dir);
		return db.tpl.view(file, model);
	}
	return null;
}

exports.main = main;
