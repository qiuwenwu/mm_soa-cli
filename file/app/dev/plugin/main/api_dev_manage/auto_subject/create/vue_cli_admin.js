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

	// 取判断
	var {
		cart_page
	} = table.config;

	// 建立模型
	var vm = Object.assign({}, model, {table});

	// 获取表名
	var name = table.name;

	// 创建粘贴位置
	var to = dir_to + "views/" + name;

	// 渲染表格页
	this.tpl_file(vm, dir_form + "views/page/table.vue", to + "/table.vue");

	// 渲染视图页
	this.tpl_file(vm, dir_form + "views/page/view.vue", to + "/view.vue");

	// 判断是否购物车
	if (cart_page !== "无") {
		// 渲染购物车组件
		this.tpl_file(vm, dir_form + "components/diy/diy_goods.vue", to + "components/diy/diy_" + name + ".vue");
	}
};

module.exports = function(model) {
	$.log.info("***  开始刷VueCli客户端后台  ***");

	var {
		tpl_admin,
		order_number
	} = model.order;

	// 判断是否选择后台模板
	if (tpl_admin) {
		var vue_cli = new Vue_cli({
			// 模板存放路径
			dir_form: "../template/vue_cli/admin/" + tpl_admin + "/tpl/src/",
			// 项目存放路径
			dir_to: "../project/" + order_number + "/client_admin/src/",
			model: "MVVM"
		});
		return vue_cli.run(model);
	}

	$.log.info("***  结束刷VueCli客户端后台  ***");

	return null;
}
