const program = require('commander');
var dir_from = './template/'.fullname(__dirname);
var dir_to = process.cwd() + "/";

var static_json = {
	"index": "index.html",
	"maxAge": 0,
	"convert_amd": true
};

program
	.command('create-nav <name> <app_name>')
	.action((name, app_name, options) => {
		var dir = ("./app/" + app_name).fullname(dir_to);
		dir.addDir();
		dir = './plugin/'.fullname(dir);
		dir.addDir();
		
		dir = ('./' + name + "/").fullname(dir);
		dir.addDir();
		
		dir = './static/'.fullname(dir);
		dir.addDir();
		
		var static_file = `./static.json`.fullname(dir);
		if (!static_file.hasFile()) {
			static_file.saveJson(static_json);
		}
		
		var file = `./${name}.nav.json`.fullname(dir);
		if (file.hasFile()) {
			console.log('create nav error'.red);
			console.log('	nav already exists!');
		}
		else {
			file.saveText('');
			console.log('create nav success'.green);
			console.log('file path:', file);
		}
	}).on('--help', function() {
		console.log('');
		console.log('Examples:');
		console.log('');
		console.log('  $ mm create-nav admin_pc bbs');
	}).alias('c-nav');