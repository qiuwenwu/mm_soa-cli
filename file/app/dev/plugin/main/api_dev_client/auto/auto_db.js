class Auto_db {
	constructor(arg) {
		
	}
}

Auto_db.prototype.set = async function(db, app, name) {
	var obj = await db.getObj({
		name
	});
	if (!obj) {
		await db.add({
			name
		});
		obj = await db.getObj({
			name
		});
	}
	$.push(obj, app.config);
	ret = $.ret.bl(true);
};

/**
 * 更新应用
 * @param {Object} query
 * @param {Object} body
 * @param {Object} db 数据管理器
 */
Auto_db.prototype.app = async function(query, body, db) {
	var ret;
	var sys = $.pool.app["app"];
	if (sys) {
		db.key = "app_id";
		var name = query.name;
		if (name) {
			var app = sys.get(name);
			if (app) {
				this.set(db, app, name);
			} else {
				ret = $.ret.error(50000, '应用不存在！');
			}
		} else {
			var list = sys.list;
			for (var i = 0; i < list.length; i++) {
				var o = list[i];
				this.set(db, o, o.config.name);
			}
			ret = $.ret.bl(true);
		}
	} else {
		ret = $.ret.error(50000, '未找到系统！');
	}
	return ret;
};

/**
 * 更新数据库
 * @param {Object} query 
 * @param {Object} body
 * @param {Object} db 数据管理器
 */
Auto_db.prototype.run = async function(query, body, db) {
	if (this[query.table]) {
		return await this[query.table](query, body, db);
	} else {
		return $.ret.error(50000, '操作的表不存在！');
	}
};

module.exports = Auto_db;
