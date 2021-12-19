<template>
	<main id="user_info_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-mm-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>{{ form[field] ? '修改' : '创建' }}用户信息</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<dt>身份实名认证</dt>
										<dd>
											<control_select v-if="obj.idcard_state === 2" v-model="form.idcard_state" :options="$to_kv(arr_idcard_state)" />
											<span v-else>
												{{ arr_idcard_state[obj.idcard_state] }}
											</span>
										</dd>
										<dt>姓名</dt>
										<dd>
											<control_input v-model="form.name" :minlength="0" :maxlength="0" placeholder="" />
										</dd>
										<dt>职业</dt>
										<dd>
											<control_input v-model="form.job" :minlength="0" :maxlength="16" placeholder="" />
										</dd>
										<dt>身份证号</dt>
										<dd>
											<control_input v-model="form.idcard" :minlength="0" :maxlength="64" placeholder="" />
										</dd>
										<dt>身份证正面</dt>
										<dd>
											<mm_upload_img width="10rem" height="10rem" name="img_idcard_front" type="text" v-model="form.img_idcard_front" />
										</dd>
										<dt>身份证反面</dt>
										<dd>
											<mm_upload_img width="10rem" height="10rem" name="img_idcard_back" type="text" v-model="form.img_idcard_back" />
										</dd>
										<dt>手持身份证</dt>
										<dd>
											<mm_upload_img width="10rem" height="10rem" name="img_hand_held" type="text" v-model="form.img_hand_held" />
										</dd>
										<dt>备注</dt>
										<dd>
											<control_textarea v-model="form.note" :minlength="0" :maxlength="255" placeholder="用于驳回审核认证时" />
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
				url_add: "/apis/user/info?method=add",
				url_set: "/apis/user/info?method=set",
				url_get_obj: "/apis/user/info?method=get_obj",
				field: "user_id",
				query: {
					"user_id": 0
				},
				form: {
					"user_id": 0,
					"sex": 0,
					"age": 0,
					"idcard_state": 0,
					"province_id": 0,
					"city_id": 0,
					"birthday": '',
					"name": '',
					"job": '',
					"school": '',
					"major": '',
					"idcard": '',
					"company_address": '',
					"address": '',
					"job_scope": '',
					"company_business": '',
					"img_idcard_front": '',
					"img_idcard_back": '',
					"img_hand_held": '',
					"note": '',
				},
				// 性别
				'arr_sex':["未设置","男","女"],
				// 身份实名认证
				'arr_idcard_state':["","未认证","认证中","认证通过","驳回"],
				// 省份
				'list_address_province':[],
				// 所在城市
				'list_address_city':[],
			}
		},
		methods: {
			
			/**
			 *  提交前事件
			 */
			submit_before(param) {
				let p = Object.assign({} ,param);
				p.birthday = param.birthday.toTime().toStr("yyyy-MM-dd");
				
				return p;
			},
			
			/**
			 * 获取省份
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
			/**
			 * 获取所在城市
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
			// 获取省份
			this.get_address_province();
			// 获取所在城市
			this.get_address_city();
		}
	}
</script>

<style>
</style>
