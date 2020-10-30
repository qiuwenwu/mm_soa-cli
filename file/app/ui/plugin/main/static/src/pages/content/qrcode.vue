<template>
	<mm_page id="page_qrcode">
		<header>
			<mm_grid>
				<mm_col width="100">
					<mm_view url="/">
						<h3>
							<span>二维码</span>
							<span class="fr">&lt; 返回</span></router-link>
						</h3>
					</mm_view>
				</mm_col>
			</mm_grid>
		</header>
		<main>
			<mm_grid>
				<mm_col width="50">
					<mm_view>
						<h5>扫码跳转（基础）</h5>
						<mm_qrcode :url="url"></mm_qrcode>
					</mm_view>
					<mm_view style="margin-top: 10rem;">
						<h5>二维码（内容）</h5>
						<mm_qrcode :value="value"></mm_qrcode>
					</mm_view>
				</mm_col>
				<mm_col width="50">
					<mm_view>
						<h5>扫码跳转（带图标和大小参数）</h5>
						<mm_qrcode :url="url" :icon="icon" :width="220"></mm_qrcode>
					</mm_view>

					<mm_view style="margin-top: 10rem;">
						<h5>扫码跳转（带图标和颜色参数）</h5>
						<mm_qrcode :url="url" :icon="icon" foreground="blue" :width="220"></mm_qrcode>
					</mm_view>
				</mm_col>
			</mm_grid>
		</main>
	</mm_page>
</template>

<script>
	import mm_qrcode from '/src/components/content/mm_qrcode.vue';

	export default {
		template: __template__,
		components: {
			mm_qrcode
		},
		data() {
			return {
				url: "http://www.baidu.com",
				icon: "http://localhost:5000/img/logo.png",
				value: "扫码查看的二维码内容，限255个字"
			}
		}
	}
</script>

<style>
</style>
