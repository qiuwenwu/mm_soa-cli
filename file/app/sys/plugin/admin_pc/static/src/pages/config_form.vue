<template>
	<main id="sys_config_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-mm-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>{{ form[field] ? '修改' : '创建' }}系统配置</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<dt>变量名</dt>
										<dd>
											<control_input v-model="form.name" :minlength="0" :maxlength="32" placeholder="" />
										</dd>
										<dt>分组</dt>
										<dd>
											<control_input v-model="form.group" :minlength="0" :maxlength="32" placeholder="一般为默认组" />
										</dd>
										<dt class="required">数据类型</dt>
										<dd>
											<control_select v-model="form.type" :options="$to_kv(arr_type)" />
										</dd>
										<dt class="required">控件类型</dt>
										<dd>
											<control_select v-model="form.control" :options="$to_kv(arr_control)" />
										</dd>
										<dt>变量标题</dt>
										<dd>
											<control_input v-model="form.title" :minlength="0" :maxlength="32" placeholder="可以用中文名" />
										</dd>
										<dt>变量值</dt>
										<dd>
											<control_input v-model="form.value" :minlength="0" :maxlength="255" placeholder="" />
										</dd>
										<dt>变量描述</dt>
										<dd>
											<control_input v-model="form.description" :minlength="0" :maxlength="255" placeholder="描述该变量的作用" />
										</dd>
										<dt>数据模型</dt>
										<dd>
											<control_textarea v-model="form.model" type="text" placeholder="json格式，用于单选 / 多选模式"></control_textarea>
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
				url_add: "/apis/sys/config?method=add",
				url_set: "/apis/sys/config?method=set",
				url_get_obj: "/apis/sys/config?method=get_obj",
				field: "config_id",
				query: {
					"config_id": 0
				},
				form: {
					"config_id": 0,
					"name": '',
					"group": '',
					"type": '',
					"control": '',
					"title": '',
					"value": '',
					"description": '',
					"model": '',
				},
				// 数据类型
				'arr_type':[{"name":"文本型","value":"string"},{"name":"数字型","value":"number"},{"name":"布尔型","value":"boolean"}],
				// 控件类型
				'arr_control':[{"name":"输入框","value":"input"},{"name":"数字框","value":"number"},{"name":"选择框","value":"select"},{"name":"复选框","value":"checkbox"},{"name":"开关","value":"switch"},{"name":"多文本框","value":"textarea"},{"name":"单选框","value":"radio"}],
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
