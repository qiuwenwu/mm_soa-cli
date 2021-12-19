<template>
	<main id="user_admin_log_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-mm-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>{{ form[field] ? '修改' : '创建' }}管理日志</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<dt>管理员</dt>
										<dd>
											<control_select type="list" v-model="form.user_id" :options="$to_kv(list_account, 'user_id', 'phone')" @change="search()" />
										</dd>
										<dt class="required">管理员名字</dt>
										<dd>
											<control_input v-model="form.username" :minlength="0" :maxlength="30" placeholder=""
											 :required="true" />
										</dd>
										<dt class="required">操作接口</dt>
										<dd>
											<control_input v-model="form.url" :minlength="0" :maxlength="255" placeholder=""
											 :required="true" />
										</dd>
										<dt class="required">日志标题</dt>
										<dd>
											<control_input v-model="form.title" :minlength="0" :maxlength="100" placeholder=""
											 :required="true" />
										</dd>
										<dt class="required">内容</dt>
										<dd>
											<control_rich v-model="form.content"></control_rich>
										</dd>
										<dt class="required">IP</dt>
										<dd>
											<control_input v-model="form.ip" :minlength="0" :maxlength="50" placeholder=""
											 :required="true" />
										</dd>
										<dt class="required">User-Agent</dt>
										<dd>
											<control_input v-model="form.useragent" :minlength="0" :maxlength="255" placeholder=""
											 :required="true" />
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
				url_add: "/apis/user/admin_log?method=add",
				url_set: "/apis/user/admin_log?method=set",
				url_get_obj: "/apis/user/admin_log?method=get_obj",
				field: "log_id",
				query: {
					"log_id": 0
				},
				form: {
					"log_id": 0,
					"user_id": 0,
					"username": '',
					"url": '',
					"title": '',
					"content": '',
					"ip": '',
					"useragent": '',
				},
				// 管理员
				'list_account':[],
			}
		},
		methods: {
			/**
			 * 获取管理员
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
			// 获取管理员
			this.get_account();
		}
	}
</script>

<style>
</style>
