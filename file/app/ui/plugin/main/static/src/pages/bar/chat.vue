<template>
	<mm_page id="page_chat">
		<header>
			<mm_warp>
				<mm_container>
					<mm_row>
						<mm_col width="100">
							<mm_card url="/">
								<h3>
									<span>聊天输入栏</span>
									<span class="fr">&lt; 返回</span></router-link>
								</h3>
							</mm_card>
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
							<mm_card url="/">
								<div class="h3">文章<span>&lt; 返回</span></div>
							</mm_card>

							<mm_card :func="func"></mm_card>
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
			return {}
		},
		methods: {
			func(name, param1, param2) {

			}
		}
	}
</script>

<style>
</style>
