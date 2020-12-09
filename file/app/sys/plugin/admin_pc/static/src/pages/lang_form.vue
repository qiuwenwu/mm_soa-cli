<template>
	<main id="sys_lang_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col>
						<mm_card>
							<div class="card_head arrow">
								<h5>{{ form[field] ? '修改' : '创建' }}系统语言</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<dt>日文</dt>
										<dd>
											<mm_input v-model="form.ja" :minlength="0" :maxlength="255" placeholder="" />
										</dd>
										<dt class="required">键名</dt>
										<dd>
											<mm_input v-model="form.key" :minlength="0" :maxlength="16" placeholder="用于获取对应语言值"
											 :required="true" />
										</dd>
										<dt>韩文</dt>
										<dd>
											<mm_input v-model="form.ko" :minlength="0" :maxlength="255" placeholder="" />
										</dd>
										<dt>语言ID</dt>
										<dd>
											<mm_input v-model="form.lang_id" :minlength="0" :maxlength="0" placeholder="" />
										</dd>
										<dt>简体中文</dt>
										<dd>
											<mm_input v-model="form.zh_cn" :minlength="0" :maxlength="255" placeholder="" />
										</dd>
										<dt>繁体中文</dt>
										<dd>
											<mm_input v-model="form.zh_tw" :minlength="0" :maxlength="255" placeholder="" />
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
				url_submit: "/apis/sys/lang?",
				url_get_obj: "/apis/sys/lang?method=get_obj",
				field: "lang_id",
				query: {
					"lang_id": 0
				},
				form: {
					"en": '',
					"ja": '',
					"key": '',
					"ko": '',
					"lang_id": 0,
					"zh_cn": '',
					"zh_tw": '',
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
