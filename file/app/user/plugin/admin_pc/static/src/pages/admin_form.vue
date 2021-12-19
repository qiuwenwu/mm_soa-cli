<template>
	<main id="user_admin_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-mm-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>{{ form[field] ? '修改' : '创建' }}管理组</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<dt>分类</dt>
										<dd>
											<control_input v-model="form.type" :minlength="0" :maxlength="12" placeholder="用于区分用户组使用范围" />
										</dd>
										<dt class="required">管理组名称</dt>
										<dd>
											<control_input v-model="form.name" :minlength="0" :maxlength="16" placeholder=""
											 :required="true" />
										</dd>
										<dt>描述</dt>
										<dd>
											<control_input v-model="form.description" :minlength="0" :maxlength="255" placeholder="描述该用户组的特点或权限范围" />
										</dd>
										<dt>图标</dt>
										<dd>
											<mm_upload_img width="10rem" height="10rem" name="icon" type="text" v-model="form.icon" />
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
				url_add: "/apis/user/admin?method=add",
				url_set: "/apis/user/admin?method=set",
				url_get_obj: "/apis/user/admin?method=get_obj",
				field: "admin_id",
				query: {
					"admin_id": 0
				},
				form: {
					"admin_id": 0,
					"type": '',
					"name": '',
					"description": '',
					"icon": '',
				},
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
