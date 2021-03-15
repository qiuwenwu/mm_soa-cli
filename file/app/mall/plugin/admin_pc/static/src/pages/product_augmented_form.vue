<template>
	<main id="mall_product_augmented_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-mm-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>{{ form[field] ? '修改' : '创建' }}附加商品</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<dt>产品名称</dt>
										<dd>
											<mm_input v-model="form.name" :minlength="0" :maxlength="255" placeholder="" />
										</dd>
										<dt>产品分组</dt>
										<dd>
											<mm_input v-model="form.group" :minlength="0" :maxlength="32" placeholder="" />
										</dd>
										<dt>附加价格</dt>
										<dd>
											<mm_number v-model="form.price" :min="0" :max="0" />
										</dd>
										<dt>店铺ID</dt>
										<dd>
											<mm_input v-model="form.shop_id" :minlength="0" :maxlength="0" placeholder="" />
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
				url: "/apis/mall/product_augmented?",
				url_get_obj: "/apis/mall/product_augmented?method=get_obj",
				field: "augmented_id",
				query: {
					"augmented_id": 0
				},
				form: {
					"augmented_id": 0,
					"name": '',
					"group": '',
					"price": 0,
					"shop_id": 0,
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
