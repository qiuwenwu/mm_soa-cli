// 集合路由、导航，不开发前端的情况下可以将以下2行注释掉
// const nav = $.nav_admin('{0}');
// nav.update();

/**
 * 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	console.log("更新成员信息开始!");

	// 获取请求参数
	let req = ctx.request;
	let {
		query,
		body
	} = req;

	let db1 = Object.assign({}, db);
	let db2 = Object.assign({}, db);

	db1.table = "user_account";
	db2.table = "user_team";

	let users = body["users"];
	let arr = [];
	if (users) {
		arr = users.indexOf("|") !== -1 ? users.split("|") : [users];
	}
	db1.key = "user_id";

	let list = await db1.get();
	let arr_ret = [];
	
	// 判断是否只更新特定目标
	if (arr.length > 0) {
		// 更新团队目标
		arr.map((id) => {
			get_target_team(id, list, arr_ret);
		});
	} else {
		// 更新团队信息组
		get_teams(list, arr_ret);
	}

	let ret = $.ret.bl(true, "更新成员信息成功!");

	// 循环添加或修改数据
	for (let i = 0; i < arr_ret.length; i++) {
		let o = arr_ret[i];
		let user_id = o.user_id;

		let count = await db2.count({
			user_id
		});

		let bl = 1;
		if (count > 0) {
			bl = await db2.set({
				user_id
			}, o);
		} else {
			bl = await db2.add(o);
		}

		if (bl < 1) {
			ret = $.ret.error(10000, "更新成员信息失败!");
			$.log.error("添加或修改成员信息失败!", db2.sql, db2.error);
			break;
		}
	}

	console.log("更新成员信息结束!");
	return ret;
};

/**
 *  更新团队信息
 *  @param {Array} list
 *  @param {Array} arr
 */
function get_teams (list, arr) {
	// 循环用户组
	for (let i = 0; i < list.length; i++) {
		let o = list[i];
		
		let {
			user_id,
			referee_id
		} = o;

		let bl = true;

		if (arr.length > 0) {
			bl = !get_o_team(user_id, arr);
		}

		if (bl) {
			get_team(o, list, arr);
		}
	}
}

/**
 *  更新特定目标团队信息
 *  @param {Number} id
 *  @param {Array} list
 *  @param {Array} arr
 */
function get_target_team (id, list, arr) {
	// 循环用户组
	for (let i = 0; i < list.length; i++) {
		if (id == o.user_id) {
			let {
				user_id,
				referee_id
			} = o;

			let bl = true;

			if (arr.length > 0) {
				bl = !get_o_team(user_id, arr);
			}

			if (bl) {
				get_team(o, list, arr);
			}

			break;
		}
	}
}

/**
 *  判断获取成员组中成员
 *  @param {Number} user_id
 *  @param {Array} arr
 */
function get_o_team(user_id, arr) {
	let obj = null;

	for (let i = 0; i < arr.length; i++) {
		let o = arr[i];

		if (user_id === o.user_id) {
			obj = o;
			break;
		}
	}

	return obj;
}

/**
 *  获取成员
 *  @param {Object} user
 *  @param {Array} list
 *  @param {Array} arr
 */
function get_team(user, list, arr) {
	var branchs = [];
	var servants = [];

	let user_id = user.user_id;
	let referee_id = user.referee_id;

	// 判断下属是否是自身
	if (user_id === referee_id) {
		$.log.error(`用户ID：${user_id} 的上级是自身!`);
		throw `用户ID：${user_id} 的上级是自身!`;
	}

	for (let i = 0; i < list.length; i++) {
		let o = list[i];

		if (user_id === o.referee_id) {
			let uid = o.user_id;

			// 加入下属
			branchs.push(uid);

			// 加入子属
			servants.push(uid);

			// 判断下属是否已存在
			let oj = get_o_team(uid, arr);
			if (oj) {
				let servant = oj.servants;
				
				if (servant.indexOf(user_id) !== -1) {
					$.log.error(`用户ID：${user_id} 的下属 用户ID：${uid} 是 用户ID：${user_id} 的上级!`);
					throw `用户ID：${user_id} 的下属 用户ID：${uid} 是 用户ID：${user_id} 的上级!`;
				}
				
				servants.push(...servant);
			} else {
				let servant = get_team(o, list, arr);
				servants.push(...servant);
			}
		}
	}

	let obj = {
		user_id,
		referee_id,
		"branchs": JSON.stringify(branchs),
		"servants": JSON.stringify(servants)
	};

	arr.push(obj);

	return servants;
}


exports.main = main;
