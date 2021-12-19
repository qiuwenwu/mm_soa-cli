<template>
	<main id="user_address_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-mm-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>{{ form[field] ? '修改' : '创建' }}收货地址</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<dt class="required">省</dt>
										<dd>
											<control_input v-model="form.province" :minlength="0" :maxlength="9" placeholder=""
											 :required="true" />
										</dd>
										<dt class="required">市</dt>
										<dd>
											<control_input v-model="form.city" :minlength="0" :maxlength="9" placeholder=""
											 :required="true" />
										</dd>
										<dt class="required">区</dt>
										<dd>
											<control_input v-model="form.area" :minlength="0" :maxlength="9" placeholder=""
											 :required="true" />
										</dd>
										<dt>收件人性别</dt>
										<dd>
											<control_select v-model="form.sex" :options="$to_kv(arr_sex)" />
										</dd>
										<dt>收件人电话</dt>
										<dd>
											<control_input v-model="form.phone" :minlength="0" :maxlength="11" placeholder="" />
										</dd>
										<dt>收件人姓名</dt>
										<dd>
											<control_input v-model="form.name" :minlength="0" :maxlength="32" placeholder="" />
										</dd>
										<dt>门牌号</dt>
										<dd>
											<control_input v-model="form.house_number" :minlength="0" :maxlength="125" placeholder="" />
										</dd>
										<dt>收件地址</dt>
										<dd>
											<control_input v-model="form.address" :minlength="0" :maxlength="255" placeholder="" />
										</dd>
										<dt>用户</dt>
										<dd>
											<control_select type="list" v-model="form.user_id" :options="$to_kv(list_account, 'user_id', 'phone')" @change="search()" />
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
				url_add: "/apis/user/address?method=add",
				url_set: "/apis/user/address?method=set",
				url_get_obj: "/apis/user/address?method=get_obj",
				field: "address_id",
				query: {
					"address_id": 0
				},
				form: {
					"address_id": 0,
					"province": '',
					"city": '',
					"area": '',
					"sex": 0,
					"phone": '',
					"name": '',
					"house_number": '',
					"address": '',
					"user_id": 0,
				},
				// 收件人性别
				'arr_sex':["","女","男"],
				// 用户
				'list_account':[],
			}
		},
		methods: {
			/**
			 * 获取用户
			 * @param {query} 查询条件
			 */
			get_account(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "user_id,phone"
					};
				}
				this.$get('~/apis/user/account?size=0', query, function(json) {
					if (json.result) {
						_this.list_account.clear();
						_this.list_account.addList(json.result.list)
					}
				});
			},
		},
		created() {
			// 获取用户
			this.get_account();
		}
	}
</script>

<style>
</style>
