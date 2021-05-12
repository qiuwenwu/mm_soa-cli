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
							<swiper_vertical_page :func="func_page">
								<div>
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
							</swiper_vertical_page>
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
		methods:{
			func_page(index){
				console.log('触发了', index);
			}
		}
	}
</script>

<style>
</style>
