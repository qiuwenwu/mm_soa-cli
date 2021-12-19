/**
 * 查询
 * @param {String} url 路由地址
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 查询结果
 */
async function get(url, ctx, db) {
	var event_api = $.pool.event['api'];
	var path = url.left('?', true);
	var queryString = url.right('?');
	var query = queryString ? queryString.toUrl() : {};
	var ret = await event_api.run(path, Object.assign(ctx, {method: "GET", queryString, path, query}), Object.assign({}, db));
	return ret;
}

/**
 * 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	// 获取请求参数
	var req = ctx.request;
	var json = req.body;
	var body = {};
	for (var k in json) {
		var url = json[k];
		var ret = await get(url, ctx, db);
		if(ret){
			var res = ret.toJson();
			if(res.error){
				body = res;
				body.key = k;
				break;
			}
			else {
				body[k] = res.result.list || res.result.obj;
			}
		}
		else {
			body[k] = null;
		}
	}
	return body;
};

exports.main = main;
