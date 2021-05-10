var tpl = new $.Tpl();

// 
tpl.config.root = "";

/**
 * @description 创建mini_app模板
 * @param {Objact} model 模型
 */
function mini_app_home(model) {
$.log.info("****  开始刷Mini_app客户端前台  ****");
  
	// 获取过滤
	var filter = add_filter(model);
	
	// 从 模型 中取出 订单 表集
	var {
		order,
		tables
	} = model;

	// 从 订单 取 框架 模板
	var {
		tpl_home,
		order_number
	} = order;

	// 判断是否选择前台模板
	if (tpl_home) {
		// 模板存放路径
		var _from = "../template/mini_app/home/" + tpl_home + "/tpl/src/";

		// 项目存放路径
		var _to = "../project/" + order_number + "/client_home/src/";

		// 建立模型
		var vm = Object.assign({}, {
			filter
		}, model);

		// 渲染页面集
		if (tables && tables.length > 0) {
			tpl_pages(vm, _from, _to);
		}

		// 渲染模板模型
		tpl_dir(vm, _from, _to);

	} else {
		console.error("不能没有前台模板");
	}

	$.log.info("****  结束刷Mini_app客户端前台  ****");
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

/**
 * 渲染页集
 * @param {Object} model 数据模型
 * @param {String} _from 来源目录
 * @param {String} _to 保存目录
 */
function tpl_pages(model, _from, _to) {

	// 从 模型 中取出 订单 表集
	var {
		tables,
		filter
	} = model;

	try {

		for (var i = 0; i < tables.length; i++) {

			// 取出表
			var table = tables[i];

			// 提取各渲染判断
			var {
				list_page,
				details_page,
				add_page,
				cart_page
			} = table.config;

			// 建立模型
			var vm = Object.assign({}, {
				table,
				filter
			});

			// 获取表名
			var name = table.name;

			// 渲染组件列表页
			tpl_file(vm, _from + "components/diy/list.vue", _to + "components/diy/list_" + name + ".vue");

			// 渲染组件详情页
			tpl_file(vm, _from + "components/diy/details.vue", _to + "components/diy/div_" + name + ".vue");

			// 渲染添加页
			switch (add_page) {
				case "有添加":
					tpl_file(vm, _from + "pages/page/edit.vue", _to + "pages/" + name + "/edit.vue");
					break;
			}

			// 判断列表页
			switch (list_page) {
				case "带图列":
					var fields = table.fields;
					fields = get_vm(fields);
					table.fields = fields;
					// 刷新数据模型
					vm = Object.assign({}, vm, {
						table
					});
					tpl_file(vm, _from + "pages/page/list.vue", _to + "pages/" + name + "/list.vue");
					break;
				case "前列表":
					tpl_file(vm, _from + "pages/page/list.vue", _to + "pages/" + name + "/list.vue");
					break;
			}

			// 判断详情页
			switch (details_page) {
				case "前详情":
					// 渲染详情页
					tpl_file(vm, _from + "pages/page/details.vue", _to + "pages/" + name + "/details.vue");
					break;
			}
		}

	} catch (err) {
		console.error(err);
	}

}

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
	ret = _to.saveText(html);

	return _to;
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
 * @description 添加过滤条件
 * @param {Object} model 模型
 */
function add_filter(model) {

	var filter = {};

	// 获取模型 订单 和 表
	var {
		order,
		tables
	} = model;

	if (!order) {
		return false;
	}

	// 
	var config = JSON.parse(order.config);

	// 获取订单 配置
	var {
		bbs_name,
		cms,
		mall,
		training
	} = config;

	// 判断是否有论坛
	filter.forum = bbs_name;

	// 内容管理
	filter.cms = cms;

	// 商城
	filter.mall = mall;

	// 培训教育
	filter.training = training;

	// 获取其他模块
	var other = config.order;

	if (other) {
		// 公告
		filter.notice = other.indexOf("公告") != -1;

		// 留言板
		filter.message = other.indexOf("留言板") != -1;

		// 客服聊天
		filter.chat = other.indexOf("客服聊天") != -1;
	}

	// 表内容过滤
	var has_cart = false;
	var has_comment = false;
	var has_collect = false;
	var has_praise = false;

	for (var i = 0; i < tables.length; i++) {
		if (has_cart && has_comment && has_collect && has_praise) {
			break;
		}

		var config = tables[i].config;

		// 是否带购物车
		if (config.cart_page != "无") {
			has_cart = true;
		}

		// 是否带评论页
		if (config.comment) {
			has_comment = true;
		}

		// 是否带收藏
		if (config.collect) {
			has_collect = true;
		}

		// 是否带点赞
		if (config.praise) {
			has_praise = true;
		}
	}

	// 过滤购物车
	filter.cart = has_cart;

	// 过滤评论
	filter.comment = has_comment;

	// 过滤收藏
	filter.collect = has_collect;

	// 过滤点赞
	filter.praise = has_praise;

	return filter;
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

module.exports = mini_app_home;
