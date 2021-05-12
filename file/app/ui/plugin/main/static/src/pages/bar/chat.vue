<template>
	<mm_page id="page_chat">
		<header>
			<mm_warp>
				<mm_container>
					<mm_row>
						<mm_col width="100">
							<mm_view url="/">
								<h3>
									<span>聊天输入栏</span>
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
							<bar_chat :func="func_chat" v-model="val_input"></bar_chat>
							输入内容：{{val_input}}
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
				val_input:"默认值"
			}
		},
		methods: {
			func_chat(o){
				console.log("page");
				console.log(o);
			},
		}
	}
</script>

<style>
</style>
