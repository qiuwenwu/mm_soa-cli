<template>
	<main id="user_admin_form">
		<mm_grid>
			<mm_col width="33">
				<mm_form class="card">
					<div class="head arrow">
						<h5>{{ form[field] ? '修改' : '创建' }}管理组</h5>
					</div>
					<div class="body">
						<dl>
							<dt>上级</dt>
							<dd>
								<mm_select v-model="form.father_id" :options="$to_kv(list_admin, 'admin_id', 'name')" />
							</dd>
							<dt class="required">名称</dt>
							<dd>
								<mm_input v-model="form.name" :minlength="0" :maxlength="0" placeholder=""
								 :required="true" />
							</dd>
							<dt>部门</dt>
							<dd>
								<mm_input v-model="form.department" :minlength="0" :maxlength="0" placeholder="用于区分管理组织结构" />
							</dd>
							<dt>描述</dt>
							<dd>
								<mm_input v-model="form.description" :minlength="0" :maxlength="0" placeholder="描述该用户组的特点或权限范围" />
							</dd>
							<dt>图标</dt>
							<dd>
								<mm_upload_img width="10rem" height="10rem" name="icon" type="text" v-model="form.icon" />
							</dd>
						</dl>
					</div>
					<div class="foot">
						<div class="mm_group">
							<button class="btn_default" type="button" @click="cancel">取消</button>
							<button class="btn_primary" type="button" @click="submit()">提交</button>
						</div>
					</div>
				</mm_form>
			</mm_col>
		</mm_grid>
	</main>
</template>


<script>
	import mixin from '/src/mixins/page.js';

	export default {
		mixins: [mixin],
		components: {},
		data() {
			return {
				url_submit: "/apis/user/admin?",
				url_get_obj: "/apis/user/admin?method=get_obj",
				field: "admin_id",
				query: {
					"admin_id": 0
				},
				form: {
					"admin_id": 0,
					"father_id": 0,
					"name": '',
					"department": '',
					"description": '',
					"icon": '',
				},
				// 上级
				'list_admin': [ ],
			}
		},
		methods: {
			/**
			 * 获取上级
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
						_this.list_admin .clear();
						_this.list_admin .addList(json.result.list)
					}
				});
			},
		},
		created() {
			// 获取上级
			this.get_admin();
		}
	}
</script>

<style>
</style>
