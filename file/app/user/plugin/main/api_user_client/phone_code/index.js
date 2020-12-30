class Phone_code {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		this.config = {
			// 短信发送地址
			url: "https://gyytz.market.alicloudapi.com/sms/smsSend?",
			// 阿里云appcode
			appcode: "51126b682bdb4d12bcb1eb0909fd5ec0",
			// 验证码有效时长
			expires: 15,
			// 修改密码
			model_password: {
				mobile: "15817188815",
				param: "123456",
				smsSignId: "2e65b1bb3d054466b82f0c9d125465e2",
				templateId: "8166a0ae27b7499fa8bdda1ed12a07bd"
			},
			// 重置密码
			model_forgot: {
				mobile: "15817188815",
				param: "123456,15",
				smsSignId: "2e65b1bb3d054466b82f0c9d125465e2",
				templateId: "29833afb9ae94f21a3f66af908d54627"
			},
			// 注册账号
			model_sign_up: {
				mobile: "15817188815",
				param: "123456,15",
				smsSignId: "2e65b1bb3d054466b82f0c9d125465e2",
				templateId: "a09602b817fd47e59e7c6e603d3f088d"
			},
			// 绑定手机
			model_bind: {
				mobile: "15817188815",
				param: "123456,15",
				smsSignId: "2e65b1bb3d054466b82f0c9d125465e2",
				templateId: "ea66d14c664649a69a19a6b47ba028db"
			}
		}
	}
}

/**
 * 新建验证码
 * @param {String} method 请求方法
 * @param {String} phone 手机号码
 * @return {String} 返回验证码
 */
Phone_code.prototype.new_code = async function(key) {
	var code;
	var num = Math.ceil(Math.random() * 1000);
	if (num < 10) {
		code = "0" + num + "0" + num;
	} else if (num < 100) {
		code = "00" + num;
	} else if (num < 1000) {
		code = "0" + num;
	}
	var obj = {
		time: new Date(),
		code
	};

	var bl = await $.cache.set(key, JSON.stringify(obj), this.config.expires * 60);
	if (bl) {
		return code;
	} else {
		return null;
	}
};

/**
 * 发送验证码
 * @param {String} method 请求方法
 * @param {String} phone 手机号码
 * @return {Object} 返回发送结果
 */
Phone_code.prototype.send = async function(method, phone) {
	var config = this.config;
	var model = config["model_" + method];
	var http = new $.Http();
	var key = "code_" + method + "_" + phone;
	var value = await $.cache.get(key);
	var code;
	if (value) {
		var obj = JSON.parse(value);
		if (obj.time.toTime().addSeconds(config.expires * 60) < new Date()) {
			return $.ret.bl(false, "验证码已过期！");
		} else {
			code = obj.code;
		}
	} else {
		code = await this.new_code(key);
	}
	if (code) {
		var param = "**code**:" + code + ",**minute**:" + config.expires;
		var query = Object.assign({}, model, {
			param,
			mobile: phone
		});
		var url = $.toUrl(query, config.url);
		// console.log(url);
		var web = await http.post(url, {}, {
			Authorization: "APPCODE " + config.appcode
		}, "json");
		// console.log(web);
		if (web.body) {
			console.log(web.body);
			var json = web.body.toJson();
			if (json.msg === "成功") {
				return $.ret.bl(true, "发送成功！");
			} else {
				return $.ret.error(Number(json.code), json.msg);
			}
		} else {
			return $.ret.error(10000, "请求短信服务端失败！");
		}
	} else {
		return $.ret.error(10000, "缓存验证码失败！");
	}
};

/**
 * 注册
 * @param {String} phone 手机号码
 * @param {Object} db 数据库管理器
 * @return {Object} 执行结果
 */
Phone_code.prototype.sign_up = async function(phone, db, username) {
	var obj = await db.getObj({
		username
	});
	if (obj) {
		return $.ret.bl(false, "用户已存在！");
	} else {
		obj = await db.getObj({
			phone
		});
		if (obj) {
			return $.ret.bl(false, "该手机号码已绑定其他账户！");
		}
	}
	return await this.send("sign_up", phone);
};

/**
 * 重置密码
 * @param {String} phone 手机号码
 * @param {Object} db 数据库管理器
 * @return {Object} 执行结果
 */
Phone_code.prototype.forgot = async function(phone, db, username) {
	return $.ret.bl(true, "重置发送验证码成功！");
};

/**
 * 修改密码
 * @param {String} phone 手机号码
 * @param {Object} db 数据库管理器
 * @return {Object} 执行结果
 */
Phone_code.prototype.password = async function(phone, db, username) {
	return $.ret.bl(true, "修改密码发送验证码成功！");
};


/**
 * 绑定手机
 * @param {String} phone 手机号码
 * @param {Object} db 数据库管理器
 * @return {Object} 执行结果
 */
Phone_code.prototype.bind = async function(phone, db, username) {
	return $.ret.bl(true, "绑定发送验证码成功！");
};

/**
 * 执行
 * @param {Object} query
 * @param {Object} db
 */
Phone_code.prototype.run = async function(query, db) {
	var method = query.method;
	if (this[method]) {
		return await this[method](query.phone, db, query.username);
	} else {
		return $.ret.error(10000, "错误的请求！");
	}
};

var phone_code = new Phone_code();

/**
 * 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	// 获取请求参数
	var req = ctx.request;
	db.table = "user_account";
	return await phone_code.run(req.query, db);
};

exports.main = main;
