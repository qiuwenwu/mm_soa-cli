<template>
	<mm_page id="page_pre">
		<header>
			<mm_warp>
				<mm_container>
					<mm_row>
						<mm_col width="100">
							<mm_view url="/">
								<h3>
									<span>源代码</span>
									<span class="fr">&lt; 返回</span>
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
								<div class="card_head">带复制</div>
								<div class="card_body">
									<mm_pre :code="code">
										<code class="javascript"></code>
									</mm_pre>
								</div>
							</mm_card>
						</mm_col>
						<mm_col class="col-12 col-md-6">
							<mm_card>
								<div class="card_head">不带复制</div>
								<div class="card_body">
									<mm_pre>
										<code class="typescript">
											{{ code }}
										</code>
									</mm_pre>
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
	// import vs from '/highlight/styles/vs.css';

	import mm_pre from '/src/components/content/mm_pre.vue';

	export default {
		template: __template__,
		components: {
			mm_pre
		},
		data() {
			return {
				code: `
var date = new Date();
export default {
template: __template__,
	components: {
		mm_pre
	}
}`
			}
		}
	}
</script>

<style>
</style>
