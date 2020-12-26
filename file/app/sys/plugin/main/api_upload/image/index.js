const path = require('path');
const fs = require('fs');
var dir = '/app/sys/static/img/';
var url_path = "/sys/img/";
/**
 * @description 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	var req = ctx.request;
	var query = req.query;
	var url = "";
	if (req.files && req.files.file) {
		var f = req.files.file;
		// 创建可读流
		const render = fs.createReadStream(f.path);
		var stamp = Date.now();
		var name = "image_" + stamp + '.' + f.name.split('.').pop();
		let file = path.join($.runPath, dir, name);
		const fileDir = path.join($.runPath, dir);
		if (!fs.existsSync(fileDir)) {
			fs.mkdirSync(fileDir, err => {
				console.log(err)
				console.log('创建失败')
			});
		}
		// 创建写入流
		try {
			const upStream = fs.createWriteStream(file);
			render.pipe(upStream);
			url =  url_path + name;
		} catch (e) {
			fs.closeSync(file);
			console.log(e);
		}
	} else if (req.body['image']) {
		var data = req.body['image'];
		var extension = data.between('image/', ';');
		if(!extension){
			extension = req.body['filename'].split('.').pop();
		}
		data = data.replace(/^data:image\/\w+;base64,/, "");
		var bf = Buffer.from(data, 'base64');
		var stamp = Date.now();
		var name = "image_" + stamp + "." + extension;
		var file = path.join($.runPath, dir, name);
		try {
			fs.writeFileSync(file, bf);
			url = url_path + name;
		} catch (e) {
			fs.closeSync(file);
			console.log(e);
		}
	}
	return $.ret.obj({
		url
	});
};

exports.main = main;
