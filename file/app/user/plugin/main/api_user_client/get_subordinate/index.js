// 集合路由、导航，不开发前端的情况下可以将以下2行注释掉
// const nav = $.nav_admin('{0}');
// nav.update();

/**
 *  接口主函数
 *  @param {Object} ctx HTTP上下文
 *  @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 *  @return {Object} 执行结果
 */
async function main(ctx, db) {
	// 获取请求参数
	let req = ctx.request;
	let {
		query,
		body
	} = req;

	let user = ctx.session.user;

	if (!user) {
		return $.ret.error(10000, "用户未登录!");
	}

	let user_id = query.user_id;
	if (user.gm > 0 && !user_id) {
		return $.ret.error(10000, "不能没有目标用户!");
	} else {
		user_id = user.user_id;
	}

	let db1 = db.new("user_account");
	db1.size = 0;
	let list_user = await db1.get();

	let db2 = db.new("mall_mining_machine");
	db2.size = 0;
	let list_machine = await db2.get();

	if (list_user.length < 1) {
		return $.ret.error(10000, "用户列表获取不到!");
	}

	if (list_machine.length < 1) {
		return $.ret.error(10000, "用户列表获取不到!");
	}

	let arr = [];
	for (let i = 0; i < list_user.length; i++) {
		let user = list_user[i];
		if (user.referee_id == user_id) {
			let u_id = user.user_id;
			let {
				avatar,
				phone,
				service_fee
			} = user;

			let num_personal_equipment = get_equipment(u_id, list_machine);

			let {
				num_equipment,
				num_people
			} = get_referee(u_id, list_user, list_machine);
			
			let obj = {
				"user_id": u_id,
				avatar,
				phone,
				service_fee,
				num_personal_equipment,
				"num_community_equipment": num_equipment,
				num_people
			};
			arr.push(obj);
		}
	}

	let ret = $.ret.error(10000, "用户没有直推和间推对象");
	if (arr.length > 0) {
		ret = $.ret.list(arr);
	}

	return ret;
};

/**
 *  获取下级ID
 *  @param {Number} u_id 上级ID
 *  @param {Array} list_user 用户列表
 *  @param {Array} list_machine 矿机列表
 */
function get_referee(u_id, list_user, list_machine) {

	let num_equipment = 0;
	let num_people = 0;

	for (let i = 0; i < list_user.length; i++) {
		let user = list_user[i];
		if (user.referee_id == u_id) {
			let user_id = user.user_id;
			
			// 获取用户设备数
			num_equipment += get_equipment(user_id, list_machine);
			
			// 获取下级信息
			let obj = get_referee(user_id, list_user, list_machine);
			let equipment = obj.num_equipment;
			let people = obj.num_people;
			
			// 加入信息
			num_equipment += equipment;
			num_people += people + 1;
		}
	}
	
	return {num_equipment ,num_people};
}

/**
 *  获取设备矿机
 *  @param {Number} user_id
 *  @param {Array} list_machine
 */
function get_equipment(user_id, list_machine){
	let num = 0;
	
	for(let i=0 ;i < list_machine.length ;i++){
		let machine = list_machine[i];
		if(machine.user_id == user_id){
			num++;
		}
	}
	
	return num;
}

exports.main = main;
