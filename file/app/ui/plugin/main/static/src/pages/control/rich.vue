<template>
	<mm_page id="page_pre">
		<header>
			<mm_warp>
				<mm_container>
					<mm_row>
						<mm_col width="100">
							<mm_view url="/">
								<h3>
									<span>富文本编辑器</span>
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
								<div class="card_body">
									<control_rich id="test" v-model="content"></control_rich>
								</div>
							</mm_card>
						</mm_col>
						<mm_col width="100">
							<div class="card_head">
								<h5>查看结果</h5>
							</div>
							<div class="card_body">
								<mm_view v-html="content">
								</mm_view>
							</div>
						</mm_col>
					</mm_row>
				</mm_container>
			</mm_warp>
		</main>
	</mm_page>
</template>

<script>
	import control_rich from '/src/components/control/control_rich.vue';

	export default {
		template: __template__,
		components: {
			control_rich
		},
		data() {
			return {
				content: ""
			}
		}
	}
</script>

<style>
</style>
