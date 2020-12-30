/**
 * Oauth授权类
 */
class Oauth {
	/**
	 * 
	 * @param {Object} config
	 */
	constructor(config) {

	}
}

/**
 * 授权链接
 */
Oauth.prototype.connect = async function(query, db, dict) {
	console.log('connect');
	return $.ret.body = {
		url: dict.url_code
	}
};

/**
 * 回调链接
 */
Oauth.prototype.callback = async function(query, db, dict) {

};

/**
 * 绑定链接
 */
Oauth.prototype.bind = async function(query, db, dict) {

};

/**
 * 解绑链接
 */
Oauth.prototype.unbind = async function(query, db, dict) {

};

/**
 * 运行
 */
Oauth.prototype.run = async function(path, query, db) {
	var list = this.config.list;
	var ret = {};
	for (var i = 0; i < list.length; i++) {
		var o = list[i]
		var p = "/api/user/oath/" + o.name + "/";
		if (path.indexOf(p) === 0) {
			var fun_name = path.replace(p, '');
			if (this[fun_name]) {
				ret = await this[fun_name](query, db, o.dict);
			}
		}
	}
	return ret;
};

module.exports = Oauth;
