/**
 * 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	// 获取请求参数
	var req = ctx.request;
	var qy = req.query;
	var by = req.body;
	
	if (qy.method == "add" || qy.method == "set") {
		var ct = by.content;
		if (ct) {
			var http = new $.Http();
			var mh = ct.match(/<img.*?src=[\"|\']?(.*?)[\"|\']?\s.*?>/gi);
			if (mh && mh.length) {
				for (var i = 0; i < mh.length; i++) {
					var str = mh[i];
					if (str.indexOf("http") !== -1) {
						var url = str.between('src="', '"');
						// var data = await http.download(url, "./sys/down", true);
					}
				}
			}
		}
	}
	var ret = await this.sql.run(qy, by, db);
	return ret;
};

exports.main = main;
