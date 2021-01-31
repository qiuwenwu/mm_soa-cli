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
	var color = q["color"];
	var bl = false;
	if (color) {
		ctx.cookies.set('theme_color', color);
		bl = true;
	}

	var style = q["style"];
	if (style) {
		ctx.cookies.set('theme_name', style);
		bl = true;
	}
	if (bl) {
		return $.ret.bl(true, "设置成功！");
	} else {
		return $.ret.bl(false, "设置失败！");
	}
};

exports.main = main;
