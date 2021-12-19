/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	// 获取请求参数
	if (ctx.session.user) {
		var o = Object.assign({}, ctx.session.user);
		delete o.salt;
		o.password_pay = o.password_pay ? "******" : "";
		o.password = o.password ? "******" : "";
		return $.ret.body(o);
	} else {
		var token = ctx.headers[$.dict.token];
		if (token) {
			var u = await $.cache.get($.dict.session_id + '_' + token);
			if (u) {
				var type = typeof(u);
				if (type === "string") {
					var o = Object.assign({}, u.toJson());
					delete o.salt;
					o.password_pay = o.password_pay ? "******" : "";
					o.password = o.password ? "******" : "";
					return $.ret.body(o);
				} else if (type === "object") {
					if (Object.keys(u).length > 0) {
						var o = Object.assign({}, u);
						delete o.salt;
						o.password_pay = o.password_pay ? "******" : "";
						o.password = o.password ? "******" : "";
						return $.ret.body(o);
					}
				}
			}
			return $.ret.error(50000, '非法访问');
		}
		return $.ret.error(40000, '用户未登录');
	}
};

exports.main = main;
