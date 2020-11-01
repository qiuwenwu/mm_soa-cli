const program = require('commander');
var dir_from = './template/'.fullname(__dirname);
var dir_to = process.cwd() + "/";

program
	.command('create-app <name>')
	.action((name, options) => {
		var dir = ("./app/" + name).fullname(dir_to);
		dir.addDir();
		var file = "./app.json".fullname(dir);
		if (file.hasFile()) {
			console.log('create app error'.red);
			console.log('	App already exists!');
		}
		else {
			file.saveText('');
			console.log('create app success'.green);
			console.log('file path:', file);
		}
	}).on('--help', function() {
		console.log('');
		console.log('Examples:');
		console.log('');
		console.log('  $ mm create-app home');
	}).alias('c-app');

program
	.command('install-app <name@version>')
	.action((name, options) => {
		console.log(name);
	}).on('--help', function() {
		console.log('');
		console.log('Examples:');
		console.log('');
		console.log('  $ mm install-app home');
	}).alias('i-app');

program
	.command('uninstall-app <name@version>')
	.action((name, options) => {
		console.log(name)
	}).on('--help', function() {
		console.log('');
		console.log('Examples:');
		console.log('');
		console.log('  $ mm uninstall-app home');
	}).alias('u-app');
