<template>
	<main id="user_card_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-mm-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>{{ form[field] ? '修改' : '创建' }}卡券包</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<dt>用户ID</dt>
										<dd>
											<control_input v-model="form.user_id" :minlength="0" :maxlength="0" placeholder="" />
										</dd>
										<dt>名称</dt>
										<dd>
											<control_input v-model="form.name" :minlength="0" :maxlength="32" placeholder="" />
										</dd>
										<dt>商城ID</dt>
										<dd>
											<control_input v-model="form.shop_id" :minlength="0" :maxlength="0" placeholder="" />
										</dd>
										<dt>图标</dt>
										<dd>
											<mm_upload_img width="10rem" height="10rem" name="icon" type="text" v-model="form.icon" />
										</dd>
										<dt>条件金额</dt>
										<dd>
											<control_number v-model="form.price_factor" :min="0" :max="0" />
										</dd>
										<dt>减免金额</dt>
										<dd>
											<control_number v-model="form.price_reduction" :min="0" :max="0" />
										</dd>
										<dt>状态</dt>
										<dd>
											<control_select v-model="form.state" :options="$to_kv(arr_state)" />
										</dd>
										<dt>控制时间</dt>
										<dd>
											<mm_time v-model="form.time_control" type="datetime-local" />
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
				url_add: "/apis/user/card?method=add",
				url_set: "/apis/user/card?method=set",
				url_get_obj: "/apis/user/card?method=get_obj",
				field: "card_id",
				query: {
					"card_id": 0
				},
				form: {
					"card_id": 0,
					"user_id": 0,
					"name": '',
					"shop_id": 0,
					"icon": '',
					"price_factor": 0,
					"price_reduction": 0,
					"state": 0,
					"time_control": '',
				},
				// 状态
				'arr_state':["","未使用","已使用","已过期","有异常"],
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
