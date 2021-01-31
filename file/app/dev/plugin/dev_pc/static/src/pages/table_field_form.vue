<template>
	<main id="dev_table_field_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-mm-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>{{ form[field] ? '修改' : '创建' }}开发表字段</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<dt>是否主键</dt>
										<dd>
											<mm_switch v-model="form.key" />
										</dd>
										<dt>是否补零</dt>
										<dd>
											<mm_switch v-model="form.fill_zero" />
										</dd>
										<dt>是否非空</dt>
										<dd>
											<mm_switch v-model="form.not_null" />
										</dd>
										<dt>是否含符号</dt>
										<dd>
											<mm_switch v-model="form.symbol" />
										</dd>
										<dt>小数点位</dt>
										<dd>
											<mm_number v-model="form.decimal" :min="0" :max="99" />
										</dd>
										<dt>适用的表</dt>
										<dd>
											<mm_select v-model="form.table_id" :options="$to_kv(list_table, 'table_id', 'name', 0)" />
										</dd>
										<dt>使用次数</dt>
										<dd>
											<mm_number v-model="form.num" :min="0" :max="2147483647" />
										</dd>
										<dt>最小长度</dt>
										<dd>
											<mm_number v-model="form.min_length" :min="0" :max="2147483647" />
										</dd>
										<dt>最大长度</dt>
										<dd>
											<mm_number v-model="form.max_length" :min="0" :max="2147483647" />
										</dd>
										<dt>最小值</dt>
										<dd>
											<mm_number v-model="form.min" :min="0" :max="2147483647" />
										</dd>
										<dt>最大值</dt>
										<dd>
											<mm_number v-model="form.max" :min="0" :max="2147483647" />
										</dd>
										<dt>适用率</dt>
										<dd>
											<mm_number v-model="form.rate" :min="0" :max="0" />
										</dd>
										<dt class="required">字段名</dt>
										<dd>
											<mm_input v-model="form.name" :minlength="0" :maxlength="32" placeholder=""
											 :required="true" />
										</dd>
										<dt class="required">数据类型</dt>
										<dd>
											<mm_input v-model="form.type" :minlength="0" :maxlength="32" placeholder=""
											 :required="true" />
										</dd>
										<dt>自动</dt>
										<dd>
											<mm_input v-model="form.auto" :minlength="0" :maxlength="125" placeholder="" />
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
										<dt>默认值</dt>
										<dd>
											<mm_input v-model="form.default" :minlength="0" :maxlength="255" placeholder="" />
										</dd>
										<dt>关联图</dt>
										<dd>
											<mm_input v-model="form.map" :minlength="0" :maxlength="255" placeholder="" />
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
				url: "/api/dev/table_field?",
				url_get_obj: "/api/dev/table_field?method=get_obj",
				field: "field_id",
				query: {
					"field_id": 0
				},
				form: {
					"field_id": 0,
					"key": 0,
					"fill_zero": 0,
					"not_null": 0,
					"symbol": 0,
					"decimal": 0,
					"table_id": 0,
					"num": 0,
					"min_length": 0,
					"max_length": 0,
					"min": 0,
					"max": 0,
					"rate": 0,
					"name": '',
					"type": '',
					"auto": '',
					"title": '',
					"description": '',
					"keywords": '',
					"default": '',
					"map": '',
				},
				// 适用的表
				'list_table':[],
			}
		},
		methods: {
			/**
			 * 获取适用的表
			 * @param {query} 查询条件
			 */
			get_table(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "table_id,name"
					};
				}
				this.$get('~/api/dev/table?size=0', query, function(json) {
					if (json.result) {
						_this.list_table.clear();
						_this.list_table.addList(json.result.list)
					}
				});
			},
		},
		created() {
			// 获取适用的表
			this.get_table();
		}
	}
</script>

<style>
</style>
