<template>
	<main id="dev_component">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>组件</h5>
							</div>
							<div class="card_body">
								<mm_form class="mm_filter">
									<div class="title">
										<h5><span>筛选条件</span></h5>
									</div>
									<mm_list col="3">
										<mm_item>
											<mm_input v-model="query.keyword" title="关键词" desc="组件名称 / 标题 / 描述"
											 @blur="search()" />
										</mm_item>
										<mm_item>
											<mm_select v-model="query.page_id" title="适用页面" :options="$to_kv(list_page, 'page_id', 'name')"
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
										<mm_btn class="btn_primary-x" url="./component_form?">添加</mm_btn>
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
												<mm_reverse title="组件ID" v-model="query.orderby" field="component_id" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="使用次数" v-model="query.orderby" field="num" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="适用率" v-model="query.orderby" field="rate" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="组件名称" v-model="query.orderby" field="name" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="标题" v-model="query.orderby" field="title" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="描述" v-model="query.orderby" field="description" :func="search"></mm_reverse>
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
												<span>{{ o.component_id }}</span>
											</td>
											<td>
												<span>{{ o.num }}</span>
											</td>
											<td>
												<span>{{ o.rate }}</span>
											</td>
											<td>
												<span>{{ o.name }}</span>
											</td>
											<td>
												<span>{{ o.title }}</span>
											</td>
											<td>
												<span>{{ o.description }}</span>
											</td>
											<td>
												<mm_btn class="btn_primary" :url="'./component_form?page_id=' + o[field]">修改</mm_btn>
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
						<dt>适用页面</dt>
						<dd>
							<mm_select v-model="form.page_id" :options="$to_kv(list_page, 'page_id', 'name')" />
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
				url_get_list: "/api/dev/component",
				url_del: "/api/dev/component?method=del&",
				url_set: "/api/dev/component?method=set&",
				url_import: "/api/dev/component?method=import&",
				url_export: "/api/dev/component?method=export&",
				field: "page_id",
				query_set: {
					"page_id": ""
				},
				// 查询条件
				query: {
					//页码
					page: 1,
					//页面大小
					size: 10,
					// 适用页面ID
					'page_id': '',
					// 使用次数——最小值
					'num_min': 0,
					// 使用次数——最大值
					'num_max': 0,
					// 适用率——最小值
					'rate_min': 0,
					// 适用率——最大值
					'rate_max': 0,
					// 组件名称
					'name': '',
					// 标题
					'title': '',
					// 描述
					'description': '',
					// 关键词
					'keyword': '',
					//排序
					orderby: ""
				},
				form: {},
				//颜色
				arr_color: ['', '', 'font_yellow', 'font_success', 'font_warning', 'font_primary', 'font_info', 'font_default'],
				// 适用页面
				'list_page':[],
				// 视图模型
				vm: {}
			}
		},
		methods: {
			/**
			 * 获取适用页面
			 * @param {query} 查询条件
			 */
			get_page(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "page_id,name"
					};
				}
				this.$get('~/api/dev/page?size=0', query, function(json) {
					if (json.result) {
						_this.list_page.clear();
						_this.list_page.addList(json.result.list)
					}
				});
			},
		},
		created() {
			// 获取适用页面
			this.get_page();
		}
	}
</script>

<style>
</style>
