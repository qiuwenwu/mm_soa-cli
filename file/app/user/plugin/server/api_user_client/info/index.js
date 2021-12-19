// 集合路由、导航，不开发前端的情况下可以将以下2行注释掉
// const nav = $.nav_admin('{0}');
// nav.update();

/**
 * 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	// 获取请求参数
	var req = ctx.request;
	var {
		query,
		body
	} = req;
	// return "hello world" + JSON.stringify(body);

	// 操作sql模板
	var ret = await this.sql.run(query, body, db);
	if ((!query.method || query.method == "get") && ret.result) {
		var obj = ret.result.obj;
		if (obj) {
			obj.idcard = obj.idcard.substring(0, 6) + "****" + obj.idcard.substring(16, 18)
			obj.img_idcard_front = ''
			obj.img_idcard_back = ''
			obj.img_hand_held = ''
		}
	}
	return ret;
};

exports.main = main;
