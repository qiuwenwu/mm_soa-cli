<template>
	<main id="user_account_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-mm-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>基本资料</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<dt>昵称</dt>
										<dd>
											<control_input v-model="form.nickname" :minlength="0" :maxlength="16" placeholder="" />
										</dd>
										<dt>头像地址</dt>
										<dd>
											<mm_upload_img width="10rem" height="10rem" name="avatar" type="text" v-model="form.avatar" />
										</dd>
										<dt>手机号码</dt>
										<dd>
											<control_input v-model="form.phone" :minlength="0" :maxlength="11" placeholder="用户的手机号码，用于找回密码时或登录时" />
										</dd>
										<dt>邮箱</dt>
										<dd>
											<control_input v-model="form.email" :minlength="0" :maxlength="64" placeholder="用户的邮箱，用于找回密码时或登录时" />
										</dd>
										<dt>个性签名</dt>
										<dd>
											<control_input v-model="form.signature" :minlength="0" :maxlength="255" placeholder="" />
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
				url_submit: "/apis/user/account_base?method=submit",
				url_get_obj: "/apis/user/account_base?method=get_obj",
				field: "user_id",
				query: {},
				form: {
					"phone": '',
					"nickname": '',
					"email": '',
					"signature": '',
					"avatar": ''
				}
			}
		},
		methods: {
			get_form(){
				var _this = this;
				this.$get(this.url_get_obj, null, function(res){
					if(res.result && res.result.obj){
						console.log(_this.form, res.result.obj);
						$.push(_this.form, res.result.obj);
					}
				});
			}
		},
		created() {
			this.get_form();
		}
	}
</script>

<style>
</style>
