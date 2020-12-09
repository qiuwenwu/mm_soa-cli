<template>
	<main id="user_sns_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col>
						<mm_card>
							<div class="card_head arrow">
								<h5>{{ form[field] ? '修改' : '创建' }}社交账户</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<dt>QQ号</dt>
										<dd>
											<mm_input v-model="form.qq" :minlength="0" :maxlength="0" placeholder="" />
										</dd>
										<dt>QQ认证</dt>
										<dd>
											<mm_switch v-model="form.qq_state" />
										</dd>
										<dt>微信号</dt>
										<dd>
											<mm_input v-model="form.wechat" :minlength="0" :maxlength="0" placeholder="" />
										</dd>
										<dt>微信认证</dt>
										<dd>
											<mm_switch v-model="form.wechat_state" />
										</dd>
										<dt>MM号</dt>
										<dd>
											<mm_input v-model="form.mm" :minlength="0" :maxlength="0" placeholder="" />
										</dd>
										<dt>MM认证</dt>
										<dd>
											<mm_switch v-model="form.mm_state" />
										</dd>
										<dt>百度账号</dt>
										<dd>
											<mm_input v-model="form.baidu" :minlength="0" :maxlength="0" placeholder="" />
										</dd>
										<dt>百度认证</dt>
										<dd>
											<mm_switch v-model="form.baidu_state" />
										</dd>
										<dt>淘宝账号</dt>
										<dd>
											<mm_input v-model="form.taobao" :minlength="0" :maxlength="0" placeholder="" />
										</dd>
										<dt>淘宝认证</dt>
										<dd>
											<mm_switch v-model="form.taobao_state" />
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
				url_submit: "/apis/user/sns?",
				url_get_obj: "/apis/user/sns?method=get_obj",
				field: "user_id",
				query: {
					"user_id": 0
				},
				form: {
					"user_id": 0,
					"qq": '',
					"qq_state": 0,
					"wechat": '',
					"wechat_state": 0,
					"mm": '',
					"mm_state": 0,
					"baidu": '',
					"baidu_state": 0,
					"taobao": '',
					"taobao_state": 0,
				},
				// QQ认证
				'arr_qq_state': [ '未认证' , '已认证' ],
				// 微信认证
				'arr_wechat_state': [ '未认证' , '已认证' ],
				// MM认证
				'arr_mm_state': [ '未认证' , '已认证' ],
				// 百度认证
				'arr_baidu_state': [ '未认证' , '已认证' ],
				// 淘宝认证
				'arr_taobao_state': [ '未认证' , '已认证' ],
			}
		},
		methods: {
		},
		created() {
		}
	}
</script>

<style>
</style>
