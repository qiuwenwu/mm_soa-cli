const program = require('commander');
var dir_from = './template/'.fullname(__dirname + "/");
var dir_to = process.cwd() + "/";

// program
// 	.command('create-page <name> <app_name>')
// 	.action((name, app_name, options) => {
// 		var dir = ("./app/" + app_name).fullname(dir_to);
// 		dir.addDir();
// 		dir = './plugin/'.fullname(dir);
// 		dir.addDir();
		
// 		dir = ('./' + name).fullname(dir);
// 		dir.addDir();
		
// 		dir = './static'.fullname(dir);
// 		dir.addDir();
		
// 		var static_file = `./static.json`.fullname(dir);
// 		if (!static_file.hasFile()) {
// 			static_file.saveJson(static_json);
// 		}
		
// 		var file = `./${name}.page.json`.fullname(dir);
// 		if (file.hasFile()) {
// 			console.log('create page error'.red);
// 			console.log('	page already exists!');
// 		}
// 		else {
// 			file.saveText('');
// 			console.log('create page success'.green);
// 			console.log('file path:', file);
// 		}
// 	}).on('--help', function() {
// 		console.log('');
// 		console.log('Examples:');
// 		console.log('');
// 		console.log('  $ mm create-page admin_pc bbs');
// 	}).alias('c-page');