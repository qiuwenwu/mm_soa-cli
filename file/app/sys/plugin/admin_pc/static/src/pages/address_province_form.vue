<template>
	<main id="sys_address_province_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-mm-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>{{ form[field] ? '修改' : '创建' }}省份</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<dt>是否可见</dt>
										<dd>
											<mm_select v-model="form.show" :options="$to_kv(arr_show)" />
										</dd>
										<dt class="required">省份名称</dt>
										<dd>
											<mm_input v-model="form.name" :minlength="0" :maxlength="16" placeholder=""
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
				url: "/apis/sys/address_province?",
				url_get_obj: "/apis/sys/address_province?method=get_obj",
				field: "province_id",
				query: {
					"province_id": 0
				},
				form: {
					"province_id": 0,
					"show": 0,
					"name": '',
				},
				// 是否可见
				'arr_show':["仅表单可见","表单和搜索可见","均可见"],
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
