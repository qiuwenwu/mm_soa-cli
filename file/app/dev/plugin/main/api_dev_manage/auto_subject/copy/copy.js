const fs = require("fs")
/**
 * 复制文件
 * @param {String} from 来源路径
 * @param {String} to 复制到路径
 * @param {String} filter 过滤文件或目录
 * @param {String} type 复制类型，dir目录 或 file文件
 */
async function copy(from, to, filter, type = "dir") {
	if (!from) {
		console.error("请输入要复制的文件或目录");
		return;
	}
	try {
		if(from.indexOf("//") != -1){
			from = from.replace("//","/");
		}
		
		if(to.indexOf("//") != -1){
			to = to.replace("//","/");
		}
		
		if (isExist(from)) {
			if (!to) {
				console.error("请选择要复制到哪个目录");
				return;
			}
			if (type == "file") {
				// 进入复制文件
				copyFile(from, to);
			} else {
				// 进入复制目录
				copyDir(from, to, filter);
			}
		}
	} catch (err) {
		console.error(err);
	}
}

/**
 * 复制文件
 *
 * @param  {String} from 被复制对象
 * @param  {String} to   复制对象
 */
function copyFile(from, to) {
	fs.writeFileSync(to, fs.readFileSync(from));
}

/**
 * 复制目录
 *
 * @param  {String} from 被复制对象
 * @param  {String} to	 复制对象
 */
function copyDir(from, to, filter) {
	if (!isExist(to)) {
		// 创建目录
		fs.mkdirSync(to);
	}
	try {
		var paths = fs.readdirSync(from);
		paths.forEach((path) => {
			if (filter.indexOf(path) === -1) {
				var src = `${from}/${path}`;
				var dist = `${to}/${path}`;
				var stat = fs.statSync(src);
				try {
					if (stat.isFile()) {
						copyFile(src, dist);
					} else if (stat.isDirectory()) {
						copyDir(src, dist, filter);
					}
				} catch (err) {
					console.error(err);
				}
			}
		});
	} catch (err) {
		console.error(err);
	}
}

/**
 * 判断是否存在
 * @param  {String} file 
 * @return {Promise}
 */
function isExist(path) {
	var bl = false;
	try {
		fs.accessSync(path, fs.constants.R_OK | fs.constants.W_OK);
		bl = true;
	} catch (err) {
		// 判断目录不存在
	}
	return bl;
}

module.exports = copy
