<template>
	<main id="dev_component_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-mm-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>{{ form[field] ? '修改' : '创建' }}组件</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<dt>组件ID</dt>
										<dd>
											<mm_input v-model="form.component_id" :minlength="0" :maxlength="0" placeholder="" />
										</dd>
										<dt>使用次数</dt>
										<dd>
											<mm_number v-model="form.num" :min="0" :max="2147483647" />
										</dd>
										<dt>适用率</dt>
										<dd>
											<mm_number v-model="form.rate" :min="0" :max="0" />
										</dd>
										<dt class="required">组件名称</dt>
										<dd>
											<mm_input v-model="form.name" :minlength="0" :maxlength="32" placeholder=""
											 :required="true" />
										</dd>
										<dt>标题</dt>
										<dd>
											<mm_input v-model="form.title" :minlength="0" :maxlength="125" placeholder="" />
										</dd>
										<dt>描述</dt>
										<dd>
											<mm_input v-model="form.description" :minlength="0" :maxlength="255" placeholder="" />
										</dd>
									</dl>
								</mm_form>
							</div>
							<div class="card_foot">
								<div class="mm_group">
									<button class="btn_default" type="button" @click="cancel">取消</button>
									<button class="btn_primary" type="button" @click="submit()">提交</button>
								</div>
							</div>
						</mm_card>
					</mm_col>
				</mm_row>
			</mm_container>
		</mm_warp>
	</main>
</template>


<script>
	import mixin from '/src/mixins/page.js';

	export default {
		mixins: [mixin],
		components: {},
		data() {
			return {
				url: "/api/dev/component?",
				url_get_obj: "/api/dev/component?method=get_obj",
				field: "page_id",
				query: {
					"page_id": 0
				},
				form: {
					"component_id": 0,
					"page_id": 0,
					"num": 0,
					"rate": 0,
					"name": '',
					"title": '',
					"description": '',
				},
				// 适用页面
				'list_page':[],
			}
		},
		methods: {
			/**
			 * 获取适用页面
			 * @param {query} 查询条件
			 */
			get_page(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "page_id,name"
					};
				}
				this.$get('~/api/dev/page?size=0', query, function(json) {
					if (json.result) {
						_this.list_page.clear();
						_this.list_page.addList(json.result.list)
					}
				});
			},
		},
		created() {
			// 获取适用页面
			this.get_page();
		}
	}
</script>

<style>
</style>
