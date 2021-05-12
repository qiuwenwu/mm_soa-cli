<template>
	<mm_page id="page_filter">
		<header>
			<mm_warp>
				<mm_container>
					<mm_row>
						<mm_col width="100">
							<mm_view url="/">
								<h3>
									<span>筛选栏</span>
									<span class="fr">&lt; 返回</span></router-link>
								</h3>
							</mm_view>
						</mm_col>
					</mm_row>
				</mm_container>
			</mm_warp>
		</header>
		<main>
			<mm_warp>
				<mm_container>
					<mm_row>
						<mm_col width="100">
							<mm_view>
								<bar_filter :func="func_filter" :col="1" :list="list">
								</bar_filter>
							</mm_view>
						</mm_col>
					</mm_row>
				</mm_container>
			</mm_warp>
		</main>
	</mm_page>
</template>

<script>
	import mixin from '/src/mixins/page.js'
	export default {
		mixins: [mixin],
		data() {
			return {
				select: 0,
				col: 2,
				options: [{
						name: "1列",
						value: "1"
					},
					{
						name: "2列",
						value: "2"
					},
					{
						name: "3列",
						value: "3"
					},
					{
						name: "4列",
						value: "4"
					},
					{
						name: "5列",
						value: "5"
					},
					{
						name: "6列",
						value: "6"
					},
					{
						name: "8列",
						value: "8"
					},
					{
						name: "10列",
						value: "10"
					},
					{
						name: "12列",
						value: "12"
					}
				],
				list: undefined
			}
		},
		methods: {
			func_filter(list) {
				console.log("page");
				console.log(list);
			}
		}
	}
</script>

<style>
</style>
