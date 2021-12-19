const path = require('path');
const fs = require('fs');
var dir = '/app/sys/static/file/';
var url_path = "/sys/file/";
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
		var name;
		if (req.body.name) {
			name = req.body.name
		} else {
			name = "file_" + stamp
		}
		name += '.' + f.name.split('.').pop();
		var _path = url_path;
		var _dir = req.body.dir;
		console.log(_dir);
		if (_dir) {
			var arr = _dir.split("/");
			if (!_dir.endWith("/")) {
				_dir += "/"
			}
			_path = _dir;
			console.log(arr);
			if (arr.length > 3) {
				_dir = `/app/${arr[1]}/plugin/${arr[2]}/static`.fullname();
				if (!fs.existsSync(_dir)) {
					return $.ret.error(10000, "保存文件目录" + _dir + "不存在！");
				}
				_dir += arr.slice(4).join("/");
				if (!fs.existsSync(_dir)) {
					fs.mkdirSync(_dir, err => {
						console.log(err)
						console.log('创建失败')
					});
				}
			} else if (arr.length > 2) {
				_dir = `/app/${arr[1]}/plugin/${arr[2]}/static`.fullname();
				if (!fs.existsSync(_dir)) {
					_dir = `/app/${arr[1]}/static/${arr[2]}`.fullname();
					if (!fs.existsSync(_dir)) {
						return $.ret.error(10000, "保存文件目录" + _dir + "不存在！");
					}
				}
			} else if (arr.length > 1) {
				_dir = `/app/${arr[1]}/static`.fullname();
				if (!fs.existsSync(_dir)) {
					return $.ret.error(10000, "保存文件目录" + _dir + "不存在！");
				}
			} else {
				_dir = dir + _dir;
				if (!fs.existsSync(_dir)) {
					fs.mkdirSync(_dir, err => {
						console.log(err)
						console.log('创建失败')
					});
				}
			}
		} else {
			_path = url_path;
			_dir = dir;
			if (!fs.existsSync(_dir)) {
				fs.mkdirSync(_dir, err => {
					console.log(err)
					console.log('创建失败')
				});
			}
		}
		let file = path.join(_dir, name);
		// 创建写入流
		try {
			if (fs.existsSync(file)) {
				var arr = name.split(".");
				name = arr[0];
				var extension = arr[1];
				var num = 10000;
				for (var i = 0; i < num; i++) {
					var na = name + "_" + (i + 1) + "." + extension;
					file = path.join(_dir, na);
					if (!fs.existsSync(file)) {
						name = na;
						break;
					}
				}
			}
			const upStream = fs.createWriteStream(file);
			render.pipe(upStream);
			url = _path + name;
		} catch (e) {
			fs.closeSync(file);
			console.log(e);
		}
		return $.ret.obj({
			url
		});
	} else {
		return $.ret.error(10000, "上传的文件（file）不能为空！");
	}

};

exports.main = main;
