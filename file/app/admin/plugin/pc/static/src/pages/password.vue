<template>
	<main id="user_account_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-mm-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>修改密码</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<dt>新密码</dt>
										<dd>
											<control_input type="password" v-model="form.password" :minlength="0" :maxlength="16" placeholder="" />
										</dd>
										<dt>确认密码</dt>
										<dd>
											<control_input type="password" v-model="form.confirm_password" :minlength="0" :maxlength="16" placeholder="" />
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
				url_submit: "/api/user/password?method=submit",
				field: "user_id",
				query: {},
				form: {
					"password": '',
					"confirm_password": ''
				}
			}
		},
		methods: {
			get_form(){
				var _this = this;
				this.$get(this.url_get_obj, null, function(res){
					if(res.result && res.result.obj){
						$.push(_this.form, res.result.obj);
					}
				});
			},
			submit_before(param){
				param.password = param.password.md5();
				param.confirm_password = param.confirm_password.md5();
				return param;
			},
			submit_after(res, status){
				this.$router.push('/sign_in')
			}
		},
		created() {
			this.get_form();
		}
	}
</script>

<style>
</style>