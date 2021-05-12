<template>
	<mm_page id="page_pager">
		<header>
			<mm_warp>
				<mm_container>
					<mm_row>
						<mm_col width="100">
							<mm_view url="/">
								<h3>
									<span>分页器</span>
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
									<control_pager v-model="query.page" :count="count / query.size" :func="goTo"></control_pager>
								</div>
							</mm_card>
						</mm_col>
						<mm_col class="col-12 col-md-6">
							<mm_card>
								<div class="card_head">
									<h5 @click="$copy(code_2)">样式二</h5>
								</div>
								<div class="card_body">
									<control_pager class="control_pager-x" v-model="query.page" :count="count / query.size" :func="goTo"></control_pager>
								</div>
							</mm_card>
						</mm_col>
						<mm_col class="col-12 col-md-6">
							<mm_card>
								<div class="card_head">
									<h5 @click="$copy(code_3)">样式三</h5>
								</div>
								<div class="card_body">
									<control_pager display="2" v-model="query.page" :count="count / query.size" :func="goTo"></control_pager>
								</div>
							</mm_card>
						</mm_col>
						<mm_col class="col-12 col-md-6">
							<mm_card>
								<div class="card_head">
									<h5 @click="$copy(code_4)">样式四</h5>
								</div>
								<div class="card_body">
									<control_pager display="2" v-model="query.page" :count="count / query.size" :func="goTo" :icons="['首页', '上一页', '下一页', '尾页']"></control_pager>
								</div>
							</mm_card>
						</mm_col>
						<mm_col width="100">
							<mm_card>
								<div class="card_body">
									<p>当前：弟 {{ query.page }} 页</p>
									<p>每页显示：{{ query.size }} 条</p>
									<p>总计：{{ count }} 条</p>
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
				query: {
					page: 1,
					size: 30
				},
				count: 2000,
				code_1: `
<control_pager v-model="query.page" :count="count / query.size" :func="goTo"></control_pager>
`,
				code_2: `
<control_pager class="control_pager-x" v-model="query.page" :count="count / query.size" :func="goTo"></control_pager>
`,
				code_3: `
<control_pager display="2" v-model="query.page" :count="count / query.size" :func="goTo"></control_pager>
`,
				code_4: `
<control_pager display="2" v-model="query.page" :count="count / query.size" :func="goTo" :icons="['首页', '上一页', '下一页', '尾页']"></control_pager>
`
			}
		},
		methods: {
			goTo(page) {
				// 可用来做 翻页动画，大于之前页往左翻，小于之前页右翻
				console.log("当前页", page);
				console.log("之前页", this.query.page);
			}
		}
	}
</script>

<style>
</style>
