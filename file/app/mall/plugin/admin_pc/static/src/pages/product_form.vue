<template>
	<main id="mall_product_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-mm-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>{{ form[field] ? '修改' : '创建' }}商品信息</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<dt>是否启用</dt>
										<dd>
											<mm_switch v-model="form.available" />
										</dd>
										<dt>状态</dt>
										<dd>
											<mm_select v-model="form.state" :options="$to_kv(arr_state)" />
										</dd>
										<dt>产品分类</dt>
										<dd>
											<mm_select v-model="form.type_id" :options="$to_kv(list_product_type, 'type_id', 'name', 0)" />
										</dd>
										<dt>频道</dt>
										<dd>
											<mm_select v-model="form.channel_id" :options="$to_kv(list_product_channel, 'channel_id', 'name', 0)" />
										</dd>
										<dt>店铺</dt>
										<dd>
											<mm_select v-model="form.shop_id" :options="$to_kv(list_shop, 'shop_id', 'name', 0)" />
										</dd>
										<dt>分组</dt>
										<dd>
											<mm_select v-model="form.group_id" :options="$to_kv(list_product_group, 'group_id', 'name', 0)" />
										</dd>
										<dt>所属城市</dt>
										<dd>
											<mm_select v-model="form.city_id" :options="$to_kv(list_address_city, 'city_id', 'name', 0)" />
										</dd>
										<dt>热度</dt>
										<dd>
											<mm_number v-model="form.hot" :min="0" :max="1000000000" />
										</dd>
										<dt>点赞次数</dt>
										<dd>
											<mm_number v-model="form.praise" :min="0" :max="1000000000" />
										</dd>
										<dt>销量</dt>
										<dd>
											<mm_number v-model="form.sales" :min="0" :max="1000000000" />
										</dd>
										<dt>卖价</dt>
										<dd>
											<mm_number v-model="form.price" :min="1" :max="0" />
										</dd>
										<dt>原价</dt>
										<dd>
											<mm_number v-model="form.price_old" :min="1" :max="0" />
										</dd>
										<dt>标题</dt>
										<dd>
											<mm_input v-model="form.title" :minlength="0" :maxlength="125" placeholder="用于产品和html的&#60;title&#62;标签中" />
										</dd>
										<dt>关键词</dt>
										<dd>
											<mm_input v-model="form.keywords" :minlength="0" :maxlength="125" placeholder="引擎收录" />
										</dd>
										<dt>描述</dt>
										<dd>
											<mm_input v-model="form.description" :minlength="0" :maxlength="255" placeholder="用于产品提纲和搜索引擎收录" />
										</dd>
										<dt>标签</dt>
										<dd>
											<mm_input v-model="form.tag" :minlength="0" :maxlength="255" placeholder="用于标注产品所属相关内容，多个标签用空格隔开" />
										</dd>
										<dt>封面图</dt>
										<dd>
											<mm_upload_img width="10rem" height="10rem" name="img" type="text" v-model="form.img" />
										</dd>
										<dt>正文</dt>
										<dd>
											<mm_rich v-model="form.content"></mm_rich>
										</dd>
										<dt>收藏者</dt>
										<dd>
											<mm_textarea v-model="form.collecter" type="text" placeholder="多个收藏者用”,“分隔"></mm_textarea>
										</dd>
										<dt>品牌</dt>
										<dd>
											<mm_input v-model="form.brand" :minlength="0" :maxlength="18" placeholder="商品的品牌" />
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
				url: "/apis/mall/product?",
				url_get_obj: "/apis/mall/product?method=get_obj",
				field: "product_id",
				query: {
					"product_id": 0
				},
				form: {
					"product_id": 0,
					"available": 0,
					"state": 0,
					"type_id": 0,
					"channel_id": 0,
					"shop_id": 0,
					"group_id": 0,
					"city_id": 0,
					"hot": 0,
					"praise": 0,
					"sales": 0,
					"price": 0,
					"price_old": 0,
					"title": '',
					"keywords": '',
					"description": '',
					"tag": '',
					"img": '',
					"content": '',
					"collecter": '',
					"brand": '',
				},
				// 是否启用
				'arr_available':["否","是"],
				// 状态
				'arr_state':["","出售中","预售中","已下架","已删除","已违规"],
				// 产品分类
				'list_product_type':[],
				// 频道
				'list_product_channel':[],
				// 店铺
				'list_shop':[],
				// 分组
				'list_product_group':[],
				// 所属城市
				'list_address_city':[],
			}
		},
		methods: {
			/**
			 * 获取产品分类
			 * @param {query} 查询条件
			 */
			get_product_type(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "type_id,name"
					};
				}
				this.$get('~/apis/mall/product_type?size=0', query, function(json) {
					if (json.result) {
						_this.list_product_type.clear();
						_this.list_product_type.addList(json.result.list)
					}
				});
			},
			/**
			 * 获取频道
			 * @param {query} 查询条件
			 */
			get_product_channel(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "channel_id,name"
					};
				}
				this.$get('~/apis/mall/product_channel?size=0', query, function(json) {
					if (json.result) {
						_this.list_product_channel.clear();
						_this.list_product_channel.addList(json.result.list)
					}
				});
			},
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
			/**
			 * 获取分组
			 * @param {query} 查询条件
			 */
			get_product_group(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "group_id,name"
					};
				}
				this.$get('~/apis/mall/product_group?size=0', query, function(json) {
					if (json.result) {
						_this.list_product_group.clear();
						_this.list_product_group.addList(json.result.list)
					}
				});
			},
			/**
			 * 获取所属城市
			 * @param {query} 查询条件
			 */
			get_address_city(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "city_id,name"
					};
				}
				this.$get('~/apis/sys/address_city?size=0', query, function(json) {
					if (json.result) {
						_this.list_address_city.clear();
						_this.list_address_city.addList(json.result.list)
					}
				});
			},
		},
		created() {
			// 获取产品分类
			this.get_product_type();
			// 获取频道
			this.get_product_channel();
			// 获取店铺
			this.get_shop();
			// 获取分组
			this.get_product_group();
			// 获取所属城市
			this.get_address_city();
		}
	}
</script>

<style>
</style>
