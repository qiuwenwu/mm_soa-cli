const fs = require('fs');

/**
 * 复制一个文件夹下的文件到另一个文件夹
 * @param src 源文件夹
 * @param dst 目标文件夹
 */
function copyDir(src, dst) {
	// 读取目录中的所有文件/目录
	try {
		var paths = fs.readdirSync(src);
		for (var i = 0; i < paths.length; i++) {
			var path = paths[i];
			const _src = src + '/' + path;
			const _dst = dst + '/' + path;
			let readable;
			let writable
			var st = fs.statSync(_src);
			// 判断是否为文件
			if (st.isFile()) {
				// 创建读取流
				readable = fs.createReadStream(_src)
				// 创建写入流
				writable = fs.createWriteStream(_dst)
				// 通过管道来传输流
				readable.pipe(writable)
			}
			// 如果是目录则递归调用自身
			else if (st.isDirectory()) {
				exists(_src, _dst, copyDir)
			}
		}
	} catch (err) {
		console.log(err);
	}
}


// function copyDir(src, dst) {
// 	// 读取目录中的所有文件/目录
// 	fs.readdir(src, function(err, paths) {
// 		if (err) {
// 			throw err
// 		}
// 		paths.forEach(function(path) {
// 			const _src = src + '/' + path
// 			const _dst = dst + '/' + path
// 			let readable;
// 			let writable
// 			fs.stat(_src, function(err, st) {
// 				if (err) {
// 					throw err
// 				}
// 				// 判断是否为文件
// 				if (st.isFile()) {
// 					// 创建读取流
// 					readable = fs.createReadStream(_src)
// 					// 创建写入流
// 					writable = fs.createWriteStream(_dst)
// 					// 通过管道来传输流
// 					readable.pipe(writable)
// 				}
// 				// 如果是目录则递归调用自身
// 				else if (st.isDirectory()) {
// 					exists(_src, _dst, copyDir)
// 				}
// 			})
// 		})
// 	})
// }

/**
 * 在复制目录前需要判断该目录是否存在，
 * 不存在需要先创建目录
 * @param src
 * @param dst
 */
function exists(src, dst) {
	// 如果路径存在，则返回 true，否则返回 false。
	if (!fs.existsSync(dst)) {
		fs.mkdirSync(dst)
	}
	copyDir(src, dst);
}

module.exports = exists;
