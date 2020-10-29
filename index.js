#!/usr/bin/env node

const program = require('commander');
const colors = require('colors');
const download = require('download-git-repo');
const inquirer = require('inquirer');
const ora = require('ora');

console.log('Hello, Welcome to use mm-cli!'.yellow);

program
	.version(require('./package').version, '-v, --version')
	.description('MM package manager')
	.option('-p, --path <dir>', 'setting project dir')

program
	.command('init <name>')
	.action((name, options) => {
		console.log(name);
	}).on('--help', function() {
		console.log('');
		console.log('Examples:');
		console.log('');
		console.log('  $ mm init <name>');
	});

program
	.command('install <version>')
	.action((version, options) => {
		console.log(version);
		inquirer.prompt([{
			type: 'input',
			name: 'author',
			message: '请输入你的名字'
		}]).then((answers) => {
			console.log(answers.author)
			download('',
				name, {
					clone: true
				}, (err) => {
					console.log(err ? 'Error' : 'Success')
				});
		});
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
