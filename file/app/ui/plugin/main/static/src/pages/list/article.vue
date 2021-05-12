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
						<mm_col width="33">
							<mm_view>
								<control_select v-model="col" :options="options"></control_select>
							</mm_view>
						</mm_col>
						<mm_col width="33">
							<mm_view>
								<mm_btn class="btn_primary" @click.native="set_layout()">切换排版方式</mm_btn>
							</mm_view>
						</mm_col>
						<mm_col width="33">
							<mm_view>
								<button class="btn_primary" @click="border = !border"><span v-if="border">无</span><span
										v-else>加</span>边框</button>
							</mm_view>
						</mm_col>
						<mm_col width="100">
							<mm_view class="card">
								<div class="card_head">样式一</div>
								<div class="card_body">
									<list_article :col="col" :list="list"
										:class="list_layout[select] + (border ? ' icon-x icon-radius' : '')">
									</list_article>
								</div>
							</mm_view>
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
				border: false,
				select: 1,
				col: 1,
				list_layout: [
					"item-ltb",
					"item-rtb",
					"item-tb"
				],
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
			set_layout() {
				if (this.select < this.list_layout.length - 1) {
					this.select++;
				} else {
					this.select = 0;
				}
			}
		}
	}
</script>

<style>
</style>
