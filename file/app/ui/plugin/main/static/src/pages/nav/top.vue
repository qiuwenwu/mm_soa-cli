<template>
	<mm_page id="page_quick">
		<header>
			<mm_warp>
				<mm_container>
					<mm_row>
						<mm_col width="100">
							<mm_view url="/">
								<h3>
									<span>顶部导航</span>
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
							<div style="display: inline-block;">
								<nav_top :list="list" :left="true"></nav_top>
							</div>
						</mm_col>
					</mm_row>

					<mm_row>
						<mm_col width="100">
							<nav_top></nav_top>
						</mm_col>
					</mm_row>

					<mm_row>
						<mm_col width="100" style="text-align: right;">
							<div style="display: inline-block;">
								<nav_top :right="true"></nav_top>
							</div>
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
				list: [{
							title: "娱乐",
							sub: [{
								title: "杂鱼",
								url: "#"
							}, {
								title: "脱口秀",
								url: "#"
							}, {
								title: "音乐",
								url: "#"
							}, {
								title: "户外",
								url: "#"
							}, {
								title: "音乐",
								url: "#"
							}, {
								title: "户外",
								url: "#"
							}]
						},{
							title:"游戏",
							sub: [{
								title: "舞蹈",
								url: "#"
							}, {
								title: "脱口秀",
								url: "#"
							}]
						}]
			}
		},
		methods: {}
	}
</script>

<style scoped>
	main {
		overflow: initial;
	}
</style>
