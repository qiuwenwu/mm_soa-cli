const razor = require("./create/razor.js");
const thinkphp = require("./create/thinkphp.js");
const springboot = require("./create/springboot.js");

/* 服务端 */
const django_server = require("./create/django_server.js");
const koa_art_server = require("./create/koa_art_server.js");

/* /服务端 */

/* 客户端后台 */
const vue_cli_admin = require("./create/vue_cli_admin.js");
const mini_app_home = require("./create/mini_app_home.js")

/* /客户端后台 */

/* 客户端前台 */ 
const vue_cli_home = require("./create/vue_cli_home.js");
const uni_app_home = require("./create/uni_app_home.js");

/* 客户端后台 */

/**
 * 第三步，创建文件
 * @param {Object} db 数据库管理
 * @param {Object} model 模型
 */
async function create_file(db, model) {
	$.log.info("********   开始刷框架   ********");
	
	// 客户、服务端
	var {
		fk_client,
		fk_server,
		order
	} = model;
	
	// 取出模板
	var {
		tpl_home,
		tpl_admin
	} = order;

	// 取出模块
	var mode = order.mode;

	// 渲染服务端框架
	switch (fk_server) {
		case "django":
			await django_server(model);
			break
		case "koa_art":
			await koa_art_server(model);
			break;
		case "asp_net":
			break;
		case "razor":
			break;
		case "thinkphp":
			break;
		case "springboot":
			break;
	}

	// 判断是否有后台模板
	if (tpl_admin) {
		if (mode == "MVVM") {
			// 渲染客户端后台
			await vue_cli_admin(model);

			// 判断是否有前台
			if (tpl_home) {
				// 渲染客户端前台
				switch (fk_client) {
					case "mini_app":
						await mini_app_home(model);
						break;
					case "vue_cli":
						await vue_cli_home(model);
						break;
					case "uni_app":
						await uni_app_home(model);
						break;
				}
			}
			
		} else if (mode == "MVC") {
			
		}
	} else {
		console.error("不能没有后台模板");
	}
	
	$.log.info("********   结束刷框架   ********");
}

module.exports = create_file;