<template>
	<mm_page id="page_reverse">
		<header>
			<mm_warp>
				<mm_container>
					<mm_row>
						<mm_col width="100">
							<mm_view url="/">
								<h3>
									<span>反转器</span>
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
							<mm_card>
								<div class="card_head">
									<h5 @click="$copy(code_1)">样式一</h5>
								</div>
								<div class="card_body">
									<control_reverse title="时间" v-model="query.orderby" :options="options_time" :func="callback"></control_reverse>
									<control_reverse title="人气" v-model="query.orderby" :options="options_hot" :func="callback"></control_reverse>
								</div>
							</mm_card>
						</mm_col>
						<mm_col class="col-12 col-md-6">
							<mm_card>
								<div class="card_head">
									<h5 @click="$copy(code_2)">样式二</h5>
								</div>
								<div class="card_body">
									<control_reverse title="时间" v-model="query.orderby" :options="options_time" :func="callback" display="2"></control_reverse>
									<control_reverse title="人气" v-model="query.orderby" :options="options_hot" :func="callback" display="2"></control_reverse>
								</div>
							</mm_card>
						</mm_col>
						<mm_col width="100">
							<mm_card>
								<div class="card_body">排序方式 {{ query.orderby }}</div>
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
				query: {
					orderby: "`create_time` asc"
				},
				options_time: ["`create_time` asc", "`create_time` desc"],
				options_hot: ["`hot` asc", "`hot` desc"],
				code_1: `
<control_reverse title="时间" v-model="query.orderby" :options="options_time" :func="callback"></control_reverse>
`,
				code_2: `
<control_reverse title="时间" v-model="query.orderby" :options="options_time" :func="callback" display="2"></control_reverse>
`
			}
		},
		methods: {
			callback(val) {
				// 可用于查询
				console.log('当前值', val);
			}
		}
	}
</script>

<style>
</style>
