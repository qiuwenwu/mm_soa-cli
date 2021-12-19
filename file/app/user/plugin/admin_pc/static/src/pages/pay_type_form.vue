<template>
	<main id="user_pay_type_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-mm-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>{{ form[field] ? '修改' : '创建' }}支付类型</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<dt>名称</dt>
										<dd>
											<control_input v-model="form.name" :minlength="0" :maxlength="32" placeholder="" />
										</dd>
										<dt>地址</dt>
										<dd>
											<control_input v-model="form.url" :minlength="0" :maxlength="255" placeholder="" />
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
				url_add: "/apis/user/pay_type?method=add",
				url_set: "/apis/user/pay_type?method=set",
				url_get_obj: "/apis/user/pay_type?method=get_obj",
				field: "type_id",
				query: {
					"type_id": 0
				},
				form: {
					"type_id": 0,
					"name": '',
					"url": '',
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
