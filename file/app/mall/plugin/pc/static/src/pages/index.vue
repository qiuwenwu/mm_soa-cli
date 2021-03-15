<template>
	<mm_page id="index">
		<main>
			<mm_warp>
				<mm_container>
					<mm_row>
						<mm_col class="col-mm-12 col-sm-12 col-md-6 col-lg-6">
							<mm_card>
								<div class="card_head arrow">
									<h5>超级美眉</h5>
								</div>
								<div class="card_body">
									<router-link to="/goods">123123</router-link>
								</div>
							</mm_card>
						</mm_col>
					</mm_row>
				</mm_container>
			</mm_warp>
		</main>
	</mm_page>
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
			}
		}
	}
</script>

<style>
	/* {title} */
	#id {}

	/* 标题栏 */
	#id #title {}

	/* 搜索栏 */
	#id #search {}

	/* 排序栏 */
	#id #sort {}

	/* 列表 */
	#id #table {}

	/* 选择栏 */
	#id #options {}
</style>
