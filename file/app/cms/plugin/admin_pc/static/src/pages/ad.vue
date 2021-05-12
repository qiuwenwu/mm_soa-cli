<template>
	<main id="cms_ad">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>CMS广告</h5>
							</div>
							<div class="card_body">
								<mm_form class="bar_filter">
									<div class="title">
										<h5><span>筛选条件</span></h5>
									</div>
									<mm_list col="3">
										<mm_item>
											<control_input v-model="query.keyword" title="关键词" desc="广告名称 / 广告标题 / 广告描述 / 关键词"
											 @blur="search()" />
										</mm_item>
										<mm_item>
											<control_select v-model="query.city_id" title="投放城市" :options="$to_kv(list_address_city, 'city_id', 'name')"
											 @change="search()" />
										</mm_item>
										<mm_item>
											<control_select v-model="query.area_id" title="投放地区" :options="$to_kv(list_address_area, 'area_id', 'name')"
											 @change="search()" />
										</mm_item>
										<mm_item>
											<control_select v-model="query.user_id" title="广告主" :options="$to_kv(list_account, 'user_id', 'nickname')"
											 @change="search()" />
										</mm_item>
										<mm_item>
											<mm_btn class="btn_primary-x" type="reset" @click.native="reset();search()">重置</mm_btn>
										</mm_item>
									</mm_list>
								</mm_form>
								<div class="bar_action">
									<h5><span>操作</span></h5>
									<div class="btns">
										<mm_btn class="btn_primary-x" url="./ad_form?">添加</mm_btn>
										<mm_btn @click.native="show = true" class="btn_primary-x" v-bind:class="{ 'disabled': !selects }">批量修改</mm_btn>
									</div>
									<div class="btn_small">
										<control_file class="btn_default-x" type="excel" :func="import_db" v-if="url_import"></control_file>
										<mm_btn class="btn_default-x" @click.native="export_db()" v-if="url_export">导出</mm_btn>
									</div>
								</div>
								<mm_table type="2">
									<thead class="table-sm">
										<tr>
											<th class="th_selected"><input type="checkbox" :checked="select_state" @click="select_all()" /></th>
											<th class="th_id"><span>#</span></th>
											<th>
												<control_reverse title="显示顺序" v-model="query.orderby" field="display" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="投放城市" v-model="query.orderby" field="city_id" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="投放地区" v-model="query.orderby" field="area_id" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="广告主" v-model="query.orderby" field="user_id" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="访客数" v-model="query.orderby" field="times_user" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="次数上限" v-model="query.orderby" field="times_max" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="展现量" v-model="query.orderby" field="times_show" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="点击量" v-model="query.orderby" field="times_click" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="费用" v-model="query.orderby" field="fee" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="费用——最大值" v-model="query.orderby" field="fee_max" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="费用上限" v-model="query.orderby" field="fee_max" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="广告名称" v-model="query.orderby" field="name" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="广告类型" v-model="query.orderby" field="type" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="投放位置" v-model="query.orderby" field="location" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="付费方式" v-model="query.orderby" field="fee_way" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="展现应用" v-model="query.orderby" field="app" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="所属行业" v-model="query.orderby" field="trade" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="广告标题" v-model="query.orderby" field="title" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="呈现设备" v-model="query.orderby" field="device" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="广告描述" v-model="query.orderby" field="description" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="广告图" v-model="query.orderby" field="img" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="跳转链接" v-model="query.orderby" field="url" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="关键词" v-model="query.orderby" field="keywords" :func="search"></control_reverse>
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
												<input class="input_display" v-model.number="o.display" @blur="set(o)" min="0" max="1000" />
											</td>
											<td>
												<span>{{ get_name(list_address_city, o.city_id, 'city_id', 'name') }}</span>
											</td>
											<td>
												<span>{{ get_name(list_address_area, o.area_id, 'area_id', 'name') }}</span>
											</td>
											<td>
												<span>{{ get_name(list_account, o.user_id, 'user_id', 'nickname') }}</span>
											</td>
											<td>
												<span>{{ o.times_user }}</span>
											</td>
											<td>
												<span>{{ o.times_max }}</span>
											</td>
											<td>
												<span>{{ o.times_show }}</span>
											</td>
											<td>
												<span>{{ o.times_click }}</span>
											</td>
											<td>
												<span>{{ o.fee }}</span>
											</td>
											<td>
												<span>{{ o.fee_max }}</span>
											</td>
											<td>
												<span>{{ o.fee_max }}</span>
											</td>
											<td>
												<span>{{ o.name }}</span>
											</td>
											<td>
												<span>{{ o.type }}</span>
											</td>
											<td>
												<span>{{ o.location }}</span>
											</td>
											<td>
												<span>{{ o.fee_way }}</span>
											</td>
											<td>
												<span>{{ o.app }}</span>
											</td>
											<td>
												<span>{{ o.trade }}</span>
											</td>
											<td>
												<span>{{ o.title }}</span>
											</td>
											<td>
												<span>{{ o.device }}</span>
											</td>
											<td>
												<span>{{ o.description }}</span>
											</td>
											<td>
												<img class="img" :src="o.img" alt="广告图" />
											</td>
											<td>
												<span>{{ o.url }}</span>
											</td>
											<td>
												<span>{{ o.keywords }}</span>
											</td>
											<td>
												<mm_btn class="btn_primary" :url="'./ad_form?ad_id=' + o[field]">修改</mm_btn>
												<mm_btn class="btn_warning" @click.native="del_show(o, field)">删除</mm_btn>
											</td>
										</tr>
									</tbody>
									<!-- </draggable> -->
								</mm_table>
							</div>
							<div class="card_foot">
								<div class="fl">
									<control_select v-model="query.size" :options="$to_size()" @change="search()" />
								</div>
								<div class="fr">
									<span class="mr">共 {{ count }} 条</span>
									<span>当前</span>
									<input type="number" class="pager_now" v-model.number="page_now" @blur="goTo(page_now)" @change="page_change" />
									<span>/{{ page_count }}页</span>
								</div>
								<control_pager display="2" v-model="query.page" :count="count / query.size" :func="goTo" :icons="['首页', '上一页', '下一页', '尾页']"></control_pager>
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
						<dt>投放城市</dt>
						<dd>
							<control_select v-model="form.city_id" :options="$to_kv(list_address_city, 'city_id', 'name')" />
						</dd>
						<dt>投放地区</dt>
						<dd>
							<control_select v-model="form.area_id" :options="$to_kv(list_address_area, 'area_id', 'name')" />
						</dd>
						<dt>广告主</dt>
						<dd>
							<control_select v-model="form.user_id" :options="$to_kv(list_account, 'user_id', 'nickname')" />
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
				url_get_list: "/apis/cms/ad",
				url_del: "/apis/cms/ad?method=del&",
				url_set: "/apis/cms/ad?method=set&",
				url_import: "/apis/cms/ad?method=import&",
				url_export: "/apis/cms/ad?method=export&",
				field: "ad_id",
				query_set: {
					"ad_id": ""
				},
				// 查询条件
				query: {
					//页码
					page: 1,
					//页面大小
					size: 10,
					// 广告ID
					'ad_id': 0,
					// 显示顺序——最小值
					'display_min': 0,
					// 显示顺序——最大值
					'display_max': 0,
					// 访客数——最小值
					'times_user_min': 0,
					// 访客数——最大值
					'times_user_max': 0,
					// 次数上限——最小值
					'times_max_min': 0,
					// 次数上限——最大值
					'times_max_max': 0,
					// 展现量——最小值
					'times_show_min': 0,
					// 展现量——最大值
					'times_show_max': 0,
					// 点击量——最小值
					'times_click_min': 0,
					// 点击量——最大值
					'times_click_max': 0,
					// 费用——最小值
					'fee_min': 0,
					// 费用——最大值
					'fee_max': 0,
					// 费用上限——最小值
					'fee_max_min': 0,
					// 费用上限——最大值
					'fee_max_max': 0,
					// 广告名称
					'name': '',
					// 广告标题
					'title': '',
					// 广告描述
					'description': '',
					// 关键词
					'keywords': '',
					// 关键词
					'keyword': '',
					//排序
					orderby: ""
				},
				form: {},
				//颜色
				arr_color: ['', '', 'font_yellow', 'font_success', 'font_warning', 'font_primary', 'font_info', 'font_default'],
				// 投放城市
				'list_address_city':[],
				// 投放地区
				'list_address_area':[],
				// 广告主
				'list_account':[],
				// 视图模型
				vm: {}
			}
		},
		methods: {
			/**
			 * 获取投放城市
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
			/**
			 * 获取投放地区
			 * @param {query} 查询条件
			 */
			get_address_area(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "area_id,name"
					};
				}
				this.$get('~/apis/sys/address_area?size=0', query, function(json) {
					if (json.result) {
						_this.list_address_area.clear();
						_this.list_address_area.addList(json.result.list)
					}
				});
			},
			/**
			 * 获取广告主
			 * @param {query} 查询条件
			 */
			get_account(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "user_id,nickname"
					};
				}
				this.$get('~/apis/user/account?size=0', query, function(json) {
					if (json.result) {
						_this.list_account.clear();
						_this.list_account.addList(json.result.list)
					}
				});
			},
		},
		created() {
			// 获取投放城市
			this.get_address_city();
			// 获取投放地区
			this.get_address_area();
			// 获取广告主
			this.get_account();
		}
	}
</script>

<style>
</style>
