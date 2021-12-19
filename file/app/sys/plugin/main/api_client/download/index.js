const path = require('path');
const fs = require('fs');
var dir = '/app/sys/static/';

/**
 * 接口主函数
 * @param {Object} ctx HTTP上下文
 * @param {Object} db 数据管理器,如: { next: async function{}, ret: {} }
 * @return {Object} 执行结果
 */
async function main(ctx, db) {
	var _dir = ctx.query.path;
	var name = "";
	if (_dir) {
		var arr = _dir.split("/");
		name = arr[arr.length - 1];
		if (!_dir.endWith("/")) {
			_dir += "/"
		}
		if (arr.length > 3) {
			_dir = `/app/${arr[1]}/plugin/${arr[2]}/static/`
			if (!fs.existsSync(_dir.fullname())) {
				return $.ret.error(10000, "保存文件目录" + _dir + "不存在！");
			}
			_dir += arr.slice(4).join("/");
			if (!fs.existsSync(_dir.fullname())) {
				fs.mkdirSync(_dir, err => {
					console.log(err)
					console.log('创建失败')
				});
			}
		} else if (arr.length > 2) {
			_dir = `/app/${arr[1]}/plugin/${arr[2]}/static/`
			if (!fs.existsSync(_dir.fullname())) {
				_dir = `/app/${arr[1]}/static/${arr[2]}/`
				if (!fs.existsSync(_dir)) {
					return $.ret.error(10000, "保存文件目录" + _dir + "不存在！");
				}
			}
		} else if (arr.length > 1) {
			_dir = `/app/${arr[1]}/static/`
			if (!fs.existsSync(_dir)) {
				return $.ret.error(10000, "保存文件目录" + _dir + "不存在！");
			}
		} else {
			_dir = dir + _dir;
			if (!fs.existsSync(_dir.fullname())) {
				fs.mkdirSync(_dir, err => {
					console.log(err)
					console.log('创建失败')
				});
			}
		}
	}
	let file = _dir + name;
	ctx.attachment(ctx.query.path);
	await ctx.send(file);
};

exports.main = main;