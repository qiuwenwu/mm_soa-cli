const {
	join
} = require("path");

const copy = require("./copy.js");

/**
 * @description 复制框架
 * @param {Object} model 数据模型
 * @return {Object} 输出框架
 */
async function copy_framework(model) {
	$.log.info("********  开始复制框架  ********");

	// 取出模型数据
	var {
		order,
		filter,
		to,
		from_fk
	} = model;

	// 获取UI,获取模式,服务端样式,客户端样式
	var {
		tpl_home,
		tpl_admin,
		mode,
		ui,
		fk_server,
		fk_client
	} = order;

	// 判断渲染对象模式类型
	if (mode == "MVC") {
		// 选择服务端框架
		fk_server = order.framework;
	} else if (mode == "MVVM") {
		// 获取订单语言
		var lang = order.lang;

		// 选择服务端框架 注：在MVVM模式 服务端根据语言获取
		fk_server = await get_framework(lang);

		// 选择客户端框架 注：在MVVM模式 框架用于获取客户端
		switch (order.framework) {
			case "vue_cli":
				fk_client = "vue_cli";
				break;

			case "uni_app":
				fk_client = "uni_app";
				break;

			case "mini_app":
				fk_client = "mini_app";
				break;
		}
	}

	// 初始化服务端路径
	var _from = from_fk + fk_server;
	await copy(_from, to, filter);
	
	// MVVM客户端后台
	if (mode === "MVVM") {
		if(fk_client && tpl_admin){
			// 获取客户端路径vue_cli
			_from = join(from_fk, "vue_cli/client_admin/");
			_from = _from.fullname();
			await copy(_from, to + "/client_admin/", filter);
			
			// 存在 客户端 并且存在 前端模板
			if (fk_client && tpl_home) {
				// 获取客户端路径
				_from = from_fk + fk_client + "/client_home/";
				_from = _from.fullname();
				await copy(_from, to + "/client_home/", filter);
			}
		}
	}

	$.log.info("********  结束复制框架  ********");
	// 输出
	return {
		fk_server,
		fk_client
	};
}

/**
 * @description 获取框架
 * @param {Object} lang 语言
 */
async function get_framework(lang) {
	var fk = "";
	// 判断渲染语言框架
	switch (lang) {
		case "python":
			fk = "django";
			break;
		case "nodejs":
			fk = "koa_art";
			break;
		case "asp.net":
		case "csharp":
			fk = "razor";
			break;
		case "php":
			fk = "thinkphp";
			break;
		case "java":
			fk = "springboot";
			break;
	}
	return fk;
}

module.exports = copy_framework;
