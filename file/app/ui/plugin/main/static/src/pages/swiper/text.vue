<template>
	<mm_page id="page_card">
		<header>
			<mm_warp>
				<mm_container>
					<mm_row>
						<mm_col width="100">
							<mm_view url="/">
								<h3>
									<span>文本</span>
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
							<h5>文字轮播默认块</h5>
							<swiper_text>
								<div slot class="text_block">
									<h4>公告：</h4>
									<span>公司政策调整，请各位商家做好准备</span>
								</div>
								<div slot="card1" class="text_block">
									<h4>留言：</h4>
									<span>老板快点啊</span>
								</div>
								<div slot ="card2" class="text_block">
									<h4>新发：</h4>
									<span>催单了，请及时处理！</span>
								</div>
							</swiper_text>
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
						title: "公告：",
						content: '公司政策调整，请各位商家做好准备',
						url: "/",
						image: "/img/default.png",
					},
					{
						title: "留言：",
						content: '老板快点啊！',
						url: "/",
						image: "/img/default.png",
					},
					{
						title: "新发：",
						content: '催单了，请及时处理！',
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
