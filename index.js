#!/usr/bin/env node

const program = require('commander');
const colors = require('colors');
const download = require('download-git-repo');
const inquirer = require('inquirer');
const ora = require('ora');
require('mm_expand');

var copyFile = require('./copyFile');

console.log('Hello, Welcome to use mm-cli!'.yellow);

program
	.version(require('./package').version, '-v, --version')
	.description('MM package manager')
	.option('-p, --path <dir>', 'setting project dir')


program
	.command('create <project_name>')
	.action((name, options) => {
		inquirer.prompt([{
				name: 'author',
				message: 'author',
				type: "input"
			},
			{
				name: 'version',
				message: 'version',
				type: "input",
				default: '0.1.0'
			},
			{
				name: 'web_title',
				message: 'web title',
				type: "input"
			},
			{
				name: 'web_description',
				message: 'web description',
				type: "input"
			},
			{
				name: 'web_language',
				message: 'web language',
				type: "rawlist",
				choices: [
					"zh",
					"en"
				],
				default: 0
			},
			{
				name: 'cache_mode',
				message: 'cache mode',
				type: "rawlist",
				choices: [
					"redis",
					"cache",
					"memory"
				],
				default: 0
			},
			{
				name: 'timed_task',
				message: 'timed task',
				type: "confirm",
				default: true
			},
			{
				name: 'db',
				message: 'db',
				type: "rawlist",
				choices: [
					"mysql",
					"sqlite",
					"sql server"
				],
				default: 0,
				// when: function(answers) { // 当watch为true的时候才会提问当前问题
				// 	console.log(answers);
				// 	return answers.watch
				// }
			}, {
				name: 'mysql_host',
				message: 'mysql host',
				type: "input",
				default: "127.0.0.1"
			},
			{
				name: 'mysql_database',
				message: 'mysql database',
				type: "input",
				default: "mm"
			},
			{
				name: 'mysql_user',
				message: 'mysql user',
				type: "input",
				default: "root"
			},
			{
				name: 'mysql_password',
				message: 'mysql password',
				type: 'input'
			}
		]).then((answers) => {
			console.log('');
			console.log('');
			console.log('');
			console.log('Please confirm the creation info!'.yellow);
			console.log(answers);
			inquirer.prompt([{
				name: 'confirm_create',
				message: 'confirm create',
				type: "confirm",
				default: true
			}]).then((aws) => {
				if (!aws.confirm_create) {
					return;
				}
				const spinner = ora('Project creating...');
				spinner.start();
				// 复制目录
				var dir_tpl = './template/'.fullname(__dirname);
				copyFile(dir_tpl, './');
				var runPath = './'.fullname(process.cwd());
				var text = './package.json'.fullname(dir_tpl).loadText();
				text = text.replace('{name}', name.trim()).replaceAll('{author}', answers.author.trim()).replaceAll('{version}', answers.version.trim()).replaceAll('{description}', answers.web_description.trim());
				'./package.json'.fullname(runPath).saveText(text);
				spinner.stop('Create completed!'.green);
				console.log('');
				console.log('');
				console.log('');
				
			});
			// console.log(name, answers.description);

			// download('https://github.com/qiuwenwu/mm_template.git',
			// 	answers.project_name, {
			// 		clone: true
			// 	}, (err) => {
			// 		console.log(err ? 'Error' : 'Success')
			// 	});
		});
	}).on('--help', function() {
		console.log('');
		console.log('Examples:');
		console.log('');
		console.log('  $ mm create <name>');
	});

program
	.command('install <version>')
	.action((version, options) => {
		console.log(version);

	}).on('--help', function() {
		console.log('');
		console.log('Examples:');
		console.log('');
		console.log('  $ mm update 2.0');
	}).alias('i');

program
	.command('update <version>')
	.action((version, options) => {
		console.log(version)
	}).on('--help', function() {
		console.log('');
		console.log('Examples:');
		console.log('');
		console.log('  $ mm update 2.0');
	}).alias('u');


program.parse(process.argv);
