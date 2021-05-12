<template>
	<mm_page id="page_chat">
		<header>
			<mm_warp>
				<mm_container>
					<mm_row>
						<mm_col width="100">
							<mm_view url="/">
								<h3>
									<span>工具栏</span>
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
							<bar_tool :func="func_tool"></bar_tool>
						</mm_col>
					</mm_row>
					<mm_row>
						<mm_col width="100">
							<bar_tool :func="func_tool"  class="display-2"></bar_tool>
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
			return {}
		},
		methods: {
			func_tool(o){
				console.log(o);
			}
		}
	}
</script>

<style>
	main{
	  min-height: 100vh;
	 }
	 main .mm_view{
	  overflow: visible;
	 }
</style>
