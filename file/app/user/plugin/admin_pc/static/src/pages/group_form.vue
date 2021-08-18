<template>
	<main id="user_group_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-mm-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>{{ form[field] ? '修改' : '创建' }}用户组</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<dt>等级划分</dt>
										<dd>
											<control_number v-model="form.level" :min="0" :max="1000" />
										</dd>
										<dt>下级用户组ID</dt>
										<dd>
											<control_input v-model="form.next_group_id" :minlength="0" :maxlength="0" placeholder="决定用户升级后所属用户组" />
										</dd>
										<dt>升级所需经验</dt>
										<dd>
											<control_number v-model="form.exp" :min="0" :max="2147483647" />
										</dd>
										<dt>折扣</dt>
										<dd>
											<control_number v-model="form.discount" :min="0" :max="0" />
										</dd>
										<dt>奖励比例</dt>
										<dd>
											<control_number v-model="form.bonus" :min="0" :max="0" />
										</dd>
										<dt>应用</dt>
										<dd>
											<control_input v-model="form.app" :minlength="0" :maxlength="12" placeholder="用于区分用户组使用范围，cms内容管理系统 / bbs社区 / mall商城" />
										</dd>
										<dt class="required">用户名称</dt>
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
				url_add: "/apis/user/group?method=add",
				url_set: "/apis/user/group?method=set",
				url_get_obj: "/apis/user/group?method=get_obj",
				field: "group_id",
				query: {
					"group_id": 0
				},
				form: {
					"group_id": 0,
					"level": 0,
					"next_group_id": 0,
					"exp": 0,
					"discount": 0,
					"bonus": 0,
					"app": '',
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
