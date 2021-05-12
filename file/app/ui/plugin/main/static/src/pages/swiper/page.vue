<template>
	<mm_page id="page_card">
		<header>
			<mm_warp>
				<mm_container>
					<mm_row>
						<mm_col width="100">
							<mm_view url="/">
								<h3>
									<span>页面</span>
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
							<swiper_page :list="list">
								<div >
									默认页
								</div>
								<div slot="page1">
									第一页
								</div>
								<div slot="page2">
									第二页
								</div>
								<div slot="page3">
									第三页
								</div>
							</swiper_page>
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
						title: "日历",
						url: "/",
						image: "/img/default.png",
					},
					{
						title: "照片",
						url: "/",
						image: "/img/default.png",
					},
					{
						title: "天气",
						url: "/",
						image: "/img/default.png",
					},
					{
						title: "时钟",
						url: "/",
						image: "/img/default.png",
					},
					{
						title: "编辑",
						url: "/",
						image: "/img/default.png",
					},
					{
						title: "换行",
						url: "/",
						image: "/img/default.png",
					},
					{
						title: "订单",
						url: "/",
						image: "/img/default.png",
					},
					{
						title: "方法",
						url: "/",
						image: "/img/default.png",
					},
					{
						title: "计算器",
						url: "/",
						image: "/img/default.png",
					},
					{
						title: "相机",
						url: "/",
						image: "/img/default.png",
					},
					{
						title: "钱包",
						url: "/",
						image: "/img/default.png",
					},
					{
						title: "文件",
						url: "/",
						image: "/img/default.png",
					},
				]
			}
		}
	}
</script>

<style>
</style>
