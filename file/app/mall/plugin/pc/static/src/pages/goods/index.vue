<template>
	<div class="">
		
	</div>
</template>

<script>
	import mixin from '/src/mixins/page.js';
	
	export default {
		mixins: [mixin],
		data() {
			return {
				// 列表请求地址
				url_get_list: "",
				// 查询条件
				query: {},
				// 视图模型
				vm: {}
			}
		},
		methods: {
			/**
			 * @description 滚动刷新
			 * @param {Number} n 滚动的方向，-1是向上， 1是向下
			 */
			scoll(n) {
				this.go(n);
			},
			
		}
	}
</script>

<style>
</style>
