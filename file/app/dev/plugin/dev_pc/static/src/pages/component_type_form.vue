<template>
	<main id="dev_component_type_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-mm-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>{{ form[field] ? '修改' : '创建' }}组件分类</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<dt>上级分类</dt>
										<dd>
											<mm_select v-model="form.father_id" :options="$to_kv(list_component_type, 'type_id', 'name', 0)" />
										</dd>
										<dt class="required">分类名称</dt>
										<dd>
											<mm_input v-model="form.name" :minlength="0" :maxlength="32" placeholder=""
											 :required="true" />
										</dd>
										<dt>分类标题</dt>
										<dd>
											<mm_input v-model="form.title" :minlength="0" :maxlength="125" placeholder="" />
										</dd>
										<dt>分类描述</dt>
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
				url: "/api/dev/component_type?",
				url_get_obj: "/api/dev/component_type?method=get_obj",
				field: "type_id",
				query: {
					"type_id": 0
				},
				form: {
					"type_id": 0,
					"father_id": 0,
					"name": '',
					"title": '',
					"description": '',
					"keywords": '',
				},
				// 上级分类
				'list_component_type':[],
			}
		},
		methods: {
			/**
			 * 获取上级分类
			 * @param {query} 查询条件
			 */
			get_component_type(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "type_id,name,father_id"
					};
				}
				this.$get('~/api/dev/component_type?size=0', query, function(json) {
					if (json.result) {
						_this.list_component_type.clear();
						_this.list_component_type.addList(json.result.list)
					}
				});
			},
		},
		created() {
			// 获取上级分类
			this.get_component_type();
		}
	}
</script>

<style>
</style>
