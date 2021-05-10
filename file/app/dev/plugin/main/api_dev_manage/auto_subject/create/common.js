const {
	tpl_dir,
	tpl_file,
	isExist,
	get_vm
} = require("./helper.js");

class Common {
	/**
	 * 构造函数
	 * @param {Object} config 配置参数
	 */
	constructor(config) {
		/**
		 * 配置参数
		 */
		this.config = Object.assign({
			// 模板路径
			dir_form: "",
			// 生成文件路径
			dir_to: "",
			// 模式
			mode: "MVVM"
		}, config);
	}
}

Common.prototype.tpl_dir = tpl_dir;
Common.prototype.tpl_file = tpl_file;
Common.prototype.isExist = isExist;
Common.prototype.get_vm = get_vm;

/**
 * 渲染页面，用于遍历时
 * @param {Object} model 数据模型
 * @param {String} form 来源模板地址
 * @param {String} to 生成存放地址
 * @return {String} 成功返回null, 失败模板地址
 */
Common.prototype.render_sub = function(model, form, to) {
	var ret = "";

	// 渲染模板路径
	form = form.fullname();

	// 保存文件路径
	to = to.fullname();

	// 渲染模型
	var html = tpl.view(form, model);

	// 结果判断
	if (!html) {
		console.error("模板渲染错误", form, tpl.error);
		return;
	}

	// 生成文件目录
	to.addDir();

	// 生成页面
	to.saveText(html);

	return null;
};

/**
 * 渲染
 * @param {Object} model 数据模型
 * @return {Object} 成功返回null, 失败返回错误信息
 */
Common.prototype.render = function(model) {
	var error;

	// 从 模型 中取出 订单 表集
	var {
		tables
	} = model;

	// 渲染页面集
	if (tables) {
		for (var i = 0; i < tables.length; i++) {
			error = this.render_sub(model, tables[i]);
			if (error) {
				break
			}
		}
	}

	// 渲染模板模型
	var {
		dir_form,
		dir_to
	} = this.config;
	this.tpl_dir(model, dir_form, dir_to);
	return error;
}

/**
 * 转换字段
 * @param {Object} model 模型
 * @param {Object} table 表模型
 * @param {Object} field 字段模型
 * @return {Object} 成功返回null, 失败返回错误信息
 */
Common.prototype.change_field = function(model, table, field) {
	var exp = field.compute;
	var list = table.fields_sort;
	for(var i = 0; i < list.length; i++){
		exp = exp.replaceAll(list[i].title, "form['" + list[i].name + "']");
	}
	field.exp = exp;
};

/**
 * 转换表
 * @param {Object} model 模型
 * @param {Object} table 表模型
 * @return {Object} 成功返回null, 失败返回错误信息
 */
Common.prototype.change_table = function(model, table) {
	var {
		fields
	} = table;

	// 转换字段
	for (var i = 0; i < fields.length; i++) {
		this.change_field(model, table, fields[i]);
	}
};

/**
 * 转换
 * @param {Object} model 模型
 * @return {Object} 成功返回null, 失败返回错误信息
 */
Common.prototype.change = function(model) {
	var {
		tables
	} = model;

	// 转换表
	for (var i = 0; i < tables.length; i++) {
		this.change_table(model, tables[i]);
	}
};

/**
 * 过滤
 * @param {Object} model 模型
 * @return {Object} 成功返回null, 失败返回错误信息
 */
Common.prototype.filter = function(model) {
	
};

/**
 * 执行创建主函数
 * @param {Object} model 模型
 * @return {Object} 成功返回null, 失败返回错误信息
 */
Common.prototype.main = function(model) {
	var error;
	// 1.过滤
	error = this.filter(model);
	if (error) {
		return error;
	}

	// 2.转换
	error = this.change(model);
	if (error) {
		return error;
	}

	// 3.渲染
	error = this.render(model);
	if (error) {
		return error;
	}
};


/**
 * 执行创建 （封装函数时调用该函数）
 * @param {Object} model 模型
 * @return {Object} 成功返回null, 失败返回错误信息
 */
Common.prototype.run = function(model) {
	var error = this.main(model);
	if (error) {
		return error
	} else {
		return $.ret.bl(true, "渲染成功！");
	}
};

module.exports = Common;
