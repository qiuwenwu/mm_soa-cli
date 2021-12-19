
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
	
	var {
		apikey,
		token
	} = query;
	
	// 应用鉴权
	var ret = await $.check_app(db, apikey);
	if (ret) {
		return ret;
	}
	
	if (token) {
		var u = await $.cache.get($.dict.session_id + '_' + token);
		if (u) {
			var type = typeof(u);
			if (type === "string") {
				var o = u.toJson();
				return $.ret.body(o.user);
			} else if (type === "object") {
				if (Object.keys(u).length > 0) {
					var o = Object.assign({}, u);
					return $.ret.body(o.user);
				}
			}
		}
		return $.ret.error(50000, '非法访问');
	}
	return $.ret.error(40000, '用户未登录');
};

exports.main = main;
