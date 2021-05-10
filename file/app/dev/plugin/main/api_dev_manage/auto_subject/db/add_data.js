/**
 * 第一步4，添加数据
 * @param {Object} db_src 数据库(源)
 * @param {Object} db 数据库(新)
 * @param {Object} model 模型
 */
async function add_data(db_src, db, model) {
	var navs = [];

	var {
		tables,
		order
	} = model;
	var config = order.config;
	var {
		bbs_name,
		news_name,
		news_type,
		slide_type
	} = config;

	await add_rand_slides(db_src, db, slide_type);

	if (bbs_name) {
		navs.push({
			name: bbs_name,
			img: "/static/img/img_temp.jpg",
			url: `/forum/list`
		});
	}

	if (news_name) {
		navs.push({
			name: news_name,
			img: "/static/img/img_temp.jpg",
			url: `/article/list`
		});

		await add_rand_article(db_src, db, news_type);
	}

	if (config.order) {
		if (config.order.indexOf("留言板") !== -1) {
			navs.push({
				name: "留言反馈",
				img: "/static/img/img_temp.jpg",
				url: `/message/index`
			});
		}

		if (config.order.indexOf("客服聊天") !== -1) {
			navs.push({
				name: "在线咨询",
				img: "/static/img/img_temp.jpg",
				url: `/chat/index`
			});
		}

		if (config.order.indexOf("公告") !== -1) {
			navs.push({
				name: "站内公告",
				img: "/static/img/notice.jpg",
				url: `/notice/index`
			});
		}
	}

	for (var i = 0; i < tables.length; i++) {
		var table = tables[i];
		await add_data_table(db_src, db, table);
		var to_page = table.config.to_page;
		if (to_page) {
			var name = table.name;
			var title = table.title;
			if (to_page == "列表") {
				navs.push({
					name: title + "列表",
					img: "/static/img/img_temp.jpg",
					url: `/${name}/list`
				});
			} else if (to_page == "添加") {
				navs.push({
					name: "添加" + title,
					img: "/static/img/img_temp.jpg",
					url: `/${name}/edit`
				});
			} else if (to_page == "详情") {
				navs.push({
					name: title + "详情",
					img: "/static/img/img_temp.jpg",
					url: `/${name}/view?${table.name}_id=0`
				});
			}
		}
	}

	db.table = "nav";
	for (var i = 0; i < navs.length; i++) {
		await db.add(navs[i]);
	}
}

/**
 * 添加随机轮播图
 * @param {Object} db_src 源数据库
 * @param {Object} db 新数据库
 * @param {Object} name 主题名称
 */
async function add_rand_slides(db_src, db, name) {
	/*  添加默认数据  */
	var list = [];

	db_src.table = "dev_theme";
	var obj = await db_src.getObj({
		name
	});

	var theme_id = 0;
	if (obj) {
		theme_id = obj.theme_id;
	}
	db_src.table = "dev_image";
	db_src.page = 1;
	db_src.size = 1000;
	var list = await db_src.get({
		theme_id,
		type: "轮播图"
	});

	// 添加默认数据
	db.table = "slides";
	var len = list.length;
	if (len > 6) {
		len = 6;
	}
	for (var i = 0; i < len; i++) {
		var idx = random(0, list.length);
		var o = list[idx];
		var id = (i + 1);
		await db.add({
			title: `轮播图${id}`,
			content: `内容${id}`,
			url: "/article/details?article=" + id,
			img: o.img,
			hits: random(0, 1000)
		});
	}
}

/**
 * 添加随机文章
 * @param {Object} db_src 源数据库
 * @param {Object} db 新数据库
 * @param {Object} type 类型
 */
async function add_rand_article(db_src, db, type) {
	/*  添加默认数据  */
	var list = [];
	db_src.table = "dev_article";
	db_src.page = 1;
	db_src.size = 1000;
	var list = await db_src.get({
		type
	});

	// 添加默认数据
	db.table = "article";
	var len = list.length;
	if (len > 6) {
		len = 6;
	}
	for (var i = 0; i < len; i++) {
		var idx = random(0, list.length);
		var o = list[idx];
		await db.add({
			title: o.title,
			hits: o.hits || random(0, 1000),
			source: o.source,
			tag: o.tag,
			type: o.type,
			content: o.content,
			img: o.img,
			description: o.description
		});
	}
}

/**
 * 添加数据表
 * @param {Object} db_src 数据
 * @param {Object} db 数据库操作
 * @param {Object} table 表
 */
async function add_data_table(db_src, db, table) {
	db.table = "goods_type";
	var config = table.config;
	if (config.cart_page && config.cart_page !== "无") {
		await db.add({
			name: table.title,
			desc: table.title + '(' + table.name + ')',
			icon: "",
			source_table: table.name,
			source_field: table.name + "_id"
		});
	}
}

/**
 * 随机范围取数值
 * @param {Number} 最小值 min
 * @param {Number} 最大值 max
 * @return {Number}
 */
function random(min, max) {
	var min = Math.min(min, max);
	var max = Math.max(min, max);
	var diff = max - min;
	return Math.floor(Math.random() * diff + min);
}

module.exports = add_data;