// 使用mysql数据库管理器
var sql = $.mysql_admin('sys', __dirname);

/**
 * @description 接口主函数 —— 管理日志
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	var req = ctx.request;
	if (req.method == "POST") {
		var user = ctx.session.user;
		if (user) {
			var {
				user_id,
				username
			} = user;
			var title = "";
			var key = "";
			var path = ctx.path;
			var app = (path + "").between("/apis/", "/");
			var key = app + "_manage";
			var dict = $.pool.api[key];
			if (dict) {
				var list = dict.list;
				title += dict.title.replace("管理端", "");
				for (var i = 0; i < list.length; i++) {
					var o = list[i];
					if (path.has(o.config.path)) {
						title += " " + o.config.title;
						var method = req.query.method;
						if (!method) {
							title += " 更新";
						} else if (method === "set") {
							title += " 修改";
						} else if (method === "add") {
							title += " 添加";
						} else if (method === "del") {
							title += " 删除";
						}
						break;
					}
				}
			}

			var url = req.url;
			var ip = ctx.ip.replace('::ffff:', '');
			var useragent = ctx.headers["user-agent"];
			var body = req.body;
			var content;
			if (body.content) {
				var by = Object.assign({}, body);
				if (by.content.length > 10000) {
					delete by.content;
				}
				content = JSON.stringify(by);
			} else {
				content = JSON.stringify(body);
				if (content.length > 10000) {
					content = "";
				}
			}

			var db2 = sql.db();
			db2.table = "user_admin_log";
			db2.add({
				user_id,
				username,
				title,
				url,
				content,
				ip,
				useragent
			});
		}
	}
};

exports.main = main;
