<template>
	<main id="dev_app_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-mm-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>{{ form[field] ? '修改' : '创建' }}应用</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<dt>应用分类</dt>
										<dd>
											<mm_select v-model="form.type_id" :options="$to_kv(list_app_type, 'type_id', 'name', 0)" />
										</dd>
										<dt class="required">应用名</dt>
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
										<dt>关键词</dt>
										<dd>
											<mm_input v-model="form.keywords" :minlength="0" :maxlength="255" placeholder="" />
										</dd>
									</dl>
								</mm_form>
							</div>
							<div class="card_foot">
								<div class="mm_group">
									<button class="btn_default" type="button" @click="cancel">返回</button>
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
				url: "/api/dev/app?",
				url_get_obj: "/api/dev/app?method=get_obj",
				field: "app_id",
				query: {
					"app_id": 0
				},
				form: {
					"app_id": 0,
					"type_id": 0,
					"name": '',
					"title": '',
					"description": '',
					"keywords": '',
				},
				// 应用分类
				'list_app_type':[],
			}
		},
		methods: {
			/**
			 * 获取应用分类
			 * @param {query} 查询条件
			 */
			get_app_type(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "type_id,name"
					};
				}
				this.$get('~/api/dev/app_type?size=0', query, function(json) {
					if (json.result) {
						_this.list_app_type.clear();
						_this.list_app_type.addList(json.result.list)
					}
				});
			},
		},
		created() {
			// 获取应用分类
			this.get_app_type();
		}
	}
</script>

<style>
</style>
