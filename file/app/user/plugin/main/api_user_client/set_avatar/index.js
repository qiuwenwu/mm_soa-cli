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
	// 获取请求参数
	var req = ctx.request;
	var {
		query,
		body
	} = req;
	
	// console.log("运行修改头像" ,query ,body);
	var user = ctx.session.user;
	if(!user){
		return $.ret.error(10000 ,"用户未登录！");
	}
	var user_id = user.user_id;
	
	var avatar = query.avatar || body.avatar;
	if(!avatar){
		return $.ret.error(10000 ,"头像是必填字段！");
	}
	
	var db1 = Object.assign({} ,db);
	db1.table = "user_account";
	
	// console.log("操作", user_id ,avatar ,db1.sql ,db1.error);
	var bl = await db1.set({user_id} ,{avatar});
	
	bl = bl > 0 ? true : false;
	var message = "头像修改失败！";
	
	if(bl){
		message = "头像修改成功！";
		user.avatar = avatar;
		ctx.session.user = user;
	}
	
	return $.ret.bl(bl ,message);
};

exports.main = main;
