class Auto_db {
	constructor(arg) {

	}
}

/**
 * 更新应用
 * @param {Object} query
 * @param {Object} body
 * @param {Object} db 数据管理器
 */
Auto_db.prototype.app = async function(query, body, db) {
	
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
	}
	else {
		return $.ret.error(50000, '操作的表不存在！');
	}
};

module.exports = Auto_db;