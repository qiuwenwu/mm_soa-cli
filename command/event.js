const program = require('commander');
var dir_from = './template/'.fullname(__dirname);
var dir_to = process.cwd() + "/";

program
	.command('create-event <name> <app_name>')
	.action((name, app_name, options) => {
		var dir = ("./app/" + app_name).fullname(dir_to);
		dir.addDir();
		dir = './event_api'.fullname(dir);
		dir.addDir();
		
		dir = ('./' + name).fullname(dir);
		dir.addDir();
		
		var file = "./event.json".fullname(dir);		
		if (file.hasFile()) {
			console.log('create event error'.red);
			console.log('	Plguin already exists!');
		}
		else {
			file.saveText('');
			console.log('create event success'.green);
			console.log('file path:', file);
			
			// 修改中
			var l = $.slash;
			var arr = file.split(l);
			arr = arr.slice(arr.indexOf('app'));
			console.log(arr);
			var event_name = arr[3];
			if(event_name.indexOf('manage') !== -1){
				console.log('route path:', `/apis/${app_name}`);
			}
			else if(event_name.indexOf('client') !== -1){
				console.log('route path:', `/api/${app_name}`);
			}
			else {
				console.log('route path:', `/api/${name}`);
			}
		}
	}).on('--help', function() {
		console.log('');
		console.log('Examples:');
		console.log('');
		console.log('  $ mm create-event home');
	}).alias('c-event');