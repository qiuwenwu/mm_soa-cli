<template>
	<main id="user_group_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-mm-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>{{ form[field] ? '修改' : '创建' }}会员组表</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<dt>组名</dt>
										<dd>
											<control_input v-model="form.name" :minlength="0" :maxlength="50" placeholder="" />
										</dd>
										<dt>权限节点</dt>
										<dd>
											<control_textarea v-model="form.rules" type="text" placeholder=""></control_textarea>
										</dd>
										<dt>添加时间</dt>
										<dd>
											<control_number v-model="form.createtime" :min="0" :max="2147483647" />
										</dd>
										<dt>更新时间</dt>
										<dd>
											<control_number v-model="form.updatetime" :min="0" :max="2147483647" />
										</dd>
										<dt>状态</dt>
										<dd>
											<control_number v-model="form.status" :min="0" :max="0" />
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
				url_add: "/apis/user/group?method=add",
				url_set: "/apis/user/group?method=set",
				url_get_obj: "/apis/user/group?method=get_obj",
				field: "group_id",
				query: {
					"group_id": 0
				},
				form: {
					"group_id": 0,
					"name": '',
					"rules": '',
					"createtime": 0,
					"updatetime": 0,
					"status": 0,
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
