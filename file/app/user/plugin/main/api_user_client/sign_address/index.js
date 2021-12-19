/**
 * @description 获取验证码
 * @param {Object} 数据库管理器
 * @param {String} wallet_address 钱包地址
 */
async function getCode(db, wallet_address) {
	var date = new Date();
	var str = (date.toISOString() + wallet_address).md5();

	var code = "";
	for (var i = 0; i < 20; i++) {
		var c = str.substring(0, 8);
		var count = await db.count('`invite_code`=' + c);
		if (count === 0) {
			code = c;
			break;
		}
	}
	return code.toLocaleLowerCase();
};

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
		timestamp,
		content,
		signature,
		salt
	} = body;

	var sign = (timestamp + content + salt + "wr").md5();
	if (signature !== sign) {
		return $.ret.error(30000, "非法访问！");
	}
	var arr = content.split("\r\n");
	var wallet_address = arr[0].toLocaleLowerCase();
	var phone = arr[1];
	var invite = arr.length > 2 ? arr[2] : "";
	
	db.table = "user_account";
	db.key = "user_id";

	var referee_id = 0;
	if (invite) {
		var ui = await db.getObj({
			invite_code: invite
		});
		if (ui) {
			referee_id = ui.user_id
		}
	}

	// 操作sql模板
	db.table = "user_account";
	db.key = "user_id";
	var user = await db.getObj({
		wallet_address
	});

	// 如果用户不存在则创建用户
	if (!user) {
		var invite_code = await getCode(db, wallet_address);
		var salt = wallet_address.substring(2, 8);
		await db.add({
			wallet_address,
			phone,
			invite_code,
			salt,
			referee_id,
			nickname: invite_code
			// nickname: wallet_address.substring(2,4) + "****" + wallet_address.substring(wallet_address.length - 4, wallet_address.length)
		});
		user = await db.getObj({
			wallet_address
		});
	}

	if (referee_id && !user.referee_id) {
		user.referee_id = referee_id;
	}

	// 如果账户存在，但手机号码不存在，则绑定手机号码
	if (!user.phone) {
		user.phone = phone;
	} else if (phone !== 'undefined' && user.phone !== phone) {
		// 如果地址存在
		return $.ret.error(70000, "钱包地址与APP绑定的不一样！");
	}
	var login_ip = ctx.ip.replace('::ffff:', '');
	user.login_ip = login_ip;
	var u = Object.assign({}, user);
	delete u.password;
	ctx.session.user = u;
	
	return $.ret.body({
		token: ctx.session.uuid,
		ip: login_ip,
		user: u
	});
};

exports.main = main;
