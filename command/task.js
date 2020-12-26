const program = require('commander');
var dir_from = './template/'.fullname(__dirname + "/");
var dir_to = process.cwd() + "/";

program
	.command('create-task <name> <app_name>')
	.action((name, app_name, options) => {
		var dir = ("./app/" + app_name).fullname(dir_to);
		dir.addDir();
		dir = './plugin/'.fullname(dir);
		dir.addDir();

		dir = './main/'.fullname(dir);
		dir.addDir();

		dir = './task/'.fullname(dir);
		dir.addDir();

		dir = ('./' + name).fullname(dir);
		dir.addDir();

		var file = `./task.json`.fullname(dir);
		if (file.hasFile()) {
			console.log('create task error'.red);
			console.log('	task already exists!');
		} else {
			file.saveText('');
			console.log('create task success'.green);
			console.log('file path:', file);
		}
	}).on('--help', function() {
		console.log('');
		console.log('Examples:');
		console.log('');
		console.log('  $ mm create-task admin_pc bbs');
	}).alias('c-task');
