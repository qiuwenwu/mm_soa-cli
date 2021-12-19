<template>
	<main id="user_power_form">
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
										<dt>管理组ID</dt>
										<dd>
											<control_input v-model="form.admin_id" :minlength="0" :maxlength="0" placeholder="" />
										</dd>
										<dt class="required">名称</dt>
										<dd>
											<control_input v-model="form.name" :minlength="0" :maxlength="16" placeholder=""
											 :required="true" />
										</dd>
										<dt>路由路径</dt>
										<dd>
											<control_input v-model="form.path" :minlength="0" :maxlength="255" placeholder="用来确定访问权限的路由路径" />
										</dd>
										<dt>方法</dt>
										<dd>
											<control_select v-model="form.method" :options="$to_kv(arr_method)" />
										</dd>
										<dt>添加权限人</dt>
										<dd>
											<control_textarea v-model="form.user_add" type="text" placeholder=""></control_textarea>
										</dd>
										<dt>修改权限人</dt>
										<dd>
											<control_textarea v-model="form.user_set" type="text" placeholder=""></control_textarea>
										</dd>
										<dt>删除权限人</dt>
										<dd>
											<control_textarea v-model="form.user_del" type="text" placeholder=""></control_textarea>
										</dd>
										<dt>查看权限人</dt>
										<dd>
											<control_textarea v-model="form.user_get" type="text" placeholder=""></control_textarea>
										</dd>
										<dt>修改可见字段</dt>
										<dd>
											<control_textarea v-model="form.field_set" type="text" placeholder=""></control_textarea>
										</dd>
										<dt>添加可见字段</dt>
										<dd>
											<control_textarea v-model="form.field_add" type="text" placeholder=""></control_textarea>
										</dd>
										<dt>删除可见字段</dt>
										<dd>
											<control_textarea v-model="form.field_del" type="text" placeholder=""></control_textarea>
										</dd>
										<dt>查询可见字段</dt>
										<dd>
											<control_textarea v-model="form.field_get" type="text" placeholder=""></control_textarea>
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
				url_add: "/apis/user/power?method=add",
				url_set: "/apis/user/power?method=set",
				url_get_obj: "/apis/user/power?method=get_obj",
				field: "power_id",
				query: {
					"power_id": 0
				},
				form: {
					"power_id": 0,
					"admin_id": 0,
					"name": '',
					"path": '',
					"method": '',
					"user_add": '',
					"user_set": '',
					"user_del": '',
					"user_get": '',
					"field_set": '',
					"field_add": '',
					"field_del": '',
					"field_get": '',
				},
				// 方法
				'arr_method':[{"name":"GET","value":"GET"},{"name":"POST","value":"POST"},{"name":"ALL","value":"ALL"}],
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
