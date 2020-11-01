const program = require('commander');
var dir_from = './template/'.fullname(__dirname);
var dir_to = process.cwd() + "/";

program
	.command('create-plugin <name> <app_name>')
	.action((name, app_name, options) => {
		var dir = ("./app/" + app_name).fullname(dir_to);
		dir.addDir();
		dir = './plugin/'.fullname(dir);
		dir.addDir();
		
		dir = ('./' + name).fullname(dir);
		dir.addDir();
		
		var file = "./plugin.json".fullname(dir);
		if (file.hasFile()) {
			console.log('create plguin error'.red);
			console.log('	Plguin already exists!');
		}
		else {
			file.saveText('');
			console.log('create plguin success'.green);
			console.log('file path:', file);
		}
	}).on('--help', function() {
		console.log('');
		console.log('Examples:');
		console.log('');
		console.log('  $ mm create-plugin home');
	}).alias('c-plugin');