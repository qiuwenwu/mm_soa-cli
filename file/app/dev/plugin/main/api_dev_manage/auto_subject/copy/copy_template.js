const {
	join
} = require("path");

const copy = require("./copy.js");

/**
 * @description 复制模板
 * @param {Object} model 数据模型
 * @return {Object} 输出模板
 */
async function copy_template(model) {
	$.log.info("********  开始复制模板  ********");

	// 取出模型数据
	var {
		order,
		filter,
		to,
		from_te
	} = model;

	// 前台模板，后台模板，模式，UI，程序框架
	var {
		tpl_home,
		tpl_admin,
		mode,
		ui,
		framework
	} = order;

	// 判断后台模板是否需要
	if (tpl_admin) {
		var _from = "";
		var _to = "";
		if (mode == "MVVM" || framework == "vue_cli") {
			// 后台模板路径
			_from = from_te + "vue_cli/admin/" + tpl_admin + "/default";
			// 传出路径
			_to = to + "/client_admin";
		} else {
			// 后台模板路径
			_from = from_te + framework + "/admin/" + tpl_admin + "/default";
			// 传出路径
			_to = to + "/server";
		}
		_from = _from.fullname();
		_to = _to.fullname();
		_to.addDir(__dirname);
		await copy(_from, _to, filter);
	}

	// 判断前台模板是否需要
	if (tpl_home) {
		// 前台模板路径
		var _from = from_te + framework + "/home/" + tpl_home + "/default";
		var _to = "";
		// 确认模式
		if (mode == "MVVM") {
			_to = to + "/client_home";

		} else {
			_to = to + "/server";
		}
		_from = _from.fullname();
		_to = _to.fullname();
		_to.addDir(__dirname);
		await copy(_from, _to, filter);
	}

	$.log.info("********  结束复制模板  ********");
	return {
		tpl_home,
		tpl_admin
	};
}

module.exports = copy_template;
