/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	var params = {};
	if (ctx.method === "POST") {
		params = ctx.request.body;
	} else {
		params = ctx.request.query;
	}
	var password = params['password'];
	if (ctx.session.user) {
		ctx.session.user = null;
	}
	if (!password) {
		return $.ret.error(30002, "密码(password)不能为空");
	}
	var user;
	// 获取登录方式
	var method = params["method"];
	// $.log.debug('登录方式', method);
	if (!method) {
		// 如果登录方式默认，则用常规登录方式
		db.table = "user_account";
		db.key = "user_id";

		var {
			username,
			email,
			phone
		} = params;
		if (username) {
			// 使用用户名登录
			user = await db.getObj({
				username
			});
		} else {
			if (email) {
				// 使用邮箱登录
				user = await db.getObj({
					email
				});
			} else {
				if (phone) {
					// 使用手机号码登录
					user = await db.getObj({
						phone
					});
				} else {
					return $.ret.error(30002, '用户名(username)不能为空');
				}
			}
		}
	} else if (method === "sns") {
		// 如果登陆方式为1，则使用第三方社交账号和本站密码进行登录
		db.table = "user_sns";
		var mm = params["mm"];
		var arr = [];
		if (mm) {
			// 使用飞鸟云算力账号登录
			arr = await db.get({
				mm
			});
		} else {
			var qq = params["qq"];
			if (qq) {
				// 使用QQ账号登录
				arr = await db.get({
					qq
				});
			} else {
				var baidu = params["baidu"];
				if (baidu) {
					// 使用百度账号登录
					arr = await db.get({
						baidu
					});
				} else {
					var taotao = params["taotao"];
					if (taotao) {
						// 使用淘宝账号登录
						arr = await db.get({
							taotao
						});
					} else {
						var wechat = params["wechat"];
						if (wechat) {
							// 使用微信账号登录
							arr = await db.get({
								wechat
							});
						} else {
							return $.ret.error(30000, '不支持的SNS账号');
						}
					}
				}
			}
		}
		if (arr.length > 0) {
			var o = arr[0];
			db.table = "user_user";
			user = await db.getObj({
				user_id: o.user_id
			});
		}
	}
	if (!user) {
		return $.ret.error(10000, '账号不存在');
	} else {
		if(user.state === 2){
			return $.ret.error(10000, "账户异常!");
		}
		else if(user.state === 3){
			return $.ret.error(10000,"账户已被冻结！");
		}
		else if(user.state === 4){
			return $.ret.error(10000,"账户已注销！");
		}
		// 判断密码是否正确
		var pass = (password + user.salt).md5();
		if (user.password !== pass) {
			return $.ret.error(31000, '密码不正确');
		} else {
			var ip = ctx.ip.replace('::ffff:', '');
			// 记录当前登录所用的IP地址
			db.set({
				user_id: user.user_id
			}, {
				login_ip: ip
			});
			var info = params.info;
			if (info) {
				var json_info = JSON.parse(info);
				user.nickname = json_info.nickName;
				user.avatar = json_info.avatarUrl;
			}
			ctx.session.user = user;
			var u = Object.assign({}, user);
			u.password_pay = u.password_pay ? "******" : "";
			u.password = u.password ? "******" : "";
			delete u.salt;
			delete u.time_create;
			// var user = Object.assign({}, u);
			// 自动生成的uuid是通过IP和浏览器信息加密而成，如果需要解密确认其身份，可再加上user_id加密，自行生成uuid
			var body = $.ret.body({
				token: ctx.session.uuid,
				user: u,
				ip
			});
			$.bind_account(db, params, user);
			// $.log.debug('入场', body);
			return body
		}
	}
};

$.bind_account = async function(db, body, user) {
	var open_id = body.open_id;
	var user_id = user.user_id;
	if (open_id) {
		var way = body.way || "wechat";
		db.table = way + "_info";
		var info = await db.getObj({
			open_id
		});
		if (info) {
			var obj = {
				user_id,
				open_id,
				info: body.info
			}
			db.set({
				open_id
			}, obj);
		} else {
			db.add({
				user_id,
				open_id,
				info: body.info
			});
		}
		return user;
	}
}


exports.main = main;
