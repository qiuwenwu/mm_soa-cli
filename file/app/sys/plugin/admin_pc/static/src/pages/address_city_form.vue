<template>
	<main id="sys_address_city_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-mm-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>{{ form[field] ? '修改' : '创建' }}城市</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<dt>是否可见</dt>
										<dd>
											<control_number v-model="form.show" :min="0" :max="2" />
										</dd>
										<dt>所属省份ID</dt>
										<dd>
											<control_input v-model="form.province_id" :minlength="0" :maxlength="0" placeholder="" />
										</dd>
										<dt class="required">城市名称</dt>
										<dd>
											<control_input v-model="form.name" :minlength="0" :maxlength="16" placeholder=""
											 :required="true" />
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
				url_add: "/apis/sys/address_city?method=add",
				url_set: "/apis/sys/address_city?method=set",
				url_get_obj: "/apis/sys/address_city?method=get_obj",
				field: "city_id",
				query: {
					"city_id": 0
				},
				form: {
					"city_id": 0,
					"show": 0,
					"province_id": 0,
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
