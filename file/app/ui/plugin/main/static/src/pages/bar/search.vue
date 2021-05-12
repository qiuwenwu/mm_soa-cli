<template>
	<mm_page id="page_search">
		<header>
			<mm_warp>
				<mm_container>
					<mm_row>
						<mm_col width="100">
							<mm_view url="/">
								<h3>
									<span>搜索栏</span>
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
							<bar_search :func="func_search" v-model="val_input"></bar_search>
							输入内容：{{val_input}}
						</mm_col>
					</mm_row>
				</mm_container>
			</mm_warp>
		</main>
	</mm_page>
</template>

<script>
	export default {
		data() {
			return {
				val_input:"默认值",
				}
		},
		methods: {
			func_search(o) {
				console.log('page');
				console.log(o);
			}
		}
	}
</script>

<style>
</style>
