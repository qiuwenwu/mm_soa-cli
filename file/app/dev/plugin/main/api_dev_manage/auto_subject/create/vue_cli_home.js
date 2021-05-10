const Common = require("./common.js");

/**
 * Vue_cli类
 */
class Vue_cli extends Common {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		super(config);
	}
}


/**
 * 渲染页集
 * @param {Object} model 数据模型
 * @param {Object} table 数据表
 */
Vue_cli.prototype.render_sub = function(model, table) {
	var {
		dir_form,
		dir_to
	} = this.config;
	
	// 从 模型 中取出 订单 表集
	var {
		tables,
		filter
	} = model;

	var fields = table.fields;

	// 提取各渲染判断
	var {
		list_page,
		details_page,
		add_page,
		cart_page
	} = table.config;

	// 过滤
	var obj = this.get_vm(fields);

	// 建立模型
	var vm = Object.assign({}, model, {
		table,
		obj
	});

	if (obj.img) {
		// 获取表名
		var name = table.name;

		// 渲染组件列表页
		this.tpl_file(vm, dir_form + "components/diy/list.vue", dir_to + "components/diy/list_" + name + ".vue");
	}

	// 渲染组件详情页
	this.tpl_file(vm, dir_form + "components/diy/details.vue", dir_to + "components/diy/div_" + name + ".vue");

	switch (add_page) {
		case "有添加":
			this.tpl_file(vm, dir_form + "views/page/edit.vue", dir_to + "views/" + name + "/edit.vue");
			break;
	}

	// 判断列表页
	switch (list_page) {
		case "带图列":
			this.tpl_file(vm, dir_form + "views/page/list.vue", dir_to + "views/" + name + "/list.vue");
			break;
		case "前列表":
			this.tpl_file(vm, dir_form + "views/page/list.vue", dir_to + "views/" + name + "/list.vue");
			break;
	}

	// 判断详情页
	switch (details_page) {
		case "前详情":
			// 渲染详情页
			this.tpl_file(vm, dir_form + "views/page/details.vue", dir_to + "views/" + name + "/details.vue");
			break;
	}
};


module.exports = function(model) {

	$.log.info("***  开始刷VueCli客户端前台  ***");
	var {
		tpl_home,
		order_number
	} = model.order;

	// 判断是否选择前台模板
	if (tpl_home) {
		var vue_cli = new Vue_cli({
			// 模板存放路径
			dir_form: "../template/vue_cli/home/" + tpl_home + "/tpl/src/",
			// 项目存放路径
			dir_to: "../project/" + order_number + "/client_home/src/",
			model: "MVVM"
		});
		return vue_cli.run(model);
	}

	$.log.info("***  结束刷VueCli客户端前台  ***");
	return null;
}
