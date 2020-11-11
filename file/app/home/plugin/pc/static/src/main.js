define(['Vue', 'mm_sdk', 'ui', 'clipboard', 'mm_vue', 'store', 'router', 'vue!./App.vue'], function(Vue, mm_sdk, ui,
	clipboard, mm_vue, store, router,
	app) {
	// 开启调试模式
	Vue.config.debug = true;
	// 使用UI组件
	Vue.config.devtools = true;

	Vue.use(mm_vue);
	Vue.use(ui);

	/**
	 * @description 初始化整个Vue应用程序
	 * 由于组件预先注册的标记名而自动放置的组件头将在应用程序模板中找到
	 */
	var vue = new Vue({
		el: '#app',
		// 引用缓存管理器
		store: store,
		// 引用路由管理器
		router: router,
		// 渲染页面
		render: function render(h) {
			return h(app);
		}
	});
});
