var tpl = new $.Tpl();

// 
tpl.config.root = "";

/**
 * @description 创建koa_art模板
 * @param {Objact} model 模型
 */
async function koa_art_server(model) {
	$.log.info("****  开始刷Koa_art服务端  ****");
	 
	// 从 模型 中取出 订单 表集
	var {
		order,
		tables
	} = model;

	// 取出订单号 注：用于保存
	var order_number = order.order_number;

	// 项目存放路径
	var dir_save = "../project/" + order_number + "/";

	// 服务器存放路径
	var dir_server = "../template/koa_art/server/";

	// 服务与控制器路径
	var dir_controller = dir_server + "controllers/controller.js";
	var dir_service = dir_server + "services/service.js";

	// 循环表
	for (var i = 0; i < tables.length; i++) {
		// 取出表
		var table = tables[i];
		
		// 取出表名和表标题
		var name = table.name;
		var title = table.title;
		
		// 判断是否存在
		if(name && title){
			// 服务名
			var cs = name.charAt(0).toUpperCase() + name.slice(1);
			
			// 模型
			var vm = {
				table,
				title,
				name,
				cs
			};
			
			// 渲染控制器
			tpl_file(vm, dir_controller, dir_save + "controllers/" + name + ".js");
			
			// 渲染服务
			tpl_file(vm, dir_service, dir_save + "services/" + name + ".js");
		}
	}
	
	// 渲染数据库绑定
	tpl_file({
		order_number
	}, dir_server + "config.js", dir_save + "/config.js")
	
	$.log.info("****  结束刷Koa_art服务端  ****");
}

/**
 * @description 渲染模板
 * @param {Object} model 数据模型
 * @param {String} _from 模板路径
 * @param {String} _to 存储路径 
 */
function tpl_file(model, _from, _to) {
	var ret = "";
	// 渲染模板路径
	_from = _from.fullname();

	// 保存文件路径
	_to = _to.fullname();

	// 渲染模型
	var html = tpl.view(_from, model);

	// 结果判断
	if (!html) {
		console.error("模板渲染错误", _to, tpl.error);
		return ret;
	}

	// 生成文件目录
	_to.addDir();

	// 生成页面
	_to.saveText(html);

	return _to;
}

module.exports = koa_art_server;
