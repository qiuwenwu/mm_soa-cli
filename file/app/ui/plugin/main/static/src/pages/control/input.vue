<template>
	<mm_page id="page_input">
		<header>
			<mm_warp>
				<mm_container>
					<mm_row>
						<mm_col width="100">
							<mm_view url="/">
								<h3>
									<span>输入框</span>
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
									<h5 @click="$copy(code_1)">样式一(PC)</h5>
								</div>
								<div class="card_body">
									<control_input title="姓名" type="text" :min_length="min_length" :max_length="max_length" v-model="str" desc="请输入真实姓名"></control_input>
									<control_input title="年龄" type="number" :min="min" :max="max" :max_length="max_length" v-model="num"></control_input>
									<control_input title="密码" type="password" v-model="pass" desc="请输入密码"></control_input>
									<control_input title="余额" type="number" v-model="money" unit="元"></control_input>
								</div>
							</mm_card>
						</mm_col>
						<mm_col class="col-12 col-md-6">
							<mm_card class="mobile">
								<div class="card_head">
									<h5 @click="$copy(code_2)">样式二(mobile)</h5>
								</div>
								<div class="card_body">
									<control_input title="姓名" type="text" :min_length="min_length" :max_length="max_length" v-model="str" desc="请输入真实姓名"></control_input>
									<control_input title="年龄" type="number" :min="min" :max="max" :max_length="max_length" v-model="num"></control_input>
									<control_input title="密码" type="password" v-model="pass" desc="请输入密码"></control_input>
									<control_input title="余额" type="number" v-model="money" unit="元"></control_input>
								</div>
							</mm_card>
						</mm_col>
						<mm_col width="100">
							<mm_card class="mt pt">
								<div class="card_body">
									<div>姓名：{{ str }}</div>
									<div>年龄：{{ num }}</div>
									<div>密码：{{ pass }}</div>
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
				pass: "",
				str: "",
				num: 1,
				min: 1,
				max: 150,
				min_length: 2,
				max_length: 8,
				money: 0,
				code_1: `
<mm_card class="pc">
<control_input title="姓名" type="text" :min_length="min_length" :max_length="max_length" v-model="str" desc="请输入真实姓名" unit="元"></control_input>
</mm_card>
`,
				code_2: `
<mm_card class="mobile">
<control_input title="姓名" type="text" :min_length="min_length" :max_length="max_length" v-model="str" desc="请输入真实姓名" unit="元"></control_input>
</mm_card>
`
			}
		}
	}
</script>

<style>
</style>
