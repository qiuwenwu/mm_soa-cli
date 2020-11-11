const program = require('commander');
var dir_from = './template/'.fullname(__dirname);
var dir_to = process.cwd() + "/";

program
	.command('create-api <name> <app_name>')
	.action((name, app_name, options) => {
		var dir = ("./app/" + app_name).fullname(dir_to);
		dir.addDir();
		var dir_event = "./event_api/".fullname(dir);
		dir_event.addDir();
		dir_event = ('./client/').fullname(dir_event);
		dir_event.addDir();
		var file_event = "./event.json".fullname(dir_event);
		if (!file_event.hasFile()) {
			file_event.saveText('');
		}
		dir = './plugin/'.fullname(dir);
		dir.addDir();
		
		dir = './main/'.fullname(dir);
		dir.addDir();
		
		dir = ('./api_' + app_name + '_client/').fullname(dir);
		dir.addDir();
		
		dir = ('./' + name + "/").fullname(dir);
		dir.addDir();
		
		var file = "./api.json".fullname(dir);
		if (file.hasFile()) {
			console.log('create api error'.red);
			console.log('	API already exists!');
			// console.log('route path:', file);
		}
		else {
			file.saveText('');
			console.log('create api success'.green);
			console.log('file path:', file);
			console.log('route path:', `/api/${app_name}/${name}`);
		}
	}).on('--help', function() {
		console.log('');
		console.log('Examples:');
		console.log('');
		console.log('  $ mm create-api test bbs');
	}).alias('c-api');