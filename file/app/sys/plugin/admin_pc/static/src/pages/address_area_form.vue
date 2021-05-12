<template>
	<main id="sys_address_area_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-mm-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>{{ form[field] ? '修改' : '创建' }}地区</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<dt>是否可见</dt>
										<dd>
											<control_select v-model="form.show" :options="$to_kv(arr_show)" />
										</dd>
										<dt>所属城市</dt>
										<dd>
											<control_select v-model="form.city_id" :options="$to_kv(list_address_city, 'city_id', 'name', 0)" />
										</dd>
										<dt class="required">地区名称</dt>
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
				url: "/apis/sys/address_area?",
				url_get_obj: "/apis/sys/address_area?method=get_obj",
				field: "area_id",
				query: {
					"area_id": 0
				},
				form: {
					"area_id": 0,
					"show": 0,
					"city_id": 0,
					"name": '',
				},
				// 是否可见
				'arr_show':["仅表单可见","表单和搜索可见","均可见"],
				// 所属城市
				'list_address_city':[],
			}
		},
		methods: {
			/**
			 * 获取所属城市
			 * @param {query} 查询条件
			 */
			get_address_city(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "city_id,name"
					};
				}
				this.$get('~/apis/sys/address_city?size=0', query, function(json) {
					if (json.result) {
						_this.list_address_city.clear();
						_this.list_address_city.addList(json.result.list)
					}
				});
			},
		},
		created() {
			// 获取所属城市
			this.get_address_city();
		}
	}
</script>

<style>
</style>
