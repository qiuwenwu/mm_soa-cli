<template>
	<mm_page id="page_card">
		<header>
			<mm_warp>
				<mm_container>
					<mm_row>
						<mm_col width="100">
							<mm_view url="/">
								<h3>
									<span>轮播卡片</span>
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
							<h5>默认块</h5>
							<swiper_rotate_card :list="list">
								<template scope="scope">
									<div class="info">
										<a :href="scope.row.url">
											<p>{{scope.row.title}}</p>
											<img :src="scope.row.image" alt="">
										</a>
									</div>
								</template>
							</swiper_rotate_card>
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
						title: "黄金",
						url: "/",
						image: "/img/default.png",
					},
					{
						title: "消费电子",
						url: "/",
						image: "/img/default.png",
					},
					{
						title: "业绩优异",
						url: "/",
						image: "/img/default.png",
					},
					{
						title: "固定限期",
						url: "/",
						image: "/img/default.png",
					},
					{
						title: "定投榜单",
						url: "/",
						image: "/img/default.png",
					}
				]
			}
		}
	}
</script>

<style>
</style>
