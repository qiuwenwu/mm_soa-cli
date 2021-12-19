<template>
	<main id="user_vip_rule_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-mm-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>{{ form[field] ? '修改' : '创建' }}</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<dt>会员级别</dt>
										<dd>
											<control_number v-model="form.lv"
												:min="0"
												:max="9" />
										</dd>
										<dt>是否启用</dt>
										<dd>
											<control_switch v-model="form.available" />
										</dd>
										<dt>会员名称</dt>
										<dd>
											<control_input v-model="form.name" :minlength="0"
												:maxlength="32"
												placeholder="" />
										</dd>
										<dt>会员介绍</dt>
										<dd>
											<control_input v-model="form.info" :minlength="0"
												:maxlength="255"
												placeholder="" />
										</dd>
										<dt>个人消费</dt>
										<dd>
											<control_number v-model="form.up_product"
												:min="0"
												:max="0" />
										</dd>
										<dt>邀请人数</dt>
										<dd>
											<control_number v-model="form.invite_people"
												:min="0"
												:max="2147483647" />
										</dd>
										<dt>团队业绩</dt>
										<dd>
											<control_number v-model="form.achievement"
												:min="0"
												:max="0" />
										</dd>
										<dt>团队奖励</dt>
										<dd>
											<control_number v-model="form.team_prize"
												:min="0"
												:max="0" />
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
				url_add: "/apis/user/vip_rule?method=add",
				url_set: "/apis/user/vip_rule?method=set",
				url_get_obj: "/apis/user/vip_rule?method=get_obj",
				field: "vip_id",
				query: {
					"vip_id": 0
				},
				form: {
					"vip_id": 0,
					"lv": 0,
					"available": 0,
					"name": '',
					"info": '',
					"up_product": 0,
					"invite_people": 0,
					"achievement": 0,
					"team_prize": 0,
				},
				// 是否启用
				'arr_available': $ {
					@JSON.stringify(v.value)
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
