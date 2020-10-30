<template>
	<main id="sys_config_form">
		<mm_grid>
			<mm_col width="33">
				<mm_form class="card">
					<div class="head arrow">
						<h5>{{ form[field] ? '修改' : '创建' }}系统配置</h5>
					</div>
					<div class="body">
						<dl>
							<dt class="required">变量名</dt>
							<dd>
								<mm_input v-model="form.name" :minlength="0" :maxlength="0" placeholder=""
								 :required="true" />
							</dd>
							<dt class="required">数据类型</dt>
							<dd>
								<mm_input v-model="form.type" :minlength="0" :maxlength="0" placeholder="string文本型 / number数字型 / boolean布尔型"
								 :required="true" />
							</dd>
							<dt>变量标题</dt>
							<dd>
								<mm_input v-model="form.title" :minlength="0" :maxlength="0" placeholder="可以用中文名" />
							</dd>
							<dt>变量值</dt>
							<dd>
								<mm_input v-model="form.value" :minlength="0" :maxlength="0" placeholder="" />
							</dd>
							<dt>变量描述</dt>
							<dd>
								<mm_input v-model="form.description" :minlength="0" :maxlength="0" placeholder="描述该变量的作用" />
							</dd>
							<dt>数据模型</dt>
							<dd>
								<mm_textarea v-model="form.model" type="text" placeholder="json格式，用于单选 / 多选模式" />
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
				url_submit: "/apis/sys/config?",
				url_get_obj: "/apis/sys/config?method=get_obj",
				field: "config_id",
				query: {
					"config_id": 0
				},
				form: {
					"config_id": 0,
					"name": '',
					"type": '',
					"title": '',
					"value": '',
					"description": '',
					"model": '',
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
