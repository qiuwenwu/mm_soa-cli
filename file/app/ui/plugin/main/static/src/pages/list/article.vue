<template>
	<!-- 文章 -->
	<mm_page id="page_article">
		<header>
			<mm_warp>
				<mm_container>
					<mm_row>
						<mm_col width="100">
							<mm_view url="/">
								<h3>
									<span>文章</span>
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
							<mm_card>
								<div class="card_head">样式一</div>
								<div class="card_body">
									<mm_list col="2" class="list_article">
										<mm_article v-for="(o, k) in list" :key="k" :obj="o"></mm_article>
									</mm_list>
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
	export default {
		data() {
			return {
				list: [{
					title: "标题",
					description: "描述",
					keywords: "关键词",
					time: "2020-01-11 10:00:11"
				}]
			}
		}
	}
</script>

<style>
</style>
