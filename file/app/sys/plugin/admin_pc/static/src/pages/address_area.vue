<template>
	<main id="sys_address_area">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>地区</h5>
							</div>
							<div class="card_body">
								<mm_form class="mm_filter">
									<div class="title">
										<h5><span>筛选条件</span></h5>
									</div>
									<mm_list col="3">
										<mm_item>
											<mm_input v-model="query.keyword" title="关键词" desc="地区名称"
											 @blur="search()" />
										</mm_item>
										<mm_item>
											<mm_select v-model="query.show" title="是否可见" :options="$to_kv(arr_show)" @change="search()" />
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
										<mm_btn class="btn_primary-x" url="./address_area_form?">添加</mm_btn>
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
												<mm_reverse title="是否可见" v-model="query.orderby" field="show" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="显示顺序" v-model="query.orderby" field="display" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="所属城市" v-model="query.orderby" field="city_id" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="地区名称" v-model="query.orderby" field="name" :func="search"></mm_reverse>
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
												<span>{{arr_show[o.show] }}</span>
											</td>
											<td>
												<input class="input_display" v-model.number="o.display" @blur="set(o)" min="0" max="1000" />
											</td>
											<td>
												<span>{{ get_name(list_address_city, o.city_id, 'city_id', 'name') }}</span>
											</td>
											<td>
												<span>{{ o.name }}</span>
											</td>
											<td>
												<mm_btn class="btn_primary" :url="'./address_area_form?area_id=' + o[field]">修改</mm_btn>
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
						<dt>是否可见</dt>
						<dd>
							<mm_select v-model="form.show" :options="$to_kv(arr_show)" />
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
				url_get_list: "/apis/sys/address_area",
				url_del: "/apis/sys/address_area?method=del&",
				url_set: "/apis/sys/address_area?method=set&",
				url_import: "/apis/sys/address_area?method=import&",
				url_export: "/apis/sys/address_area?method=export&",
				field: "area_id",
				query_set: {
					"area_id": ""
				},
				// 查询条件
				query: {
					//页码
					page: 1,
					//页面大小
					size: 10,
					// 地区ID
					'area_id': 0,
					// 是否可见——最小值
					'show_min': '',
					// 是否可见——最大值
					'show_max': '',
					// 显示顺序——最小值
					'display_min': 0,
					// 显示顺序——最大值
					'display_max': 0,
					// 地区名称
					'name': '',
					// 关键词
					'keyword': '',
					//排序
					orderby: ""
				},
				form: {},
				//颜色
				arr_color: ['', '', 'font_yellow', 'font_success', 'font_warning', 'font_primary', 'font_info', 'font_default'],
				// 是否可见
				'arr_show':["仅表单可见","表单和搜索可见","均可见"],
				// 所属城市
				'list_address_city':[],
				// 视图模型
				vm: {}
			}
		},
		methods: {
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
			// 获取所属城市
			this.get_address_city();
		}
	}
</script>

<style>
</style>
