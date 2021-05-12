<template>
	<main id="user_message_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-mm-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>{{ form[field] ? '修改' : '创建' }}用户留言</h5>
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
											<control_rich v-model="form.content"></control_rich>
										</dd>
										<dt>留言者手机</dt>
										<dd>
											<control_input v-model="form.phone" :minlength="0" :maxlength="11" placeholder="" />
										</dd>
										<dt>留言者邮箱</dt>
										<dd>
											<control_input v-model="form.email" :minlength="0" :maxlength="125" placeholder="" />
										</dd>
										<dt>留言者姓名</dt>
										<dd>
											<control_input v-model="form.name" :minlength="0" :maxlength="16" placeholder="" />
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
				url: "/apis/user/message?",
				url_get_obj: "/apis/user/message?method=get_obj",
				field: "message_id",
				query: {
					"message_id": 0
				},
				form: {
					"message_id": 0,
					"title": '',
					"content": '',
					"phone": '',
					"email": '',
					"name": '',
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
