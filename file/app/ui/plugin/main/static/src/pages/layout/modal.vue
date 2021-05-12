<template>
	<mm_page id="page_modal">
		<header>
			<mm_warp>
				<mm_container>
					<mm_row>
						<mm_col width="100">
							<mm_view url="/">
								<h3>
									<span>模态窗</span>
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
							<mm_view>
								<h5>点击按钮测试</h5>
								<mm_btn class="btn_primary" @click.native="show1 = !show1, show2 = false">带遮罩 {{ show1 }}</mm_btn>
								<mm_btn class="btn_primary" @click.native="show2 = !show2, show1 = false">不带遮罩 {{ show2 }}</mm_btn>
							</mm_view>

							<mm_view>
								<h5>出入场方式 {{ value }}</h5>
								<control_radio v-model="value" :options="options"></control_radio>
							</mm_view>
						</mm_col>
					</mm_row>
				</mm_container>
			</mm_warp>
		</main>
		<mm_modal v-model="show1" mask="true" :display="value">
			<mm_card>
				<div class="card_head">块头</div>
				<div class="card_body">
					<p>&nbsp;</p>内容主体<p>&nbsp;</p>
				</div>
				<div class="card_foot">块脚</div>
			</mm_card>
		</mm_modal>
		<mm_modal v-model="show2" :display="value">
			<mm_card>
				<div class="card_head">块头 <a class="fr btn-link" href="javascript:void(0)" @click="show2 = false">×</a></div>
				<div class="card_body">
					<p>&nbsp;</p>内容主体<p>&nbsp;</p>
				</div>
				<div class="card_foot">块脚</div>
			</mm_card>
		</mm_modal>
	</mm_page>
</template>

<script>
	export default {
		data() {
			return {
				show1: false,
				show2: false,
				value: "default",
				options: [{
					name: "默认",
					value: "default"
				}, {
					name: "中间",
					value: "center"
				}, {
					name: "左边",
					value: "left"
				}, {
					name: "右边",
					value: "right"
				}, {
					name: "上边",
					value: "top"
				}, {
					name: "下边",
					value: "bottom"
				}]
			}
		}
	}
</script>

<style>
</style>
