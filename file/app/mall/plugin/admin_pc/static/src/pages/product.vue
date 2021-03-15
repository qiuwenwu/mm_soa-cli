<template>
	<main id="mall_product">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>商品信息</h5>
							</div>
							<div class="card_body">
								<mm_form class="mm_filter">
									<div class="title">
										<h5><span>筛选条件</span></h5>
									</div>
									<mm_list col="3">
										<mm_item>
											<mm_input v-model="query.keyword" title="关键词" desc="标题 / 关键词 / 描述 / 标签 / 正文"
											 @blur="search()" />
										</mm_item>
										<mm_item>
											<mm_select v-model="query.available" title="是否启用" :options="$to_kv(arr_available)" @change="search()" />
										</mm_item>
										<mm_item>
											<mm_select v-model="query.state" title="状态" :options="$to_kv(arr_state)" @change="search()" />
										</mm_item>
										<mm_item>
											<mm_select v-model="query.type_id" title="产品分类" :options="$to_kv(list_product_type, 'type_id', 'name')"
											 @change="search()" />
										</mm_item>
										<mm_item>
											<mm_select v-model="query.channel_id" title="频道" :options="$to_kv(list_product_channel, 'channel_id', 'name')"
											 @change="search()" />
										</mm_item>
										<mm_item>
											<mm_select v-model="query.shop_id" title="店铺" :options="$to_kv(list_shop, 'shop_id', 'name')"
											 @change="search()" />
										</mm_item>
										<mm_item>
											<mm_select v-model="query.group_id" title="分组" :options="$to_kv(list_product_group, 'group_id', 'name')"
											 @change="search()" />
										</mm_item>
										<mm_item>
											<mm_select v-model="query.city_id" title="所属城市" :options="$to_kv(list_address_city, 'city_id', 'name')"
											 @change="search()" />
										</mm_item>
										<mm_item>
											<mm_btn class="btn_primary-x" type="reset" @click.native="reset();search()">重置</mm_btn>
										</mm_item>
									</mm_list>
								</mm_form>
								<div class="mm_action">
									<h5><span>操作</span></h5>
									<div class="btns">
										<mm_btn class="btn_primary-x" url="./product_form?">添加</mm_btn>
										<mm_btn @click.native="show = true" class="btn_primary-x" v-bind:class="{ 'disabled': !selects }">批量修改</mm_btn>
									</div>
									<div class="btn_small">
										<mm_file class="btn_default-x" type="excel" :func="import_db" v-if="url_import"></mm_file>
										<mm_btn class="btn_default-x" @click.native="export_db()" v-if="url_export">导出</mm_btn>
									</div>
								</div>
								<mm_table type="2">
									<thead class="table-sm">
										<tr>
											<th class="th_selected"><input type="checkbox" :checked="select_state" @click="select_all()" /></th>
											<th class="th_id"><span>#</span></th>
											<th>
												<mm_reverse title="是否启用" v-model="query.orderby" field="available" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="状态" v-model="query.orderby" field="state" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="产品分类" v-model="query.orderby" field="type_id" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="排序" v-model="query.orderby" field="display" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="频道" v-model="query.orderby" field="channel_id" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="店铺" v-model="query.orderby" field="shop_id" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="分组" v-model="query.orderby" field="group_id" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="所属城市" v-model="query.orderby" field="city_id" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="热度" v-model="query.orderby" field="hot" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="点赞次数" v-model="query.orderby" field="praise" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="销量" v-model="query.orderby" field="sales" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="卖价" v-model="query.orderby" field="price" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="原价" v-model="query.orderby" field="price_old" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="创建时间" v-model="query.orderby" field="time_create" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="更新时间" v-model="query.orderby" field="time_update" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="标题" v-model="query.orderby" field="title" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="关键词" v-model="query.orderby" field="keywords" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="描述" v-model="query.orderby" field="description" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="标签" v-model="query.orderby" field="tag" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="品牌" v-model="query.orderby" field="brand" :func="search"></mm_reverse>
											</th>
											<th class="th_handle"><span>操作</span></th>
										</tr>
									</thead>
									<tbody>
										<!-- <draggable v-model="list" tag="tbody" @change="sort_change"> -->
										<tr v-for="(o, idx) in list" :key="idx" :class="{'active': select == idx}" @click="selected(idx)">
											<th class="th_selected"><input type="checkbox" :checked="select_has(o[field])" @click="select_change(o[field])" /></th>
											<td>{{ o[field] }}</td>
											<td>
												<mm_switch v-model="o.available" @click.native="set(o)" />
											</td>
											<td>
												<span v-bind:class="arr_color[o.state]">{{arr_state[o.state] }}</span>
											</td>
											<td>
												<span>{{ get_name(list_product_type, o.type_id, 'type_id', 'name') }}</span>
											</td>
											<td>
												<input class="input_display" v-model.number="o.display" @blur="set(o)" min="0" max="1000" />
											</td>
											<td>
												<span>{{ get_name(list_product_channel, o.channel_id, 'channel_id', 'name') }}</span>
											</td>
											<td>
												<span>{{ get_name(list_shop, o.shop_id, 'shop_id', 'name') }}</span>
											</td>
											<td>
												<span>{{ get_name(list_product_group, o.group_id, 'group_id', 'name') }}</span>
											</td>
											<td>
												<span>{{ get_name(list_address_city, o.city_id, 'city_id', 'name') }}</span>
											</td>
											<td>
												<span>{{ o.hot }}</span>
											</td>
											<td>
												<span>{{ o.praise }}</span>
											</td>
											<td>
												<span>{{ o.sales }}</span>
											</td>
											<td>
												<span>{{ o.price }}</span>
											</td>
											<td>
												<span>{{ o.price_old }}</span>
											</td>
											<td>
												<span>{{ $to_time(o.time_create, 'yyyy-MM-dd hh:mm') }}</span>
											</td>
											<td>
												<span>{{ $to_time(o.time_update, 'yyyy-MM-dd hh:mm') }}</span>
											</td>
											<td>
												<span>{{ o.title }}</span>
											</td>
											<td>
												<span>{{ o.keywords }}</span>
											</td>
											<td>
												<span>{{ o.description }}</span>
											</td>
											<td>
												<span>{{ o.tag }}</span>
											</td>
											<td>
												<span>{{ o.brand }}</span>
											</td>
											<td>
												<mm_btn class="btn_primary" :url="'./product_form?product_id=' + o[field]">修改</mm_btn>
												<mm_btn class="btn_warning" @click.native="del_show(o, field)">删除</mm_btn>
											</td>
										</tr>
									</tbody>
									<!-- </draggable> -->
								</mm_table>
							</div>
							<div class="card_foot">
								<div class="fl">
									<mm_select v-model="query.size" :options="$to_size()" @change="search()" />
								</div>
								<div class="fr">
									<span class="mr">共 {{ count }} 条</span>
									<span>当前</span>
									<input type="number" class="pager_now" v-model.number="page_now" @blur="goTo(page_now)" @change="page_change" />
									<span>/{{ page_count }}页</span>
								</div>
								<mm_pager display="2" v-model="query.page" :count="count / query.size" :func="goTo" :icons="['首页', '上一页', '下一页', '尾页']"></mm_pager>
							</div>
						</mm_card>
					</mm_col>
				</mm_row>
			</mm_container>
		</mm_warp>
		<mm_modal v-model="show" mask="true">
			<mm_card class="card">
				<div class="card_head">
					<h5>批量修改</h5>
				</div>
				<div class="card_body">
					<dl>
						<dt>是否启用</dt>
						<dd>
							<mm_select v-model="form.available" :options="$to_kv(arr_available)" />
						</dd>
						<dt>状态</dt>
						<dd>
							<mm_select v-model="form.state" :options="$to_kv(arr_state)" />
						</dd>
						<dt>产品分类</dt>
						<dd>
							<mm_select v-model="form.type_id" :options="$to_kv(list_product_type, 'type_id', 'name')" />
						</dd>
						<dt>频道</dt>
						<dd>
							<mm_select v-model="form.channel_id" :options="$to_kv(list_product_channel, 'channel_id', 'name')" />
						</dd>
						<dt>店铺</dt>
						<dd>
							<mm_select v-model="form.shop_id" :options="$to_kv(list_shop, 'shop_id', 'name')" />
						</dd>
						<dt>分组</dt>
						<dd>
							<mm_select v-model="form.group_id" :options="$to_kv(list_product_group, 'group_id', 'name')" />
						</dd>
						<dt>所属城市</dt>
						<dd>
							<mm_select v-model="form.city_id" :options="$to_kv(list_address_city, 'city_id', 'name')" />
						</dd>
					</dl>
				</div>
				<div class="card_foot">
					<div class="mm_group">
						<button class="btn_default" type="reset" @click="show = false">取消</button>
						<button class="btn_primary" type="button" @click="batchSet()">提交</button>
					</div>
				</div>
			</mm_card>
		</mm_modal>
	</main>
</template>

<script>
	import mixin from '/src/mixins/page.js';

	export default {
		mixins: [mixin],
		data() {
			return {
				// 列表请求地址
				url_get_list: "/apis/mall/product",
				url_del: "/apis/mall/product?method=del&",
				url_set: "/apis/mall/product?method=set&",
				url_import: "/apis/mall/product?method=import&",
				url_export: "/apis/mall/product?method=export&",
				field: "product_id",
				query_set: {
					"product_id": ""
				},
				// 查询条件
				query: {
					//页码
					page: 1,
					//页面大小
					size: 10,
					// 产品id
					'product_id': 0,
					// 是否启用
					'available': '',
					// 状态——最小值
					'state_min': '',
					// 状态——最大值
					'state_max': '',
					// 排序——最小值
					'display_min': 0,
					// 排序——最大值
					'display_max': 0,
					// 热度——最小值
					'hot_min': 0,
					// 热度——最大值
					'hot_max': 0,
					// 点赞次数——最小值
					'praise_min': 0,
					// 点赞次数——最大值
					'praise_max': 0,
					// 销量——最小值
					'sales_min': 0,
					// 销量——最大值
					'sales_max': 0,
					// 卖价——最小值
					'price_min': 0,
					// 卖价——最大值
					'price_max': 0,
					// 原价——最小值
					'price_old_min': 0,
					// 原价——最大值
					'price_old_max': 0,
					// 创建时间——开始时间
					'time_create_min': '',
					// 创建时间——结束时间
					'time_create_max': '',
					// 更新时间——开始时间
					'time_update_min': '',
					// 更新时间——结束时间
					'time_update_max': '',
					// 标题
					'title': '',
					// 关键词
					'keywords': '',
					// 描述
					'description': '',
					// 标签
					'tag': '',
					// 正文
					'content': '',
					// 关键词
					'keyword': '',
					//排序
					orderby: ""
				},
				form: {},
				//颜色
				arr_color: ['', '', 'font_yellow', 'font_success', 'font_warning', 'font_primary', 'font_info', 'font_default'],
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
				// 视图模型
				vm: {}
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
