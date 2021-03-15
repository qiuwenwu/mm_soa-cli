
/**
 * 主函数, 用于处理未定义函数的消息
 * @param {Object} params 参数
 * @param {Object} ws Websocket服务
 * @param {Object} request 请求协议头
 * @return {Object} 返回执行结果
 */
exports.main = async function(body, ws, request) {
	$.log.info('收到客户端推送数据', body);
	test_msg["create_time"] = new Date().stamp();
	this.send();
};

/**
 * 同步消息, 用于定时给前端推送数据
 * @param {Object} ws websocket通讯器
 */
exports.sync = async function(ws) {
	ws.send([]);
};

/**
 * 初始化函数, 用于定义开放给前端的函数
 */
exports.init = async function() {
	var m = this.methods;
	/**
	 * @param {Object} params 参数
	 * @param {Object} ws Websocket服务
	 */
	m.test = function(params, ws) {
		return "你好"
	};
};