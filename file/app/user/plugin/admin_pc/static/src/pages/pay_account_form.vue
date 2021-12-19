<template>
	<main id="user_pay_account_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-mm-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>{{ form[field] ? '修改' : '创建' }}支付账号</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<dt>类型</dt>
										<dd>
											<control_select type="list" v-model="form.type_id" :options="$to_kv(list_pay_type, 'type_id', 'name')" @change="search()" />
										</dd>
										<dt>账号</dt>
										<dd>
											<control_input v-model="form.uesrname" :minlength="0" :maxlength="255" placeholder="" />
										</dd>
										<dt>状态</dt>
										<dd>
											<control_select v-model="form.state" :options="$to_kv(arr_state)" />
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
				url_add: "/apis/user/pay_account?method=add",
				url_set: "/apis/user/pay_account?method=set",
				url_get_obj: "/apis/user/pay_account?method=get_obj",
				field: "user_id",
				query: {
					"user_id": 0
				},
				form: {
					"user_id": 0,
					"type_id": 0,
					"uesrname": '',
					"state": 0,
				},
				// 类型
				'list_pay_type':[],
				// 状态
				'arr_state':["","审核中","已通过","未通过","已冻结"],
			}
		},
		methods: {
			/**
			 * 获取类型
			 * @param {query} 查询条件
			 */
			get_pay_type(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "type_id,name"
					};
				}
				this.$get('~/apis/user/pay_type?size=0', query, function(json) {
					if (json.result) {
						_this.list_pay_type.clear();
						_this.list_pay_type.addList(json.result.list)
					}
				});
			},
		},
		created() {
			// 获取类型
			this.get_pay_type();
		}
	}
</script>

<style>
</style>
