<template>
	<main id="sys_address_city_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-mm-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>{{ form[field] ? '修改' : '创建' }}城市</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<dt>显示位置</dt>
										<dd>
											<control_select v-model="form.show" :options="$to_kv(arr_show)" />
										</dd>
										<dt>所属省份</dt>
										<dd>
											<control_select v-model="form.province_id" :options="$to_kv(list_address_province, 'province_id', 'name', 0)" />
										</dd>
										<dt class="required">城市名称</dt>
										<dd>
											<control_input v-model="form.name" :minlength="0" :maxlength="16" placeholder=""
											 :required="true" />
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
				url: "/apis/sys/address_city?",
				url_get_obj: "/apis/sys/address_city?method=get_obj",
				field: "city_id",
				query: {
					"city_id": 0
				},
				form: {
					"city_id": 0,
					"show": 0,
					"province_id": 0,
					"name": '',
				},
				// 显示位置
				'arr_show':["仅表单可见","表单和搜索可见","均可见"],
				// 所属省份
				'list_address_province':[],
			}
		},
		methods: {
			/**
			 * 获取所属省份
			 * @param {query} 查询条件
			 */
			get_address_province(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "province_id,name"
					};
				}
				this.$get('~/apis/sys/address_province?size=0', query, function(json) {
					if (json.result) {
						_this.list_address_province.clear();
						_this.list_address_province.addList(json.result.list)
					}
				});
			},
		},
		created() {
			// 获取所属省份
			this.get_address_province();
		}
	}
</script>

<style>
</style>
