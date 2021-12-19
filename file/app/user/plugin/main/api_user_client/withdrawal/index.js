async function main(ctx, db) {
	// 获取请求参数
	const req = ctx.request;
	const {
		query,
		body
	} = req;
	//
	let login_user = ctx.session.user
	if (!login_user) {
		return $.ret.error(10000, '获取登录用户失败')
	}
	const coin_dao = db.new("chain_coin");
	const extract_dao = db.new("chain_user_wallet");
	//获取用户钱包
	const coin_id = query.coin_id
	const amount = query.amount
	const s = {
		coin_id: coin_id,
		user_id: login_user.user_id
	}
	//查询coin
	coin_dao.table = 'chain_coin'
	const coin = await coin_dao.getObj({
		coin_id: coin_id
	})
	if (!coin) {
		return $.ret.error(10000, "获取币种失败")
	}
	if (coin.can_withdraw !== 1) {
		return $.ret.error(10000, "当前币种不能提现")
	}
	if (coin.withdraw_low > amount) {
		return $.ret.error(10000, "最低提现" + coin.withdraw_low + "" + coin.type)
	}
	const wallet = await db.getObj(s)
	if (!wallet) {
		return $.ret.error(10000, "获取用户钱包失败")
	}
	if (wallet.state !== 0) {
		return $.ret.error(10000, "当前钱包已经被锁定了，如有疑问请联系管理员")
	}
	if (amount <= 0) {
		return $.ret.error(10000, "请输入大于0的数值")
	}
	//校验用户钱包余额
	if (amount > wallet.balance) {
		return $.ret.endWith(10000, "钱包余额不足，当前可用余额为：" + wallet.balance)
	}

	//增加提现数据
	const hand_fee = coin.withdraw_fee * amount
	const extract = {
		user_id: login_user.user,
		number: amount,
		hand_fee: hand_fee,
		amount: amount - hand_fee,
		address: body.address,
		coin_id: coin_id,
		status: 0
	}
	extract_dao.table = "chain_user_extract"
	extract_dao.add(extract)
	//扣款
	wallet.balance = wallet.balance - amount
	wallet.freeze = wallet.freeze + amount
	db.set(s, wallet)
	return $.success(extract)
}
exports.main = main;
