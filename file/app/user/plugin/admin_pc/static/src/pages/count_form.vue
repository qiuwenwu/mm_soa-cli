<template>
	<main id="user_count_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-mm-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>{{ form[field] ? '修改' : '创建' }}用户统计</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<dt>等级</dt>
										<dd>
											<control_number v-model="form.level" :min="0" :max="1000" />
										</dd>
										<dt>IQ智商</dt>
										<dd>
											<control_number v-model="form.iq" :min="80" :max="200" />
										</dd>
										<dt>信用度</dt>
										<dd>
											<control_number v-model="form.credit" :min="0" :max="2147483647" />
										</dd>
										<dt>积分</dt>
										<dd>
											<control_number v-model="form.credit_points" :min="0" :max="2147483647" />
										</dd>
										<dt>经验值</dt>
										<dd>
											<control_number v-model="form.exp" :min="0" :max="2147483647" />
										</dd>
										<dt>拓展积分1</dt>
										<dd>
											<control_number v-model="form.extcredits1" :min="0" :max="2147483647" />
										</dd>
										<dt>拓展积分2</dt>
										<dd>
											<control_number v-model="form.extcredits2" :min="0" :max="2147483647" />
										</dd>
										<dt>拓展积分3</dt>
										<dd>
											<control_number v-model="form.extcredits3" :min="0" :max="2147483647" />
										</dd>
										<dt>拓展积分4</dt>
										<dd>
											<control_number v-model="form.extcredits4" :min="0" :max="2147483647" />
										</dd>
										<dt>拓展积分5</dt>
										<dd>
											<control_number v-model="form.extcredits5" :min="0" :max="2147483647" />
										</dd>
										<dt>拓展积分6</dt>
										<dd>
											<control_number v-model="form.extcredits6" :min="0" :max="2147483647" />
										</dd>
										<dt>拓展积分7</dt>
										<dd>
											<control_number v-model="form.extcredits7" :min="0" :max="2147483647" />
										</dd>
										<dt>拓展积分8</dt>
										<dd>
											<control_number v-model="form.extcredits8" :min="0" :max="2147483647" />
										</dd>
										<dt>钱</dt>
										<dd>
											<control_number v-model="form.money" :min="0" :max="0" />
										</dd>
										<dt>货币</dt>
										<dd>
											<control_number v-model="form.coin" :min="0" :max="0" />
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
				url_add: "/apis/user/count?method=add",
				url_set: "/apis/user/count?method=set",
				url_get_obj: "/apis/user/count?method=get_obj",
				field: "user_id",
				query: {
					"user_id": 0
				},
				form: {
					"user_id": 0,
					"level": 0,
					"iq": 0,
					"credit": 0,
					"credit_points": 0,
					"exp": 0,
					"extcredits1": 0,
					"extcredits2": 0,
					"extcredits3": 0,
					"extcredits4": 0,
					"extcredits5": 0,
					"extcredits6": 0,
					"extcredits7": 0,
					"extcredits8": 0,
					"money": 0,
					"coin": 0,
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
