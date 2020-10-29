<template>
	<main id="user_group_form">
		<mm_grid>
			<mm_col width="33">
				<mm_form class="card">
					<div class="head arrow">
						<h5>{{ form[field] ? '修改' : '创建' }}用户组</h5>
					</div>
					<div class="body">
						<dl>
							<dt>等级划分</dt>
							<dd>
								<mm_number v-model="form.level" :min="0" :max="1000" />
							</dd>
							<dt>下级用户组</dt>
							<dd>
								<mm_select v-model="form.next_group_id" :options="$to_kv(list_group, 'group_id', 'name')" />
							</dd>
							<dt>升级所需经验</dt>
							<dd>
								<mm_number v-model="form.exp" :min="0" :max="2147483647" />
							</dd>
							<dt>折扣</dt>
							<dd>
								<mm_number v-model="form.discount" :min="0" :max="0" />
							</dd>
							<dt>奖励比例</dt>
							<dd>
								<mm_number v-model="form.bonus" :min="0" :max="0" />
							</dd>
							<dt>应用</dt>
							<dd>
								<mm_input v-model="form.app" :minlength="0" :maxlength="0" placeholder="用于区分用户组使用范围，cms内容管理系统 / bbs社区 / mall商城" />
							</dd>
							<dt class="required">名称</dt>
							<dd>
								<mm_input v-model="form.name" :minlength="0" :maxlength="0" placeholder=""
								 :required="true" />
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
				url_submit: "/apis/user/group?",
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
				// 下级用户组
				'list_group': [ ],
			}
		},
		methods: {
			/**
			 * 获取下级用户组
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
						_this.list_group .clear();
						_this.list_group .addList(json.result.list)
					}
				});
			},
		},
		created() {
			// 获取下级用户组
			this.get_group();
		}
	}
</script>

<style>
</style>
