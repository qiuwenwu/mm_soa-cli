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
	var body = req.body;
	var {open_id,avatar} = body;
	
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
	db.table = config.name.replace("_mini","") + "_app";
	// console.log(d.code,code,d.client_id,appid);
	var qy = {};
	qy[d.client_id] = appid;
	var obj = await db.getObj(qy);
	if (!obj) {
		return $.ret.error(60000, d.client_id + ":" + appid + "不存在!");
	}
	var url = config.url_token.replace("{client_id}", appid).replace("{code}", code).replace("{client_secret}", obj[d.client_secret]);
	var http = new $.Http();
	var html = await http.get(url);

	if(html.body){
		var json = html.body.toJson();
		if(json[d.open_id]){
			if(obj.type == "小程序"){
				db.table = "wechat_info";
				var user_info = await db.getObj({open_id:json[d.open_id]});
				if(user_info){
					var user_id = user_info.user_id;
					db.table = "user_account";
					var user = await db.getObj({user_id});
					user.open_id = json[d.open_id];
					user.token = ctx.session.uuid;
					ctx.session.user = user;
					return $.ret.body(user);
				}
				else {
					return $.ret.body(json);
				}
			} else {
				url = config.url_user_info.replace("{access_token}", json[d.access_token]).replace("{open_id}", json[d.open_id]);
				html = await http.get(url);
				if(html.body){
					var users = html.body.toJson();
					db.table = "wechat_info";
					db.key = "info_id";
					qy = {};
					qy[d.open_id] = json[d.open_id];
					user = await db.getObj(qy);
					if(!user){
						var body = {};
						body[d.open_id] = json[d.open_id];
						await db.add(body);
						user = await db.getObj(qy);
					}
					if(user){
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
