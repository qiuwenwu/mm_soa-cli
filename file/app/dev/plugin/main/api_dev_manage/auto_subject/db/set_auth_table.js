/**
 * 第一步3，修改权限表
 * @param {Object} db 数据库操作
 * @param {Object} power 权限
 * @param {Object} user_group 用户组
 * @param {Object} tables 表集
 */
async function set_auth_table(db, power, user_group, tables) {
	db.table = "auth";

	for (var i = 0; i < power.length; i++) {
		var o = power[i];
		var fields = get_fields(tables, o.table_name);
		var obj = {
			"table_name": o.table_name,
			"mod_name": o.mod_name,
			user_group,
			"path": "/" + o.table_name + "/" + o.path,
			"page_title": o.page_title,
			"add": o.add ? 1 : 0,
			"del": o.del ? 1 : 0,
			"set": o.set ? 1 : 0,
			"get": o.get ? 1 : 0,
			"table_nav": o.table_nav ? 1 : 0,
			"table_nav_name": o.table_nav_name,
			"option": JSON.stringify(o.option),
			"field_add": o.field_add ? to_field(fields, o.field_add) : "",
			"field_set": o.field_set ? to_field(fields, o.field_set) : "",
			"field_get": o.field_get ? to_field(fields, o.field_get) : ""
		}
		
		// 查询表
		var ret = await db.getObj({
			"path": obj.path,
			"user_group": obj.user_group
		});

		// 判断结果
		if (ret) {
			await db.set({
				auth_id: ret.auth_id
			}, obj);
		} else {
			var bl = await db.add(obj);
			if (!bl) {
				console.error(bl, db.error);
			}
		}
	}
}

/**
 * 获取字段集合
 * @param {Array} tables 表集合
 * @param {String} name 表名
 */
function get_fields(tables, name) {
	var obj = tables.getObj({
		name
	});
	return obj ? obj.fields : [];
}

/**
 * 取字段
 * @param {Object} fields 字段集
 * @param {Object} arr 要取的字段集
 */
function to_field(fields, arr) {
	var ar = [];
	if (arr.length === 0) {
		ar = fields.map((o) => {
			return o.name;
		}).join(",");
	} else {
		ar = arr.map((title) => {
			var val = fields.getVal('name', {
				title
			});
			return val;
		}).join(",");
	}
	return ar
}

module.exports = set_auth_table;