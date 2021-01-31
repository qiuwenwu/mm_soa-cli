<template>
	<main id="dev_table_group_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-mm-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>{{ form[field] ? '修改' : '创建' }}数据表分组</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<dt>上级分组</dt>
										<dd>
											<mm_select v-model="form.father_id" :options="$to_kv(list_table_group, 'group_id', 'name', 0)" />
										</dd>
										<dt>适用的应用</dt>
										<dd>
											<mm_select v-model="form.app_id" :options="$to_kv(list_app, 'app_id', 'name', 0)" />
										</dd>
										<dt class="required">分组名称</dt>
										<dd>
											<mm_input v-model="form.name" :minlength="0" :maxlength="16" placeholder=""
											 :required="true" />
										</dd>
										<dt>分组标题</dt>
										<dd>
											<mm_input v-model="form.title" :minlength="0" :maxlength="125" placeholder="" />
										</dd>
										<dt>分组描述</dt>
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
				url: "/api/dev/table_group?",
				url_get_obj: "/api/dev/table_group?method=get_obj",
				field: "group_id",
				query: {
					"group_id": 0
				},
				form: {
					"group_id": 0,
					"father_id": 0,
					"app_id": 0,
					"name": '',
					"title": '',
					"description": '',
				},
				// 上级分组
				'list_table_group':[],
				// 适用的应用
				'list_app':[],
			}
		},
		methods: {
			/**
			 * 获取上级分组
			 * @param {query} 查询条件
			 */
			get_table_group(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "group_id,name,father_id"
					};
				}
				this.$get('~/api/dev/table_group?size=0', query, function(json) {
					if (json.result) {
						_this.list_table_group.clear();
						_this.list_table_group.addList(json.result.list)
					}
				});
			},
			/**
			 * 获取适用的应用
			 * @param {query} 查询条件
			 */
			get_app(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "app_id,name"
					};
				}
				this.$get('~/api/dev/app?size=0', query, function(json) {
					if (json.result) {
						_this.list_app.clear();
						_this.list_app.addList(json.result.list)
					}
				});
			},
		},
		created() {
			// 获取上级分组
			this.get_table_group();
			// 获取适用的应用
			this.get_app();
		}
	}
</script>

<style>
</style>
