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
										<dt>性别</dt>
										<dd>
											<mm_select v-model="form.sex" :options="$to_kv(arr_sex)" />
										</dd>
										<dt>身份实名认证</dt>
										<dd>
											<mm_select v-model="form.idcard_state" :options="$to_kv(arr_idcard_state)" />
										</dd>
										<dt>年龄</dt>
										<dd>
											<mm_number v-model="form.age" :min="0" :max="150" />
										</dd>
										<dt>省份</dt>
										<dd>
											<mm_select v-model="form.province_id" :options="$to_kv(list_address_province, 'province_id', 'name', 0)" />
										</dd>
										<dt>所在城市</dt>
										<dd>
											<mm_select v-model="form.city_id" :options="$to_kv(list_address_city, 'city_id', 'name', 0)" />
										</dd>
										<dt>生日</dt>
										<dd>
											<mm_time v-model="form.birthday" type="date" />
										</dd>
										<dt>姓名</dt>
										<dd>
											<mm_input v-model="form.name" :minlength="0" :maxlength="0" placeholder="" />
										</dd>
										<dt>职业</dt>
										<dd>
											<mm_input v-model="form.job" :minlength="0" :maxlength="16" placeholder="" />
										</dd>
										<dt>毕业学校</dt>
										<dd>
											<mm_input v-model="form.school" :minlength="0" :maxlength="16" placeholder="" />
										</dd>
										<dt>所学专业</dt>
										<dd>
											<mm_input v-model="form.major" :minlength="0" :maxlength="16" placeholder="" />
										</dd>
										<dt>身份证号</dt>
										<dd>
											<mm_input v-model="form.idcard" :minlength="0" :maxlength="64" placeholder="" />
										</dd>
										<dt>公司地址</dt>
										<dd>
											<mm_input v-model="form.company_address" :minlength="0" :maxlength="125" placeholder="用户当前就职的公司地址" />
										</dd>
										<dt>详细地址</dt>
										<dd>
											<mm_input v-model="form.address" :minlength="0" :maxlength="255" placeholder="用户居住地的详细地址" />
										</dd>
										<dt>工作范围</dt>
										<dd>
											<mm_input v-model="form.job_scope" :minlength="0" :maxlength="255" placeholder="" />
										</dd>
										<dt>公司经营范围</dt>
										<dd>
											<mm_input v-model="form.company_business" :minlength="0" :maxlength="255" placeholder="" />
										</dd>
										<dt>身份证图片</dt>
										<dd>
											<mm_upload_img width="10rem" height="10rem" name="idcard_img" type="text" v-model="form.idcard_img" />
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
				url: "/apis/user/info?",
				url_get_obj: "/apis/user/info?method=get_obj",
				field: "user_id",
				query: {
					"user_id": 0
				},
				form: {
					"user_id": 0,
					"sex": 0,
					"idcard_state": 0,
					"age": 0,
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
					"idcard_img": '',
				},
				// 性别
				'arr_sex':["未设置","男","女"],
				// 身份实名认证
				'arr_idcard_state':["","未认证","认证中","认证通过"],
				// 省份
				'list_address_province':[],
				// 所在城市
				'list_address_city':[],
			}
		},
		methods: {
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
