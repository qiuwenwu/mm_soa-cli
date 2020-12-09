<template>
	<mm_page id="page_btn">
		<header>
			<mm_warp>
				<mm_container>
					<mm_row>
						<mm_col width="100">
							<mm_view url="/">
								<h3>
									<span>开关</span>
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
						<mm_col class="col-12 col-md-6">
							<mm_card class="pc">
								<div class="card_head">PC版</div>
								<div class="card_body">
									<mm_view>
										<h5 @click="$copy(code_1)">样式一</h5>
										<mm_switch title="开关" v-model="value"></mm_switch>
									</mm_view>
									<mm_view>
										<h5 @click="$copy(code_2)">样式二</h5>
										<mm_switch title="开关" v-model="value" display="2"></mm_switch>
									</mm_view>
								</div>
							</mm_card>
						</mm_col>
						<mm_col class="col-12 col-md-6">
							<mm_card class="mobile">
								<div class="card_head">Mobile版本</div>
								<div class="card_body">
									<mm_view>
										<h5 @click="$copy(code_3)">样式三</h5>
										<mm_switch title="开关" v-model="value"></mm_switch>
									</mm_view>
									<mm_view>
										<h5 @click="$copy(code_4)">样式四</h5>
										<mm_switch title="开关" v-model="value" display="2"></mm_switch>
									</mm_view>
								</div>
							</mm_card>
						</mm_col>
					</mm_row>
				</mm_container>
			</mm_warp>
			<mm_warp>
				<mm_container>
					<mm_row>
						<mm_col width="100">
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
				value: 1,
				code_1: `
<mm_card class="pc">
	<mm_switch title="开关" v-model="value"></mm_switch>
</mm_card>
`,
				code_2: `
<mm_card class="pc">
	<mm_switch title="开关" v-model="value" display="2"></mm_switch>
</mm_card>
`,
				code_3: `
<mm_card class="mobile">
	<mm_switch title="开关" v-model="value" display="2"></mm_switch>
</mm_card>
`,
				code_4: `
<mm_card class="mobile">
	<mm_switch title="开关" v-model="value" display="2"></mm_switch>
</mm_card>
`
			}
		}
	}
</script>

<style>
</style>
