<template>
	<main id="sys_message_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-mm-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>{{ form[field] ? '修改' : '创建' }}系统消息</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<dt>留言标题</dt>
										<dd>
											<control_input v-model="form.title" :minlength="0" :maxlength="255" placeholder="" />
										</dd>
										<dt>留言内容</dt>
										<dd>
											<control_textarea v-model="form.note" type="text" placeholder=""></control_textarea>
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
				url_add: "/apis/sys/message?method=add",
				url_set: "/apis/sys/message?method=set",
				url_get_obj: "/apis/sys/message?method=get_obj",
				field: "message_id",
				query: {
					"message_id": 0
				},
				form: {
					"message_id": 0,
					"title": '',
					"note": '',
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
