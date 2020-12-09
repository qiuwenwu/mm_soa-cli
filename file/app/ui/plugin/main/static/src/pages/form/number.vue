<template>
	<mm_page id="page_btn">
		<header>
			<mm_warp>
				<mm_container>
					<mm_row>
						<mm_col width="100">
							<mm_view url="/">
								<h3>
									<span>计数器</span>
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
								<div class="card_head">
									<h5 @click="$copy(code_1)">样式一</h5>
								</div>
								<div class="card_body">
									<mm_number v-model="value" :min="min" :max="max" :num="num"></mm_number>
								</div>
							</mm_card>
						</mm_col>
						<mm_col class="col-12 col-md-6">
							<mm_card class="mobile">
								<div class="card_head">
									<h5 @click="$copy(code_2)">样式二</h5>
								</div>
								<div class="card_body">
									<mm_number v-model="value" :min="min" :max="max" :num="num"></mm_number>
								</div>
							</mm_card>
						</mm_col>
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
				value: 5,
				min: 5,
				max: 150,
				// 每次增减数
				num: 5,
				code_1: `
<mm_card class="pc">
<mm_number v-model="value" :min="min" :max="max" :num="num"></mm_number>
</mm_card>
`,
				code_2: `
<mm_card class="mobile">
<mm_number v-model="value" :min="min" :max="max" :num="num"></mm_number>
</mm_card>
`
			}
		}
	}
</script>

<style>
</style>
