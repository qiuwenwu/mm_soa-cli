/**
 * @description 获取验证码
 * @param {Object} 数据库管理器
 * @param {String} username
 * @param {String} password
 */
$.getCode = async function(db, username, password) {
	var date = new Date();
	var str = (date.toISOString() + username + password).md5();

	var code = "";
	for (var i = 0; i < 20; i++) {
		var invite_code = str.substring(0, 8);
		var count = await db.count({invite_code});
		if (count === 0) {
			code = invite_code;
			break;
		}
	}
	return code.toLocaleLowerCase();
};

/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	db.table = "user_account";

	var by = ctx.request.body;
	var {
		username,
		password,
		phone,
		code,
		invite_code
	} = by;

	// 判断用户是否已存在
	var count = await db.count({
		username
	});
	console.log("count" ,count);
	
	if (count > 0) {
		return $.ret.bl(false, '注册失败，用户名已存在！');
	}

	// 短信验证码判断
	// if (code) {
	// 	var key = "code_sign_up_" + phone;
	// 	var value = await $.cache.get(key);
	// 	console.log(value);
	// 	if(!value){
	// 		return $.ret.error(10000, '请先发送验证码！');
	// 	}
	// 	var json = value.toJson();
	// 	if (code !== json.code) {
	// 		return $.ret.bl(false, '验证码不正确！');
	// 	}
	// }
	
	// 添加邀请码
	var referee_id = 0;
	if (invite_code) {
		var inviter = await db.getObj({
			invite_code
		});
		if (inviter) {
			referee_id = inviter.user_id;
		} else {
			return $.ret.bl(false, '邀请人不存在！');
		}
	}
	
	var salt = password.substring(0, 6);
	var pass = (password + salt).md5();
	
	// 生成邀请码
	var icode = await $.getCode(db, username, pass);

	var index = await db.add({
		username,
		salt,
		phone,
		referee_id,
		password: pass,
		invite_code: icode
	});
	
	if (index > 0) {
		var user = await db.getObj({
			username
		});
		
		if (user) {
			var user_id = user.user_id;
			db.table = "user_count";
			await db.add({
				user_id
			});
			
			db.table = "user_info";
			await db.add({
				user_id
			});

			db.table = "user_sns";
			await db.add({
				user_id
			});
			
			// 获取币种
			var db1 = Object.assign({} ,db);
			db1.table = "chain_coin";
			db1.size = 0;
			var coins = await db1.get({"state": 1});
			
			// 添加资产钱包
			var db2 = Object.assign({} ,db);
			db2.table = "chain_user_wallet";
			coins.map((o) => {
				var coin_id = o.coin_id;
				db2.add({user_id ,coin_id});
			});
			
			if(referee_id){
				$.message(db ,referee_id ,3 ,"注册成功" ,`恭喜您邀请${phone}注册成功。`);
			}
			
			$.message(db ,user.user_id ,3 ,"注册成功" ,"恭喜您注册成功。");
		}
			
		return $.ret.bl(true, '注册成功');
	} else {
		return $.ret.error(10000, '数据库业务逻辑错误。 ' + JSON.stringify(db.error, true));
	}
};

exports.main = main;