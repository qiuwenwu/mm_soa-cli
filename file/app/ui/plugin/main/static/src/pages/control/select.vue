<template>
	<mm_page id="page_select">
		<header>
			<mm_warp>
				<mm_container>
					<mm_row>
						<mm_col width="100">
							<mm_view url="/">
								<h3>
									<span>选择框</span>
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
					<mm_row class="pb">
						<mm_col class="col-12 col-md-33">
							<mm_card class="pc">
								<div class="card_head">
									<h5 @click="$copy(code_1)">样式一 (原生)</h5>
								</div>
								<div class="card_body">
									<control_select v-model="value" :options="options"></control_select>
								</div>
							</mm_card>
						</mm_col>
						<mm_col class="col-12 col-md-33">
							<mm_card class="pc">
								<div class="card_head">
									<h5 @click="$copy(code_2)">样式二 (鼠标经过 hover)</h5>
								</div>
								<div class="card_body">
									<control_select v-model="value" :options="options" type="hover"></control_select>
								</div>
							</mm_card>
						</mm_col>
						<mm_col class="col-12 col-md-33">
							<mm_card class="pc">
								<div class="card_head">
									<h5 @click="$copy(code_3)">样式三 (获取焦点 focus)</h5>
								</div>
								<div class="card_body">
									<control_select v-model="value" :options="options" type="focus"></control_select>
								</div>
							</mm_card>
						</mm_col>
						<mm_col class="col-12 col-md-33">
							<mm_card class="pc">
								<div class="card_head">
									<h5 @click="$copy(code_4)">样式四 (点击 click)</h5>
								</div>
								<div class="card_body">
									<control_select v-model="value" :options="options" type="click"></control_select>
								</div>
							</mm_card>
						</mm_col>
						<mm_col class="col-12 col-md-33">
							<mm_card class="pc">
								<div class="card_head">
									<h5 @click="$copy(code_5)">样式五 (带图标)</h5>
								</div>
								<div class="card_body">
									<control_select v-model="value" :options="options" type="click" class="select_diy">
										<mm_icon src="/img/avatar.png"></mm_icon>
									</control_select>
								</div>
							</mm_card>
						</mm_col>
						<mm_col class="col-12 col-md-33">
							<mm_card class="pc">
								<div class="card_head">
									<h5 @click="$copy(code_5)">样式六 (多选)</h5>
								</div>
								<div class="card_body">
									<control_select v-model="value" :options="options" type="multiple"></control_select>
								</div>
							</mm_card>
						</mm_col>
						<mm_col class="col-12">
							<mm_card>
								<div class="card_body">
									选择结果：{{ value }}
								</div>
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
			return {
				value: "3",
				options: [{
						name: "选项一",
						value: "1",
					},
					{
						name: "选项二",
						value: "2",
					},
					{
						name: "选项三",
						value: "3",
					}
				],
				code_1: `
<control_select v-model="value" :options="options"></control_select>
`,
				code_2: `
<control_select v-model="value" :options="options" type="hover"></control_select>
`,
				code_3: `
<control_select v-model="value" :options="options" type="focus"></control_select>
`,
				code_4: `
<control_select v-model="value" :options="options" type="click"></control_select>
`,
				code_5: `
<control_select v-model="value" :options="options" type="click" class="select_diy">
	<mm_icon src="/img/avatar.png"></mm_icon>
</control_select>
`
			}
		}
	}
</script>

<style scoped="scoped">
	#page_select .select_diy img {
		width: 2rem;
	}

	#page_select .card_body {
		padding-bottom: 8rem;
	}
</style>
