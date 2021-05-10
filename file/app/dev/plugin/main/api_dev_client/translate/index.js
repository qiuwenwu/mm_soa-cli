// 集合路由、导航，不开发前端的情况下可以将以下2行注释掉
// const nav = $.nav_admin('{0}');
// nav.update();

/**
 * 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	// 获取请求参数
	var req = ctx.request;
	var q = req.query;
	var {
		word
	} = q;
	db.table = "dev_dict";
	var obj = await db.getObj({ zh: word });
	if(obj){
		return {
			result: obj.en
		}
	}
	else {
		var ret = await $.translate(word);
		var json = ret.result;
		if (json) {
			var en = json.dst.toLowerCase().replace(/ /g, "_").replace(/'s/g, "").replace(/-/g, "_").replace(/\./g, "").replace(/\?/g, "");
			db.add({ zh: word, en });
			return {
				result: en
			}
		}
		else {
			return ret;
		}
	};
};

$.translate_main = main;

exports.main = main;
