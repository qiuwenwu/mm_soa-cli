var api = $.api_admin('upload', '上传端');
// 首次启动更新api接口;
api.update();

var sql = $.mysql_admin('sys', __dirname);

/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	$.push(db, sql.db(), true);
	return api.run(ctx, db);
};
exports.main = main;
