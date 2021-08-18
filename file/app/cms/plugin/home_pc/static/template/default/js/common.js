var mixin_page = {
	data: function data() {
		var opens = $.db.get('opens') || [0];
		return {
			message: "hello world！",
			nav_top_show: false,
			// 标题
			title: "",
			// 地址
			url: "",
			// 添加地址
			url_add: "",
			// 删除地址
			url_del: "",
			// 修改地址
			url_set: "",
			// 查询对象地址
			url_get_obj: "",
			// 查询列表地址
			url_get_list: "",
			// 表单提交地址
			url_submit: "",
			// 上传提交地址
			url_upload: "",
			// 导入数据地址
			url_import: "",
			// 导出数据地址
			url_export: "",
			// 获取的列表
			list: [],
			// 视图&验证模型
			vm: {},
			// 提交表单
			form: {},
			// 线上对象
			obj: {},
			// 查询参数
			query: {
				// 当前页面
				// page: 1,
				// 页面大小
				// size: 10
			},
			// 配置
			config: {
				// 默认当前页面
				page: 1,
				// 默认页面大小
				size: 10
			},
			// 加载进度
			loading: 0,
			// 显示进度
			showing: 0,
			// 提交进度
			posting: 0,
			// 选中项
			select: $.db.get('select'),
			// 查询结果匹配数统计
			count: 0,
			// 显示隐藏，true显示，false隐藏
			show: false,
			// 响应成功或失败
			bl: false,
			// 显示方式
			display: "",
			// 关键字段
			field: "",
			// 响应提示
			tip: "",
			// 默认请求方式
			mode: "list",
			// 清除列表
			clear_list: true,
			// 响应错误消息
			message: "",
			// 选中集
			selects: "",
			// 当前页, 用于跳转页面
			page_now: 1,
			// 选择项状态
			select_state: false,
			// 排序键，用于拖拽修改排序
			sort_key: "display",
			// 修改条件
			query_set: {},
			// 展开的上级id
			opens: opens,
			// 上级ID: father_id
			father_id: "father_id"
		};
	},
	methods: {
		/**
		 * @description 事件管理, 用于管理函数
		 * @param {String} name 事件名
		 * @param {Object} param1 参数1
		 * @param {Object} param2 参数2
		 * @param {Object} param3 参数3
		 * @return {Object} 返回事件特定值
		 */
		events: function events(name, param1, param2, param3) {
			// console.log(name);
			if (this[name]) {
				if (param3) {
					return this[name](param1, param2, param3);
				} else {
					return this[name](param1, param2);
				}
			} else {
				return null;
			}
		},
		/**
		 * 回调函数(中控)
		 * @param {String} name 函数名
		 * @param {Object} param1
		 * @param {Object} param2
		 * @param {Object} param3
		 * @return {Object} 任意值
		 */
		func: function func(name, param1, param2, param3) {
			var f = this[name];
			if (f) {
				if (param1 === undefined) {
					return f();
				} else if (param2 === undefined) {
					return f(param1);
				} else if (param3 === undefined) {
					return f(param1, param2);
				} else {
					return f(param1, param2, param3);
				}
			} else {
				return null;
			}
		},
		/**
		 * @description 添加数据
		 * @param {Object} param 要添加的数据
		 * @param {Function} func 回调函数
		 */
		add: function add(param, func) {
			if (!param) {
				param = this.obj;
			}
			var pm = this.events("add_before", Object.assign({}, param)) || param;
			var msg = this.events("add_check", pm);
			var ret;
			if (!msg) {
				ret = this.events("add_main", pm, func);
			}
			return ret;
		},
		/**
		 * @description 删除数据
		 * @param {Object} param 查询条件
		 */
		del: function del(param, func) {
			if (!param) {
				param = this.query;
			}
			var pm = this.events("del_before", Object.assign({}, param)) || param;
			var msg = this.events("del_check", pm);
			var ret;
			if (!msg) {
				ret = this.events("del_main", pm, func);
			}
			return ret;
		},
		del_show: function(o, id) {
			var _this = this;
			$.confirm('删除后将无法回复!<br/>是否确定要删除?', function() {
				// console.log('确定删除!');
				var query = {};
				query[id] = o[id];
				_this.del(query, function() {
					_this.list.del(query);
					_this.count -= 1;
				});
			}, function() {
				// console.log('取消删除!')
			})
		},
		/**
		 * @description 修改数据
		 * @param {Object} param 修改项
		 * @param {String} query 查询条件
		 * @param {Boolean} includeZero 是否包括0
		 */
		set: function set(param, query, func, includeZero) {
			if (!param) {
				param = this.obj;
			}
			if (query) {
				this.query_set = query;
			} else if (!this.query_set) {
				this.query_set = Object.assign({}, this.query);
			}
			var pm = this.events("set_before", Object.assign({}, param), includeZero) || param;
			var msg = this.events("set_check", pm);
			var ret;
			if (!msg) {
				ret = this.events("set_main", pm, func);
			}
			return ret;
		},
		/**
		 * 修改前事件
		 * @param {Object} param
		 * @param {Boolean} includeZero 是否删除0值项
		 * @param {Object} 返回新的参数
		 */
		set_before: function set_before(param, includeZero) {
			var pm = $.delete(param, includeZero);
			for (var k in pm) {
				if (k.toLocaleLowerCase().indexOf('time') !== -1 && pm[k].indexOf('T') !== -1) {
					pm[k] = new Date(pm[k]).toStr('yyyy-MM-dd 00:00:00');
				}
			}
			return pm;
		},
		/**
		 * 批量修改
		 */
		batchSet: function batchSet() {
			var _this = this;
			$.confirm('批量修改数据无法挽回<br/>确定要操作吗?', function() {
				var q = Object.assign({}, _this.query, _this.query_set);
				q[_this.field] = _this.selects;
				delete q.page;
				delete q.size;
				delete q.orderby;
				_this.set(_this.form, q, function(json) {
					if (json.result) {
						_this.show = false;
						_this.get();
					}
				}, true);
			});
		},
		/**
		 * @description 查询多条数据
		 * @param {Object} query 查询条件
		 * @param {Function} func 回调函数
		 */
		get_list: function get_list(param, func) {
			if (!param) {
				param = this.query;
			}
			var pm = this.events("get_list_before", Object.assign({}, param)) || param;
			var msg = this.events("get_list_check", pm);
			var ret;
			if (!msg) {
				ret = this.events("get_list_main", pm, func);
			}
			return ret;
		},
		/**
		 * @description 查询一条数据
		 * @param {Object} query 查询条件
		 * @func {Function} 回调函数
		 */
		get_obj: function get_obj(param, func) {
			if (!param) {
				param = this.query;
			}
			var pm = this.events("get_obj_before", Object.assign({}, param)) || param;
			var msg = this.events("get_obj_check", pm);
			var ret;
			if (!msg) {
				ret = this.events("get_obj_main", pm, func);
			} else if (func) {
				func();
			}
			return ret;
		},
		sort: function sort(param, func) {
			var pm = this.events("sort_before", Object.assign({}, param)) || param;
			var msg = this.events("sort_check", pm);
			var ret;
			if (!msg) {
				ret = this.events("sort_main", pm, func);
			}
			return ret;
		},
		init: function init(param, func) {
			var pm = this.events("init_before", Object.assign({}, param)) || param;
			var msg = this.events("init_check", pm);
			var ret;
			if (!msg) {
				ret = this.events("init_main", pm, func);
			} else if (func) {
				func();
			}
			return ret;
		},
		submit: function submit(param, func) {
			if (!param) {
				param = this.form;
			}
			var pm = this.events("submit_before", Object.assign({}, param)) || param;
			var msg = this.events("submit_check", pm);
			var ret;
			if (msg) {
				this.$toast(msg);
			} else {
				ret = this.events("submit_main", pm, func);
			}
			return ret;
		},
		/**
		 * 提交前事件
		 * @param {Object} param 提交参数
		 */
		submit_before: function(param) {
			return param;
		},
		upload: function upload(param, func) {
			var pm = this.events("upload_before", Object.assign({}, param)) || param;
			var msg = this.events("upload_check", pm);
			var ret;
			if (msg) {
				this.$toast(msg);
			} else {
				ret = this.events("upload_main", pm, func);
			}
			return ret;
		},
		/**
		 * @description 提示框
		 * @param {String} text 提示内容
		 * @param {Number} longTime 显示时长
		 */
		toast: function toast(text, longTime) {
			this.$toast(text, longTime ? longTime : 2000);
		},
		/**
		 * @description 添加数据
		 * @param {Object} value 要添加的数据
		 */
		add_main: function add_main(value, func) {
			var url = this.url ? this.url + "method=add" : this.url_add;
			if (!url) {
				return;
			}
			var _this = this;
			this.$post(url, value, function(json) {
				_this.events("add_after", json, func);
				if (json.result) {
					_this.$toast(json.result.tip);
				} else if (json.error) {
					_this.$toast(json.error.message);
				} else {
					_this.$toast('添加失败! 原因:是服务器连接失败!');
				}
			});
		},
		/**
		 * @description 删除数据
		 * @param {Object} query 查询条件
		 * @param {Function} func 删除回调函数函数
		 */
		del_main: function del_main(query, func) {
			var url = this.url ? this.url + "method=del" : this.url_del;
			if (!url) {
				return;
			}
			var _this = this;
			this.$get(url, query, function(json) {
				_this.events("del_after", json, func);
				if (json.result) {
					_this.$toast(json.result.tip);
				} else if (json.error) {
					_this.$toast(json.error.message);
				} else {
					_this.$toast('删除失败! 原因:是服务器连接失败!');
				}
			});
		},
		/**
		 * 删除之后事件
		 * @param {Object} json 返回的结果
		 * @param {Object} func 回调函数
		 */
		del_after: function del_after(json, func) {
			if (func) {
				func();
			}
		},
		/**
		 * @description 修改数据
		 * @param {Object} value 要修改的数据
		 * @param {Object} value 修改项
		 */
		set_main: function set_main(value, func) {
			var url = this.url ? this.url + "method=set" : this.url_set;
			if (!url) {
				return;
			}
			var _this = this;
			this.$post(this.toUrl(this.query_set, url), value, function(json, status) {
				_this.events("set_after", json, func);
				if (json.result) {
					_this.$toast(json.result.tip);
				} else if (json.error) {
					_this.$toast(json.error.message);
				} else {
					_this.$toast('修改失败! 原因:是服务器连接失败!');
				}
			});
		},
		/**
		 * 修改成功时执行
		 * @param {Object} json 结果
		 * @param {Object} func 回调函数
		 */
		set_after: function set_after(json, func) {
			if (func) {
				func(json);
			}
		},
		/**
		 * @description 查询数据
		 * @param {Object} query 查询参数
		 * @param {Function} func 回调函数
		 */
		get: function get(query, func) {
			this.get_main(query, func);
		},
		/**
		 * @description 查询数据(主程序)
		 * @param {Object} query 查询参数
		 * @param {Function} func 回调函数
		 */
		get_main: function get_main(query, func) {
			var url = this.url_get_obj ? this.url_get_obj : this.url;
			if (url) {
				var _this = this;
				this.get_obj(query, function() {
					_this.get_create(query, func);
				});
			} else {
				this.get_create(query, func);
			}
		},
		/**
		 * 验证请求
		 * @param {Object} param 请求参数
		 */
		get_obj_check: function get_obj_check(param) {
			var bl = false;
			for (var k in param) {
				if (param[k]) {
					bl = true;
					break;
				};
			}
			if (bl) {
				return null;
			} else {
				return "缺少查询条件";
			}
		},
		/**
		 * @description 查询一条数据(主程序)
		 * @param {Object} query 查询条件
		 * @param {Function} func 回调函数
		 */
		get_obj_main: function get_obj_main(query, func) {
			// console.log("get_obj_main");
			var url = this.url_get_obj ? this.url_get_obj : this.url + "method=get_obj";
			if (!url) {
				return;
			}
			var _this = this;
			this.$get(this.toUrl(query, url), null, function(json, status) {
				_this.events("get_obj_after", json, func);
				var res = json.result;
				if (res) {
					var obj;
					if (res.obj) {
						obj = res.obj;
						delete res.obj;
					} else {
						var list = res.list;
						if (list && list.length > 0) {
							obj = list[0];
						} else {
							obj = res;
						}
					}
					$.push(_this, res, true);
					if (obj) {
						if (Object.keys(_this.obj).length === 0) {
							_this.obj = obj;
						} else {
							$.push(_this.obj, obj);
						}
						var o = _this.obj;
						for (var k in o) {
							if (k.indexOf('time') !== -1) {
								var val = o[k];
								if (val && val.indexOf('T') !== -1) {
									var v = new Date(o[k]);
									o[k] = v.toStr('yyyy-MM-dd hh:mm:ss');
								}
							}
						}
						$.push(_this.form, _this.obj);
					}
				} else if (json.error) {
					console.log(json.error.message);
				} else {
					_this.$toast("服务器连接失败！");
				}
			});
		},
		/**
		 * @description 获取到对象后事件
		 * @param {Object} json 响应结果
		 */
		get_obj_after: function get_obj_after(json, func) {
			if (func) {
				func(json);
			}
		},
		/**
		 * @description 查询多条数据(主程序)
		 * @param {Object} query 查询条件
		 * @param {Function} func 回调函数
		 */
		get_list_main: function get_list_main(query, func) {
			var url = this.url_get_list ? this.url_get_list : this.url;
			if (!url) {
				return;
			}
			var _this = this;
			this.loading = 0;
			this.$get(this.toUrl(query, url), null, function(json, status) {
				_this.loading = 100;
				if (_this.clear_list) {
					_this.list.clear();
				}
				_this.events("get_list_after", json, func, url);
				var res = json.result;
				if (res) {
					_this.page_now = _this.query.page;
					_this.list.addList(res.list);
					if (res.count !== undefined) {
						_this.count = res.count;
					}
				} else if (json.error) {
					console.log(json.error.message);
				} else {
					_this.$toast("服务器连接失败！");
				}
			});
		},
		/**
		 * @description 获取到列表事件
		 * @param {Object} res 响应结果
		 */
		get_list_after: function get_list_after(res, func, url) {
			if (func) {
				func(res, url);
			}
		},
		/**
		 * 搜索
		 * @param {Object} query 查询条件
		 * @param {Boolean} bl 是否重置再搜索
		 */
		search: function search(query, func) {
			if (query) {
				$.push(this.query, query);
			}
			var url = this.url_get_list ? this.url_get_list : this.url;
			if (url) {
				this.query.page = 1;
				this.count = 0;
				window.history.pushState({}, '', window.location.pathname + "?" + this.toUrl(this.query));
				this.first(query, func);
			}
		},
		get_create: function get_create(query, func) {
			if (query) {
				$.push(this.query, query);
			}
			var url = this.url_get_list ? this.url_get_list : this.url;
			if (url) {
				this.count = 0;
				$.route.push("?" + this.toUrl(this.query));
				this.first(query, func);
			}
		},
		/**
		 * @description 查询多条数据 (首次)
		 * @param {Object} query 查询条件
		 * @param {Function} func 回调函数
		 */
		first: function first(query, func) {
			var _this = this;
			if (!this.count) {
				var qy = Object.assign({}, this.query, {
					count_ret: "true"
				});
				this.get_list(qy, func);
			} else {
				this.get_list(query, func);
			}
		},
		/**
		 * @description 查询下一页数据
		 * @param {Function} func 回调函数
		 */
		next: function next(query, func) {
			console.log("next");
			var _this = this;
			_this.get_list(query, function(json, url) {
				if (json.result) {
					var list = json.result.list;
					if (list.length > 0) {
						var qy = Object.assign({}, query, {
							page: query.page + 1
						});
						if (qy.page <= _this.page_count) {
							delete qy.count_ret;
							_this.$get(_this.toUrl(qy, url));
						}
					}
				}
				if (func) {
					func(json);
				}
			});
		},
		/**
		 * @description 查询上一页数据
		 * @param {Function} func 回调函数
		 */
		prev: function prev(query, func) {
			console.log("prev");
			var _this = this;
			this.get_list(query, function(json, url) {
				if (json.result) {
					var list = json.result.list;
					if (list.length > 0) {
						var qy = Object.assign({}, query, {
							page: query.page - 1
						});
						if (qy.page >= 1) {
							delete qy.count_ret;
							_this.$get(_this.toUrl(qy, url));
						}
					}
				}
				if (func) {
					func(res);
				}
			});
		},
		/**
		 * 重置
		 */
		reset: function reset() {
			$.clear(this.query);
			$.push(this.query, this.config);
		},

		/**
		 * 提交表单
		 */
		submit_main: function submit_main(param, func) {
			var url = this.url;
			if (url) {
				if (this.field) {
					var id = param[this.field];
					if (id) {
						var q = {
							method: 'set'
						};
						q[this.field] = id;
						url = this.toUrl(q, url);
					} else {
						url += "method=add"
					}
				} else {
					url += "method=submit"
				}
			} else if (this.url_submit) {
				url = this.url_submit;
			} else if (this.field) {
				var id = param[this.field];
				if (id) {
					url = this.url_set;
				} else {
					url = this.url_add;
				}
			}

			// console.log('提交', url);
			if (url) {
				var _this = this;
				this.$post(url, param, function(json, status) {
					if (json.result) {
						_this.$toast(json.result.tip);
					} else if (json.error) {
						_this.$toast(json.error.message);
					} else {
						_this.$toast("服务器连接失败！");
					}
					_this.events("submit_after", json, func);
				});
			}
		},
		/**
		 * 提交前验证事件
		 * @param {Object} 请求参数
		 * @return {String} 验证成功返回null, 失败返回错误提示
		 */
		submit_check: function submit_check(param) {
			return null;
		},
		/**
		 * @description 获取到对象后事件
		 * @param {Object} json 响应结果
		 * @param {Function} func 回调函数
		 */
		submit_after: function submit_after(json, func) {
			if (func) {
				func(json);
			}
			_this.$back();
		},
		/**
		 * 上下翻页
		 * @param {Number} n 加减页码
		 */
		go: function go(n) {
			var page = this.query.page + n;
			this.goTo(page);
		},
		/**
		 * 跳转指定页
		 * @param {Number} page 页码
		 */
		goTo: function goTo(page) {
			if (page < 1) {
				page = 1;
			} else if (page > this.page_count) {
				page = this.page_count;
			}
			var query = this.query;
			var p = query.page;
			query.page = page;
			this.$router.push("?" + this.toUrl(query));
			if (this.page_count !== 0) {
				if (p + 1 == page) {
					this.next(query);
				} else if (p - 1 == page) {
					this.prev(query);
				} else {
					this.first(query);
				}
			} else {
				this.first(query);
			}
		},
		/**
		 * @description 转查询参数
		 * @param {Object} obj 被转换的对象
		 * @param {String} url 请求地址
		 * @return {String} url字符串
		 */
		toUrl: function toUrl(obj, url) {
			return $.toUrl(obj, url);
		},
		/**
		 * 初始化前函数
		 */
		init_before: function init_before(query) {
			if (!query) {
				query = this.config;
			}
			return query;
		},
		/**
		 * 初始化
		 */
		init_main: function init_main(query) {
			var _this = this;
			$.push(this.query, query);
			_this.init_after(function() {
				_this.get(_this.query);
			});
		},
		/**
		 * 初始化后函数
		 */
		init_after: function init_after(func) {
			if (func) {
				func();
			}
		},
		/**
		 * @description 上传文件
		 * @param {Function} func 回调函数
		 */
		upload_main: function upload_main(func) {
			var url = "";
			if (this.url) {
				url = this.url + "method=upload";
			} else {
				url = this.url_upload;
			}

			if (!param) {
				param = this.form;
			}
			if (msg) {
				this.$toast(msg);
			} else {
				this.uploading = 0;
				var _this = this;
				this.$upload(url, param, function(json, status) {
					_this.uploading = 100;
					_this.events("upload_after", json, func);
				});
			}
		},
		/**
		 * @description 上传完成时
		 * @param {Object} json 响应结果
		 * @param {Function} func
		 */
		upload_after: function upload_after(json, func) {
			if (json.result) {
				this.$toast(json.result.tip);
			} else if (json.error) {
				this.$toast(json.error.message);
			} else {
				this.$toast("服务器连接失败！");
			}
			if (func) {
				func();
			}
		},
		/**
		 * 结束前
		 * @param {Object} param 参数
		 */
		end_before: function end_before(param) {
			// this.reset();
		},
		/**
		 * 选择项全改
		 */
		select_all: function select_all() {
			var bl = !this.select_state;
			if (!bl) {
				this.selects = '';
			} else {
				var s = '';
				var list = this.list;
				for (var i = 0; i < list.length; i++) {
					s += '|' + list[i][this.field];
				}
				this.selects = s.replace('|', '');
			}
			this.select_state = bl;
		},
		/**
		 * 选择项改变
		 * @param {String|Number} id 选择的ID
		 */
		select_change: function select_change(id) {
			var has = false
			var arr = this.selects.split('|');
			for (var i = 0; i < arr.length; i++) {
				var o = arr[i];
				if (id == o) {
					arr.splice(i, 1);
					has = true;
					break;
				}
			}
			if (!has) {
				arr.push(id)
			}
			var s = arr.join('|');
			if (s.indexOf('|') == 0) {
				this.selects = s.substring(1)
			} else {
				this.selects = s;
			}
		},
		/**
		 * 选择项含有
		 * @param {String|Number} id 选择的ID
		 */
		select_has: function select_has(id) {
			var ids = '|' + this.selects + '|';
			return ids.indexOf('|' + id + '|') !== -1;
		},
		/**
		 * 选中
		 * @param {Number} index 项目索引
		 */
		selected: function selected(index) {
			this.select = index;
			$.db.set('select', index, 120);
		},
		/**
		 * 页面改变时
		 * @param {Object} e 事件
		 */
		page_change: function page_change(e) {
			var n = Number(e.target.value);
			if (isNaN(n)) {
				n = 1;
			}
			if (n < 1) {
				n = 1;
			} else if (n > this.page_count) {
				n = this.page_count
			}
			this.page_now = n;
		},
		/**
		 * 获取名称
		 * @param {Array} list 用来取名的列表
		 * @param {String} arr_str id集合
		 * @param {String} key 键
		 * @param {String} name 名
		 * @param {String} span 分隔符
		 */
		$get_name(list, arr_str, key, name, span) {
			if (!name) {
				name = "name";
			}
			var value = "";
			if (arr_str) {
				if (typeof(arr_str) == 'string') {
					if (!span) {
						span = ',';
					}
					var arr = arr_str.split(span);
					var id = Number(arr[0]);

					for (var i = 0; i < list.length; i++) {
						var o = list[i];
						if (o[key] == id) {
							value += '|' + o[name];
						}
					}
				} else {
					var id = arr_str;
					for (var i = 0; i < list.length; i++) {
						var o = list[i];
						if (o[key] == id) {
							value = o[name];
							break
						}
					}
				}
			}
			return value.replace('|', '');
		},
		/**
		 * 取消并返回
		 */
		cancel: function cancel() {
			this.$back();
		},
		/**
		 * 排序改变事件
		 * @param {Object} e 事件对象
		 */
		sort_change: function sort_change(e) {
			console.log(e);
		},
		/**
		 * 导入数据
		 * @param {Object} file 文件
		 */
		import_db: function import_db(file) {
			if (file) {
				var _this = this;
				$.confirm("是否导入 " + file.name, "导入数据", function() {
					$.http.upload(_this.url_import, file, function(json) {
						if (json.result) {
							$.confirm(json.result.tip, function() {
								_this.get();
							});
						} else if (json.error) {
							$.confirm(json.error.message);
						} else {
							$.confirm("服务器连接失败！");
						}
					});
				});
			}
		},
		/**
		 * 导出数据
		 */
		export_db: function export_db() {
			var _this = this;
			if (this.selects) {
				var query = {};
				query[this.field] = this.selects;
				this.$get(_this.url_export, query, function(json) {
					var res = json.result;
					if (res && res.bl) {
						window.location.href = res.url;
					}
				});
			} else {
				this.$get(_this.url_export, this.query, function(json) {
					var res = json.result;
					if (res && res.bl) {
						window.location.href = res.url;
					}
				});
			}
		},
		/**
		 * 判断是否有下级
		 * @param {Number} id 字段ID
		 * @param {Object} list 数据列表
		 * @return {Number} 返回级别
		 */
		opens_has_sub: function(id, list) {
			if (!list) {
				list = this.list;
			}
			var bl = false;
			var father_id = this.father_id;
			for (var i = 0; i < list.length; i++) {
				var o = list[i];
				if (o[father_id] === id) {
					bl = true;
					break;
				}
			}
			return bl;
		},
		/**
		 * 改变展开项
		 * @param {Number} id 唯一主键
		 */
		opens_change: function opens_change(id) {
			var index = this.opens.indexOf(id);
			if (index !== -1) {
				this.opens.splice(index, 1);
			} else {
				var bl = this.opens_has_sub(id);
				if (bl) {
					this.opens.push(id);
				}
			}
			$.db.set('opens', this.opens);
		},
		/**
		 * 判断是否存在
		 * @param {Number} id 唯一主键
		 * @return {Boolean} 存在返回true, 否则返回false
		 */
		opens_has: function opens_has(id) {
			return this.opens.indexOf(id) !== -1;
		},
		/**
		 * 判断子孙级别, 最大支持5次分叉
		 * @param {Number} fid 祖辈ID
		 * @param {Object} list 数据列表
		 * @return {Number} 返回级别
		 */
		opens_lv: function opens_lv(fid, list) {
			if (!list) {
				list = this.list;
			}
			var lv = 0;
			var father_id = this.father_id;
			var id = this.field;
			var num = fid;
			for (var n = 0; n < 5; n++) {
				if (num === 0) {
					break;
				}
				for (var i = 0; i < list.length; i++) {
					var o = list[i];
					if (o[id] === num) {
						lv++;
						num = o[father_id];
						if (num === 0) {
							break;
						}
					}
				}
			}
			return lv;
		},
		set_lang(lang) {
			$.http.get("/api/sys_lang?type=" + lang, function(res) {
				window.location.href = window.location.href;
			})
		},
		set_color(color) {
			$.http.get("/api/sys_theme?color=" + color, function(res) {
				window.location.href = window.location.href;
			})
		},
		load_action() {
			$('.mm_page').on('scroll', function(e) {
				if ($(this).scrollTop() >= document.body.clientHeight) {
					$('#scroll_top').removeClass('hide');
				} else {
					$('#scroll_top').addClass('hide');
				}
			});
			$('#scroll_top').click(function() {
				$('.mm_page').animate({
					scrollTop: 0
				}, 800);
			});
		}
	},
	computed: {
		/**
		 * 分页数量
		 */
		page_count: function page_count() {
			return Math.ceil(this.count / this.query.size);
		}
	},
	created: function created() {
		this.showing = 0;
		var query = window.location.search.toQuery();
		this.init(query);
	},
	mounted: function mounted() {
		this.showing = 100;
		this.load_action();
	},
	beforeDestroy: function beforeDestroy() {
		this.events('end_before');
	}
};
