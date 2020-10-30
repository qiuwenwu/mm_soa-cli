#!/usr/bin/env node

const program = require('commander');
const colors = require('colors');
const download = require('download-git-repo');
const inquirer = require('inquirer');
const ora = require('ora');
require('mm_expand');

var copyFile = require('./copyFile');

var dir_from = './template/'.fullname(__dirname);
var dir_to = process.cwd() + "/";

console.log('Hello, Welcome to use mm-cli!'.yellow);

program
	.version(require('./package').version, '-v, --version')
	.description('MM package manager')
	.option('-p, --path <dir>', 'setting project dir')



function prompt_2(options, answers) {
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
		try {
			// 复制目录
			copyFile('./file/'.fullname(__dirname), './');

			// 设置package.json
			var text = (dir_from + 'package.json').loadText();
			text = text.replaceAll('{name}', answers.name.trim()).replaceAll('{author}', answers.author.trim()).replaceAll(
				'{version}', answers.version.trim()).replaceAll('{description}', answers.web_description.trim());
			(dir_to + 'package.json').saveText(text);

			var option = Object.assign({}, options, answers, aws);
			// 设置配置.json
			save_config('development', option);
			save_config('local', option);
			save_config('production', option);
			save_config('test', option);
			
			
			spinner.succeed();
			console.log('Create completed!'.green);
			console.log('npm i \r\n');
			console.log('');
			console.log('');

		} catch (err) {
			spinner.fail();
			console.log('Create error!'.red);
			console.log(err);
		}
	});
}

/**
 * @param {Object} options
 * @param {Object} answers
 */
function prompt_1(options, answers) {
	var db = answers.db;
	inquirer.prompt([{
			name: `host`,
			message: `${db} host`,
			type: "input",
			default: "127.0.0.1"
		},
		{
			name: `port`,
			message: `${db} port`,
			type: 'input',
			default: 3306
		},
		{
			name: `database`,
			message: `${db} database`,
			type: "input",
			default: "mm"
		},
		{
			name: `user`,
			message: `${db} user`,
			type: "input",
			default: "root"
		},
		{
			name: `password`,
			message: `${db} password`,
			type: 'input'
		}
	]).then((aws) => {
		prompt_2(options, Object.assign({}, answers, aws));
	});
}


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
					"memory",
					"mongodb"
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
				default: 0
			}
		]).then((answers) => {
			var aws = Object.assign({
				name: name
			}, answers);
			prompt_1(answers, aws);
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


function save_config(file, option) {
	var text = (dir_from + `config/${file}.json`).loadText();
	text = text.replaceAll('{name}', option.name.trim()).replaceAll('{author}', option.author.trim()).replaceAll(
		'{version}',
		option.version.trim()).replaceAll('{description}', option.web_description.trim());

	text = text.replaceAll('{user}', option.user).replaceAll('{password}', option.password).replaceAll('{host}', option.host)
		.replaceAll('{database}', option.database);

	text = text.replaceAll('{db}', option.db).replaceAll('{cache}', option.cache).replaceAll('{name}', option.name).replaceAll(
		'{web_language}', option.web_language);
	text = text.replace('3306,', option.port + ',');
	text = text.replace('"task": true', '"task": ' + option.timed_task);
	(dir_to + `config/${file}.json`).saveText(text);
}

program.parse(process.argv);
