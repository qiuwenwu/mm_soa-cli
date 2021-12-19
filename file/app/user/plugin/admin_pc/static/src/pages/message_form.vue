<template>
	<main id="user_message_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-mm-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>{{ form[field] ? '修改' : '创建' }}问题反馈</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<dt>用户</dt>
										<dd>
											<control_select type="list" v-model="form.user_id" :options="$to_kv(list_account, 'user_id', 'phone')" @change="search()" />
										</dd>
										<dt>图片</dt>
										<dd>
											<mm_upload_img width="10rem" height="10rem" name="img" type="text" v-model="form.img" />
										</dd>
										<dt>图片2</dt>
										<dd>
											<mm_upload_img width="10rem" height="10rem" name="img_2" type="text" v-model="form.img_2" />
										</dd>
										<dt>图片3</dt>
										<dd>
											<mm_upload_img width="10rem" height="10rem" name="img_3" type="text" v-model="form.img_3" />
										</dd>
										<dt>类型</dt>
										<dd>
											<control_select v-model="form.type" :options="$to_kv(arr_type)" />
										</dd>
										<dt>留言标题</dt>
										<dd>
											<control_input v-model="form.title" :minlength="0" :maxlength="255" placeholder="" />
										</dd>
										<dt>留言内容</dt>
										<dd>
											<control_rich v-model="form.content"></control_rich>
										</dd>
										<dt>留言者手机</dt>
										<dd>
											<control_input v-model="form.phone" :minlength="0" :maxlength="11" placeholder="" />
										</dd>
										<dt>留言者邮箱</dt>
										<dd>
											<control_input v-model="form.email" :minlength="0" :maxlength="125" placeholder="" />
										</dd>
										<dt>留言者姓名</dt>
										<dd>
											<control_input v-model="form.name" :minlength="0" :maxlength="16" placeholder="" />
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
				url_add: "/apis/user/message?method=add",
				url_set: "/apis/user/message?method=set",
				url_get_obj: "/apis/user/message?method=get_obj",
				field: "message_id",
				query: {
					"message_id": 0
				},
				form: {
					"message_id": 0,
					"user_id": 0,
					"img": '',
					"img_2": '',
					"img_3": '',
					"type": '',
					"title": '',
					"content": '',
					"phone": '',
					"email": '',
					"name": '',
				},
				// 用户
				'list_account':[],
				// 类型
				'arr_type':[{"name":"平台","value":"平台"},{"name":"账号","value":"账号"},{"name":"订单","value":"订单"},{"name":"支付","value":"支付"},{"name":"其他","value":"其他"}],
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
