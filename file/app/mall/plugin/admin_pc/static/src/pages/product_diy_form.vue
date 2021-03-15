<template>
	<main id="mall_product_diy_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-mm-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>{{ form[field] ? '修改' : '创建' }}商品自定义分类</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<dt>分类描述</dt>
										<dd>
											<mm_input v-model="form.description" :minlength="0" :maxlength="255" placeholder="" />
										</dd>
										<dt>分类图标</dt>
										<dd>
											<mm_upload_img width="10rem" height="10rem" name="icon" type="text" v-model="form.icon" />
										</dd>
										<dt>分类名称</dt>
										<dd>
											<mm_input v-model="form.name" :minlength="0" :maxlength="16" placeholder="" />
										</dd>
										<dt>店铺</dt>
										<dd>
											<mm_select v-model="form.shop_id" :options="$to_kv(list_shop, 'shop_id', 'name')" />
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
				url_submit: "/apis/mall/product_diy?",
				url_get_obj: "/apis/mall/product_diy?method=get_obj",
				field: "type_id",
				query: {
					"type_id": 0
				},
				form: {
					"description": '',
					"icon": '',
					"name": '',
					"shop_id": 0,
					"type_id": 0,
				},
				// 店铺
				'list_shop': [ ],
			}
		},
		methods: {
			/**
			 * 获取店铺
			 * @param {query} 查询条件
			 */
			get_shop(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "shop_id,name"
					};
				}
				this.$get('~/apis/mall/shop?size=0', query, function(json) {
					if (json.result) {
						_this.list_shop.clear();
						_this.list_shop.addList(json.result.list)
					}
				});
			},
		},
		created() {
			// 获取店铺
			this.get_shop();
		}
	}
</script>

<style>
</style>
