<template>
	<main id="sys_app_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-mm-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>{{ form[field] ? '修改' : '创建' }}应用信息</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<dt>是否可用</dt>
										<dd>
											<control_switch v-model="form.available" />
										</dd>
										<dt>加解密方式</dt>
										<dd>
											<control_select v-model="form.encrypt" :options="$to_kv(arr_encrypt)" />
										</dd>
										<dt>每日允许请求次数</dt>
										<dd>
											<control_number v-model="form.times_allow" :min="0" :max="32767" />
										</dd>
										<dt>今日请求次数</dt>
										<dd>
											<control_number v-model="form.times_today" :min="0" :max="32767" />
										</dd>
										<dt>有效期时长</dt>
										<dd>
											<control_number v-model="form.max_age" :min="0" :max="32767" />
										</dd>
										<dt>持有者</dt>
										<dd>
											<control_select v-model="form.user_id" :options="$to_kv(list_account, 'user_id', 'nickname', 0)" />
										</dd>
										<dt>请求总次数</dt>
										<dd>
											<control_number v-model="form.times_count" :min="0" :max="2147483647" />
										</dd>
										<dt class="required">应用名称</dt>
										<dd>
											<control_input v-model="form.name" :minlength="0" :maxlength="16" placeholder="用于用户登陆时显示授权应用"
											 :required="true" />
										</dd>
										<dt class="required">应用ID</dt>
										<dd>
											<control_input v-model="form.appid" :minlength="0" :maxlength="16" placeholder="用于应用授权访问时的账号"
											 :required="true" />
										</dd>
										<dt>消息访问令牌</dt>
										<dd>
											<control_input v-model="form.token" :minlength="0" :maxlength="32" placeholder="用于访问应用时验证身份" />
										</dd>
										<dt>消息加密钥匙</dt>
										<dd>
											<control_input v-model="form.encoding_aes_key" :minlength="0" :maxlength="0" placeholder="用于给应用发送消息时的加密钥匙" />
										</dd>
										<dt class="required">应用密钥</dt>
										<dd>
											<control_input v-model="form.appsecret" :minlength="0" :maxlength="64" placeholder="用于应用授权访问时的密码"
											 :required="true" />
										</dd>
										<dt>应用图标</dt>
										<dd>
											<mm_upload_img width="10rem" height="10rem" name="icon" type="text" v-model="form.icon" />
										</dd>
										<dt>消息访问地址</dt>
										<dd>
											<control_input v-model="form.url" :minlength="0" :maxlength="255" placeholder="当接收到用户所发消息后回访该地址" />
										</dd>
										<dt>访问绑定IP</dt>
										<dd>
											<mm_textarea v-model="form.bind_ip" type="text" placeholder="网站授权时确认重定向网址为已授权IP"></mm_textarea>
										</dd>
										<dt>允许使用的接口</dt>
										<dd>
											<mm_textarea v-model="form.scope" type="text" placeholder="多个接口用”，“分隔"></mm_textarea>
										</dd>
										<dt>不允许使用的接口</dt>
										<dd>
											<mm_textarea v-model="form.scope_not" type="text" placeholder="“多个接口用”，“分隔"></mm_textarea>
										</dd>
										<dt>授权的用户</dt>
										<dd>
											<mm_textarea v-model="form.users" type="text" placeholder=""></mm_textarea>
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
				url: "/apis/sys/app?",
				url_get_obj: "/apis/sys/app?method=get_obj",
				field: "app_id",
				query: {
					"app_id": 0
				},
				form: {
					"app_id": 0,
					"available": 0,
					"encrypt": 0,
					"times_allow": 0,
					"times_today": 0,
					"max_age": 0,
					"user_id": 0,
					"times_count": 0,
					"name": '',
					"appid": '',
					"token": '',
					"encoding_aes_key": '',
					"appsecret": '',
					"icon": '',
					"url": '',
					"bind_ip": '',
					"scope": '',
					"scope_not": '',
					"users": '',
				},
				// 是否可用
				'arr_available':["否","是"],
				// 加解密方式
				'arr_encrypt':["","明文模式","兼容模式","安全模式"],
				// 持有者
				'list_account':[],
			}
		},
		methods: {
			/**
			 * 获取持有者
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
			// 获取持有者
			this.get_account();
		}
	}
</script>

<style>
</style>
