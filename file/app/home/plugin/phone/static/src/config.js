"use strict";

require({
	// 基础路径, 会将 ./ 替换成该路径
	baseUrl: '/home/phone/src/',
	// 是否保留注释
	preserveLicenseComments: true,
	waitSeconds: 0,
	exclude: ['babel'],
	optimize: 'none',
	pragmasOnSave: {
		'excludeBabel': true
	},
	paths: {
		babel: '/js/babel-5.8.34.min',
		polyfill: '/js/polyfill.min',
		css: '/js/css.min',
		text: '/js/text.min',
		vue: '/js/mm-requirejs-vue',

		// 生产版||调试版
		Vue: '/js/vue',
		vuex: '/js/vuex.min',
		VueRouter: '/js/vue-router.min',
		jquery: '/js/jquery.min',
		swiper: "/js/swiper.min",
		clipboard: '/js/clipboard.min',
		quill: '/js/quill.min',
		mm_sdk: '/js/mm_sdk',
		mm_vue: '/js/mm_vue',
		ui: '/js/mm_vue_ui',
		store: './store',
		router: './router',
		echarts: '/js/echarts',
		page: '/src/mixins/page.js',
		nav: '/api/sys_nav.js?scope=home_phone',
	},
	shim: {
		polyfill: {
			deps: ['babel']
		},
		jquery: {
			exports: "$"
		},
		clipboard: {
			deps: ['jquery']
		},
		swiper: {
			deps: ['jquery']
		},
		mm_sdk: {
			deps: ['jquery']
		},
		ui: {
			deps: ['jquery']
		},
		mm_vue: {
			deps: ['mm_sdk']
		},
		vuex: {
			deps: ['Vue']
		},
		VueRouter: {
			deps: ['Vue']
		}
	},
	config: {
		// vue加载配置
		'vue': {
			'css': 'inject',
			'templateVar': '__template__'
		}
	}
});

require(['polyfill', 'es6!./main']);