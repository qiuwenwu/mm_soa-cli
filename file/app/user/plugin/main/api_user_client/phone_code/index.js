class Phone_code {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		this.config = {
			// 验证码有效时长
			expires: 15,
			// 短信发送地址
			url: "http://api.smsbao.com/sms?u=${username}&p=${password}&m=${phone}&c=${content}",
			// 用户名
			username: "31772309",
			// 密码
			password: "asd123"
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
	var {
		username,
		password,
		expires,
		url
	} = this.config;
	var key = "code_" + method + "_" + phone;
	var value = await $.cache.get(key);
	var code;
	if (value) {
		var obj = JSON.parse(value);
		if (obj.time.toTime().addSeconds(expires * 60) < new Date()) {
			code = await this.new_code(key);
		} else {
			return $.ret.bl(true, "发送成功！");
		}
	} else {
		code = await this.new_code(key);
	}
	if (code) {
		password = password.md5();
		var content = encodeURIComponent(`【奥卡商城】您的验证码为${code}，在${expires}分钟内有效。`);
		var u = eval("`" + url + "`");
		var http = new $.Http();
		var web = await http.get(u);
		var errno = web.body;
		if (errno) {
			errno = Number(errno);
			if (errno == 0) {
				return $.ret.bl(true, "发送成功！");
			} else {
				var meaage = "";
				switch (errno) {
					case -1:
						meaage = "参数不全"
						break
					case -2:
						meaage = "服务器空间不支持,请确认支持curl或者fsocket，联系您的空间商解决或者更换空间！"
						break
					case 30:
						meaage = "密码";
						break;
					case 40:
						meaage = "账号不存在";
						break;
					case 41:
						meaage = "余额不足";
						break;
					case 43:
						meaage = "IP地址受限";
						break;
					case 50:
						meaage = "内容含有敏感词";
						break;
					case 51:
						meaage = "手机号码不正确";
						break;
				}
				return $.ret.error(11000 + errno, meaage);
			}
		} else {
			return $.ret.error(10000, "请求短信服务端失败！");
		}
	} else {
		return $.ret.error(10000, "缓存验证码失败！");
	}
};

/**
 * 发送验证码
 * @param {String} phone 手机号码
 * @param {Object} db 数据库管理器
 * @return {Object} 执行结果
 */
Phone_code.prototype.set_delivery_address = async function(phone, db, username) {
	var user = await db.getObj({
		username
	});
	if (user) {
		return $.ret.bl(false, "用户已存在！");
	}
	return await this.send("set_delivery_address", phone);
};

/**
 * 注册
 * @param {String} phone 手机号码
 * @param {Object} db 数据库管理器
 * @return {Object} 执行结果
 */
Phone_code.prototype.sign_up = async function(phone, db, username) {
	var user = await db.getObj({
		username
	});
	if (user) {
		return $.ret.bl(false, "用户已存在！");
	} else {
		user = await db.getObj({
			phone
		});
		if (user) {
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
	var user = await db.getObj({
		username
	});
	if (!user) {
		return $.ret.error(10000, "用户不存在！");
	} else {
		if (user.phone !== phone) {
			return $.ret.error(30000, "用户所绑定的手机号不一致！");
		}
		phone = user.phone;
	}
	return await this.send("forgot", phone);
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
	var user = await db.getObj({
		username
	});
	if (!user) {
		return $.ret.error(10000, "用户不存在！");
	} else {
		phone = user.phone;
	}
	return await this.send("bind", phone);
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
