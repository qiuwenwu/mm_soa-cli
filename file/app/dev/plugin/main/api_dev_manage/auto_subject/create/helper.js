const fs = require("fs");
var tpl = new $.Tpl();

// 
tpl.config.root = "";

var filter_dir = ["page", "diy"];

/**
 * 渲染模板模型
 * @param {Object} vm 数据模型
 * @param {String} _from 复制来源
 * @param {String} _to	 粘贴位置
 */
function tpl_dir(vm, _from, _to) {
	if (!isExist(_to)) {
		// 创建目录
		fs.mkdirSync(_to);
	}
	try {
		var paths = fs.readdirSync(_from);
		paths.forEach((path) => {
			// 过滤刷出内容
			if (filter_dir.indexOf(path) === -1) {
				var src = `${_from}/${path}`;
				var dist = `${_to}/${path}`;
				var stat = fs.statSync(src);
				try {
					if (stat.isFile()) {
						tpl_file(vm, src, dist);
					} else if (stat.isDirectory()) {
						tpl_dir(vm, src, dist);
					}
				} catch (err) {
					// 子级类型错误
					console.error(err);
				}
			}
		});
	} catch (err) {
		// 识别子级错误
		console.error(err);
	}
}

/**
 * @description 渲染模板
 * @param {Object} model 数据模型
 * @param {String} _from 模板路径
 * @param {String} _to 存储路径 
 */
function tpl_file(model, _from, _to) {
	try{
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
			return null;
		}
		
		// 生成文件目录
		_to.addDir();
		
		// 生成页面
		_to.saveText(html);
		
		return _to;
	}catch(err){
		console.error(err);
	}
	return null;
}

/**
 * 判断是否存在
 * @param  {String} file 
 * @return {Promise}
 */
function isExist(path) {
	var bl = false;
	try {
		fs.accessSync(path, fs.constants.R_OK | fs.constants.W_OK);
		bl = true;
	} catch (err) {
		console.error(`${path} 不存在`);
	}
	return bl;
}


/**
 * @description 获取需要渲染的部分
 * @param {Array} fields 字段集
 */
function get_vm(fields) {
	var vm = {};
	// 循环 表 过滤 非 图片列表页内容 以及 存放到对应属性
	for (var i = 0; i < fields.length; i++) {
		var field = fields[i];
		if (field) {
			var type = field.type;
			var name = field.name;
			var title = field.title;

			// 判断是否属性齐全
			if (vm.img && vm.title && vm.name && vm.text && vm.price && vm.num) {
				break;
			}

			// 判断是否未存放 图片 并且是 图片 属性
			else if (!vm.img && type === "图片") {
				// console.log("有获取");
				vm.img = name;
			}

			// 判断是否未存放 标题 并且是 文本 属性 同时还是具有 `标题`或`名称` 关键词
			else if (!vm.title && type === "文本" && (title.indexOf("标题") !== -1 || title.indexOf("名称") !== -1)) {
				vm.title = name;
			}

			// 判断是否未存放 姓名 并且是 文本 属性 同时还是具有 `姓名` 关键词
			else if (!vm.name && type === "文本" && title.indexOf("姓名") !== -1) {
				vm.name = name;
			}

			// 判断是否未存放 文本 并且是 文本 属性 注：这是用于存放无法辨识文本
			else if (!vm.text && type === "文本") {
				vm.text = name;
			}

			// 判断是否未存放 价格 并且是 数字 属性 同时还是具有 `价格` 关键词
			else if (!vm.price && type === "数字" && (title.indexOf("价格") !== -1 || title.indexOf("单价") !== -1 || title
					.indexOf("现价") !== -1)) {
				vm.price = name;
			}

			// 判断是否未存放 数字 并且是 数字 属性 注：这是用于存放无法辨识数字
			else if (!vm.num && type === "数字") {
				vm.num = name;
			}
		}
	}
	return vm;
}

module.exports = {
	tpl_dir,
	tpl_file,
	isExist,
	get_vm
};