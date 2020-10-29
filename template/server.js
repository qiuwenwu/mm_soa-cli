require('mm_expand');
// 修改程序运行目录
$.runPath = __dirname  + $.slash;
const Soa = require('mm_soa');

var NODE_ENV = process.env.NODE_ENV || 'local';
var config = `./config/${NODE_ENV}.json`.loadJson();
var soa = new Soa(config);

async function startup(test){
	var app = await soa.init();
}

startup();