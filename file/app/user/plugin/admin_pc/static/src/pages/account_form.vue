<template>
	<main id="user_account_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-mm-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>{{ form[field] ? '修改' : '创建' }}用户账户</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<dt>账户状态</dt>
										<dd>
											<control_select v-model="form.state"
												:options="$to_kv(arr_state)" />
										</dd>
										<dt>会员级别</dt>
										<dd>
											<control_number v-model="form.vip" :min="0" :max="10" />
										</dd>
										<dt>管理员级别</dt>
										<dd>
											<control_number v-model="form.gm" :min="0" :max="10" />
										</dd>
										<dt>商家级别</dt>
										<dd>
											<control_number v-model="form.mc" :min="0" :max="10" />
										</dd>
										<dt>所在用户组</dt>
										<dd>
											<control_select type="list" v-model="form.group_id"
												:options="$to_kv(list_group, 'group_id', 'name')" />
										</dd>
										<dt>所在管理组</dt>
										<dd>
											<control_select type="list" v-model="form.admin_id"
												:options="$to_kv(list_admin, 'admin_id', 'name')" />
										</dd>
										<dt>推荐人</dt>
										<dd>
											<control_select type="list" v-model="form.referee_id"
												:options="$to_kv(list_account, 'user_id', 'nickname')" />
										</dd>
										<dt>管理费</dt>
										<dd>
											<control_number v-model="form.service_fee" :min="0" :max="0" />
										</dd>
										<dt>上次登录时间</dt>
										<dd>
											<mm_time v-model="form.login_time" type="datetime-local" />
										</dd>
										<dt class="required">邀请注册码</dt>
										<dd>
											<control_input v-model="form.invite_code" :minlength="0"
												:maxlength="8"
												placeholder="随着用户注册而生成"
												:required="true" />
										</dd>
										<dt>手机号码</dt>
										<dd>
											<control_input v-model="form.phone" :minlength="0"
												:maxlength="11"
												placeholder="用户的手机号码，用于找回密码时或登录时" />
										</dd>
										<dt>手机认证</dt>
										<dd>
											<control_select v-model="form.phone_state"
												:options="$to_kv(arr_phone_state)" />
										</dd>
										<dt class="required">用户名</dt>
										<dd>
											<control_input v-model="form.username" :minlength="0"
												:maxlength="16"
												placeholder="用户登录时所用的账户名称"
												:required="true" />
										</dd>
										<dt>昵称</dt>
										<dd>
											<control_input v-model="form.nickname" :minlength="0"
												:maxlength="16"
												placeholder="" />
										</dd>
										<dt>邮箱</dt>
										<dd>
											<control_input v-model="form.email" :minlength="0"
												:maxlength="64"
												placeholder="用户的邮箱，用于找回密码时或登录时" />
										</dd>
										<dt>邮箱认证</dt>
										<dd>
											<control_select v-model="form.email_state"
												:options="$to_kv(arr_email_state)" />
										</dd>
										<dt>上次登录IP</dt>
										<dd>
											<control_input v-model="form.login_ip" :minlength="0"
												:maxlength="128"
												placeholder="" />
										</dd>
										<dt>个性签名</dt>
										<dd>
											<control_input v-model="form.signature" :minlength="0"
												:maxlength="255"
												placeholder="" />
										</dd>
										<dt>头像地址</dt>
										<dd>
											<mm_upload_img width="10rem" height="10rem" name="avatar" type="text"
												v-model="form.avatar" />
										</dd>
										<dt>好友</dt>
										<dd>
											<control_textarea v-model="form.friends" type="text"
												placeholder="多个好友ID用“,”分隔">
											</control_textarea>
										</dd>
										<dt>钱包地址</dt>
										<dd>
											<control_input v-model="form.wallet_address" :minlength="0"
												:maxlength="70"
												placeholder="" />
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
				url_add: "/apis/user/account?method=add",
				url_set: "/apis/user/account?method=set",
				url_get_obj: "/apis/user/account?method=get_obj",
				field: "user_id",
				query: {
					"user_id": 0
				},
				form: {
					//用户ID
					"user_id":0,
					//账户状态
					"state":0,
					//会员级别
					"vip":0,
					//管理员级别
					"gm":0,
					//商家级别
					"mc":0,
					//所在用户组
					"group_id":0,
					//所在管理组
					"admin_id":0,
					//推荐人
					"referee_id":0,
					//管理费
					"service_fee":0,
					//上次登录时间
					"login_time": '',
					//邀请注册码
					"invite_code": '',
					//手机号码
					"phone": '',
					//手机认证
					"phone_state":0,
					//用户名
					"username": '',
					//昵称
					"nickname": '',
					//邮箱
					"email": '',
					//邮箱认证
					"email_state":0,
					//上次登录IP
					"login_ip": '',
					//个性签名
					"signature": '',
					//头像地址
					"avatar": '',
					//好友
					"friends": '',
					//钱包地址
					"wallet_address": '',
				},
				// 账户状态
				'arr_state':["","可用","异常","已冻结","已注销"],
				// 所在用户组
				'list_group':[],
				// 所在管理组
				'list_admin':[],
				// 推荐人
				'list_account':[],
				// 手机认证
				'arr_phone_state':["未认证","审核中","已认证"],
				// 邮箱认证
				'arr_email_state':["未认证","审核中","已认证"],
			}
		},
		methods: {
			/**
			 * 获取所在用户组
			 * @param {query} 查询条件
			 */
			get_group(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "group_id,name"
					};
				}
				this.$get('~/apis/user/group?size=0', query, function(json) {
					if (json.result) {
						_this.list_group.clear();
						_this.list_group.addList(json.result.list)
					}
				});
			},
			/**
			 * 获取所在管理组
			 * @param {query} 查询条件
			 */
			get_admin(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "admin_id,name"
					};
				}
				this.$get('~/apis/user/admin?size=0', query, function(json) {
					if (json.result) {
						_this.list_admin.clear();
						_this.list_admin.addList(json.result.list)
					}
				});
			},
			/**
			 * 获取推荐人
			 * @param {query} 查询条件
			 */
			get_account(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "user_id,nickname"
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
			// 获取所在用户组
			this.get_group();
			// 获取所在管理组
			this.get_admin();
			// 获取推荐人
			this.get_account();
		}
	}
</script>

<style>
</style>
