<template>
	<mm_page id="page_card">
		<main>
			<mm_warp>
				<mm_container>
					<mm_row>
						<mm_col width="100">
							<mm_view url="/">
								<div class="h3">块<span>&lt; 返回</span></div>
							</mm_view>

							<mm_card class="silde_test">
								<h5>默认块</h5>
								<mm_slide_crad :list="list"></mm_slide_crad>
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
			list: [{

			}]
		}
	}
</script>

<style>
</style>
