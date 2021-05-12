<template>
	<mm_page id="page_card">
		<header>
			<mm_warp>
				<mm_container>
					<mm_row>
						<mm_col width="100">
							<mm_view url="/">
								<h3>
									<span>轮播图</span>
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
							<h5>轮播图默认块</h5>
							<swiper_image :list="list">
								<template scope="scope">
									<div class="swiper_image">
										<a :href="scope.row.url">
											<img :src="scope.row.image" alt="" class="image">
										</a>
									</div>
								</template>
							</swiper_image>
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
						url: "/",
						image: "/img/default.png",
					},
					{
						title: "标题",
						url: "/",
						image: "/img/default.png",
					},
					{
						title: "标题",
						url: "/",
						image: "/img/default.png",
					}
				]
			}
		}
	}
</script>

<style>
.swiper_image .image{
	width: 100%;
	height: 18.75rem;
}
</style>
