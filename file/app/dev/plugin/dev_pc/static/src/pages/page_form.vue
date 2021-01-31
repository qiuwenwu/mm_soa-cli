<template>
	<main id="dev_page_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-mm-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>{{ form[field] ? '修改' : '创建' }}页面</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<dt>页面分组</dt>
										<dd>
											<mm_select v-model="form.group_id" :options="$to_kv(list_page_group, 'group_id', 'name', 0)" />
										</dd>
										<dt>使用次数</dt>
										<dd>
											<mm_number v-model="form.num" :min="0" :max="2147483647" />
										</dd>
										<dt>适用率</dt>
										<dd>
											<mm_number v-model="form.rate" :min="0" :max="0" />
										</dd>
										<dt class="required">页面名称</dt>
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
				url: "/api/dev/page?",
				url_get_obj: "/api/dev/page?method=get_obj",
				field: "page_id",
				query: {
					"page_id": 0
				},
				form: {
					"page_id": 0,
					"group_id": 0,
					"num": 0,
					"rate": 0,
					"name": '',
					"title": '',
					"description": '',
				},
				// 页面分组
				'list_page_group':[],
			}
		},
		methods: {
			/**
			 * 获取页面分组
			 * @param {query} 查询条件
			 */
			get_page_group(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "group_id,name"
					};
				}
				this.$get('~/api/dev/page_group?size=0', query, function(json) {
					if (json.result) {
						_this.list_page_group.clear();
						_this.list_page_group.addList(json.result.list)
					}
				});
			},
		},
		created() {
			// 获取页面分组
			this.get_page_group();
		}
	}
</script>

<style>
</style>
