const WXBizDataCrypt = require('./WXBizDataCrypt');
const cg = require('./oauth.json');

/**
 * Oauth授权类
 */
class Oauth {
	/**
	 * 配置参数
	 * @param {Object} config
	 */
	constructor(config) {
		this.config = Object.assign({}, cg, config);
	}
}

/**
 * 构建配置模型
 * @param {Object} config
 * @return {Object} 返回配置
 */
Oauth.prototype.model = function(config) {
	config.dict = Object.assign({
		"code": "code",
		"scope": "scope",
		"client_id": "client_id",
		"client_secret": "client_secret",
		"open_id": "open_id",
		"access_token": "access_token",
		"refresh_token": "refresh_token",
		"redirect_uri": "redirect_uri",
		"state": "state"
	}, config.dict);

	return config;
}

/**
 * 授权链接
 */
Oauth.prototype.connect = async function(db, ctx, config) {
	console.log('connect');
	return $.ret.body = {
		url: config.url_code
	}
};

/**
 * 回调链接
 */
Oauth.prototype.callback = async function(db, ctx, config) {
	console.log(req);
};

/**
 * 绑定链接
 */
Oauth.prototype.bind = async function(db, ctx, config) {
	var req = ctx.request;
	var body = req.body;
	var {
		openid,
		encryptedData,
		iv,
		appid,
		session_key,
		nickName,
		city,
		province,
		country,
		avatarUrl
	} = body;
	// console.log(body)
	var pc = new WXBizDataCrypt(appid, session_key);
	var data = pc.decryptData(encryptedData, iv);
	// console.log(data);
	var phone = data.phoneNumber;
	var db1 = db.new("user_account", "user_id");
	var user = await db1.getObj({
		phone
	});
	if (!user) {
		var len = phone.length;
		var p = phone.substring(len - 6, len).md5();
		var salt = p.substring(0, 6);
		var password = (p + salt).md5();
		var username = phone;
		var invite_code = await $.getCode(db, username, password);

		await db1.add({
			username,
			salt,
			password,
			phone,
			invite_code,
			wallet_address: phone
		});
		// console.log("注册账户", db1.error);
		user = await db.getObj({
			phone
		});
	}
	if (!user) {
		return $.ret.error(10000, "创建用户失败！");
	}
	user.nickname = nickName;
	user.avatar = avatarUrl;

	var db2 = Object.assign({}, db);
	db2.table = db.new("user_info", "user_id");

	var user_id = user.user_id;
	info = await db2.getObj({
		user_id
	});
	if (!info) {
		await db2.add({
			user_id,
			city,
			country,
			province
		});
		info = await db2.getObj({
			user_id
		});
	}

	var u = Object.assign({}, user);
	delete u.password;
	delete u.salt;
	delete u.time_create;
	ctx.session.user = user;
	var ip = ctx.ip.replace('::ffff:', '');
	// var user = Object.assign({}, u);
	// 自动生成的uuid是通过IP和浏览器信息加密而成，如果需要解密确认其身份，可再加上user_id加密，自行生成uuid
	var ret = $.ret.body({
		token: ctx.session.uuid,
		user,
		ip
	});
	var userInfo = {
		nickName,
		city,
		province,
		country,
		avatarUrl
	};
	var params = {
		open_id: openid,
		info: JSON.stringify(userInfo)
	};
	$.bind_account(db, params, user);
	// $.log.debug('入场', body);
	return ret
};

/**
 * 解绑链接
 */
Oauth.prototype.unbind = async function(db, ctx, config) {

};

/**
 * 1.通过code换取token
 * @param {Object} req 查询参数
 * @param {Object} db
 * @param {Object} config
 */
Oauth.prototype.code_to_token = async function(db, ctx, config) {
	var ret;
	var req = ctx.request;
	// req里面需传code和appid两个参数
	var d = config.dict;
	var query = req.query;
	var code = query[d.code];
	var appid = query[d.client_id];
	db.table = config.name.replace("_mini", "") + "_app";
	// console.log(d.code,code,d.client_id,appid);
	var qy = {};
	qy[d.client_id] = appid;
	var obj = await db.getObj(qy);
	if (!obj) {
		return $.ret.error(60000, d.client_id + ":" + appid + "不存在!");
	}
	var url = config.url_token.replace("{client_id}", appid).replace("{code}", code).replace("{client_secret}",
		obj[d.client_secret]);
	var http = new $.Http();
	var html = await http.get(url);

	if (html.body) {
		var json = html.body.toJson();
		if (json[d.open_id]) {
			if (obj.type == "小程序") {
				db.table = "wechat_info";
				var user_info = await db.getObj({
					open_id: json[d.open_id]
				});
				if (user_info) {
					var user_id = user_info.user_id;
					db.table = "user_account";
					var user = await db.getObj({
						user_id
					});
					user.open_id = json[d.open_id];
					user.token = ctx.session.uuid;
					ctx.session.user = user;
					return $.ret.body(user);
				} else {
					return $.ret.body(json);
				}
			} else {
				url = config.url_user_info.replace("{access_token}", json[d.access_token]).replace("{open_id}",
					json[d.open_id]);
				html = await http.get(url);
				if (html.body) {
					var users = html.body.toJson();
					db.table = "wechat_info";
					db.key = "info_id";
					qy = {};
					qy[d.open_id] = json[d.open_id];
					user = await db.getObj(qy);
					if (!user) {
						var body = {};
						body[d.open_id] = json[d.open_id];
						await db.add(body);
						user = await db.getObj(qy);
					}
					if (user) {
						user[d.access_token] = json[d.access_token];
						user[d.refresh_token] = json[d.refresh_token];
						user.info = JSON.stringify(users);
						body = Object.assign({}, user, json, users);
						delete body.info;
						ret = $.ret.body(body);
					}
				}
			}
		}
	}
	return ret;
};

/**
 * 运行
 */
Oauth.prototype.run = async function(db, ctx) {
	var req = ctx.request;
	var path = req.path;
	var dict = this.config;
	var ret = {};
	for (var k in dict) {
		var p = "/api/user/oauth/" + k + "/";
		if (path.indexOf(p) === 0) {
			var fun_name = path.replace(p, '');
			if (this[fun_name]) {
				// console.log("有此路径", fun_name);
				dict[k].name = k;
				ret = await this[fun_name](db, ctx, this.model(dict[k]));
				break;
			}
		}
	}
	return ret;
};

module.exports = Oauth;
