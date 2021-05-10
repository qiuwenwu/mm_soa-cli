// 加载复制框架
const copy_framework = require("./copy/copy_framework.js");

// 加载复制模板
const copy_template = require("./copy/copy_template.js");

// 项目存放根
var to = "../project/";

// 模板来源根
const from_te = "../template/";

// 框架来源根
const from_fk = "../framework/";

// 初始化过滤
const filter = [".git", "node_modules", ".gitattributes", ".gitignore", "README.en.md", "README.md"];

/**
 * 第二步，复制文件
 * @param {Object} db 数据库管理
 * @param {Object} model 模型
 */
async function copy_file(db, model) {
	$.log.info("********    开始复制    ********");

	// 附加过滤
	var _filter = [...model.filter_admin];
	_filter.addList(filter);

	// 取出订单
	var order = model.order;

	// 生成项目地址
	var _to = to + order.order_number;
	_to.addDir(__dirname);

	// 建立框架模型
	var vm_fk = Object.assign({}, {
		order,
		"filter": _filter,
		from_fk,
		"to": _to
	})

	// 执行复制框架
	var obj = await copy_framework(vm_fk);

	// 取出服务端和客户端
	var {
		fk_server,
		fk_client
	} = obj;

	// 获取框架
	model.fk_server = obj.fk_server;
	model.fk_client = obj.fk_client;

	// 建立模板模型
	var vm_te = Object.assign({}, {
		order,
		"filter": _filter,
		from_te,
		"to": _to
	})

	// 执行复制模板
	await copy_template(vm_te);

	$.log.info("********    结束复制    ********");
}

/**
 * 克隆数组
 * @param {Array} 数组
 * @param {Array} 数组集
 * return {Array}
 */
function arrClone(arr = [], ...arrs) {
	// 序列化 反序列化
	var ar = JSON.parse(JSON.stringify(arr));

	// 判断数组集是否存在
	if (arrs) {
		for (var i = 0; i < arrs.length; i++) {
			var arr2 = arrs[i];
			// 序列化 反序列化
			var ar2 = JSON.parse(JSON.stringify(arr2));
			// 加入数组
			ar.push(...ar2);
		}
	}
	
	return ar;
}

module.exports = copy_file;
