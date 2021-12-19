var file = "./cache/lock.json".fullname();

$.unlock = function(token, path) {
	var key = token + "_" + path;
	var index = lock.indexOf(key);
	lock.splice(index, 1);
	file.saveText(JSON.stringify(lock));
}

$.lock = function(token, path) {
	var lock = file.loadJson() || [];
	var key = token + "_" + path;
	var index = lock.indexOf(key);
	if (index !== -1) {
		return $.ret.error(70001, "请求过于频繁，请稍后再试！");
	}
	lock.push(key);
	file.saveText(JSON.stringify(lock));

	setTimeout(() => {
		lock.splice(index, 1);
		file.saveText(JSON.stringify(lock));
	}, 2000);

	return null;
}

/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	var req = ctx.request;
	var {
		method,
		path
	} = req;

	var token = req.header["x-auth-token"];

	if (method === "POST" && token) {
		return $.lock(token, path);
	}

	return null;
};

exports.main = main;
