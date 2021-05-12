<template>
	<mm_page id="page_quick">
		<header>
			<mm_warp>
				<mm_container>
					<mm_row>
						<mm_col width="100">
							<mm_view url="/">
								<h3>
									<span>快捷导航</span>
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
								<nav_quick class="display_left"></nav_quick>
							</div>
						</mm_col>
					</mm_row>

					<mm_row>
						<mm_col width="100">
							<nav_quick></nav_quick>
						</mm_col>
					</mm_row>

					<mm_row>
						<mm_col width="100" style="text-align: right;">
							<div style="display: inline-block;">
								<nav_quick class="display_right"></nav_quick>
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
				list: undefined
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
