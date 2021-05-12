<template>
	<main id="cms_article_type">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>文章分类</h5>
							</div>
							<div class="card_body">
								<mm_form class="bar_filter">
									<div class="title">
										<h5><span>筛选条件</span></h5>
									</div>
									<mm_list col="3">
										<mm_item>
											<control_input v-model="query.keyword" title="关键词" desc="分类名称 / 分类标题 / 分类描述"
											 @blur="search()" />
										</mm_item>
										<mm_item>
											<control_select v-model="query.father_id" title="上级分类" :options="$to_kv(list_article_type, 'type_id', 'name')"
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
										<mm_btn class="btn_primary-x" url="./article_type_form?">添加</mm_btn>
										<mm_btn @click.native="show = true" class="btn_primary-x" v-bind:class="{ 'disabled': !selects }">批量修改</mm_btn>
									</div>
									<div class="btn_small">
										<control_file class="btn_default-x" type="excel" :func="import_db" v-if="url_import"></control_file>
										<mm_btn class="btn_default-x" @click.native="export_db()" v-if="url_export">导出</mm_btn>
									</div>
								</div>
								<mm_table type="3">
									<thead class="table-sm">
										<tr>
											<th class="th_open"></th>
											<th class="th_selected"><input type="checkbox" :checked="select_state" @click="select_all()" /></th>
											<th class="th_id"><span>#</span></th>
											<th>
												<control_reverse title="显示顺序" v-model="query.orderby" field="display" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="上级分类" v-model="query.orderby" field="father_id" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="分类名称" v-model="query.orderby" field="name" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="分类标题" v-model="query.orderby" field="title" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="分类描述" v-model="query.orderby" field="description" :func="search"></control_reverse>
											</th>
											<th class="th_handle"><span>操作</span></th>
										</tr>
									</thead>
									<tbody>
										<!-- <draggable v-model="list" tag="tbody" @change="sort_change"> -->
										<tr v-for="(o, idx) in list_new" :key="idx" :class="{'active': select == idx, sub: o[father_id], open: opens_has(o[field]), no_sub: !opens_has_sub(o[field]) }"
										 @click="selected(idx)">
											<th class="th_open"><button class="btn_open" :style="'margin-left:' + (1.5 * opens_lv(o[father_id])) + 'rem;'"
												 @click="opens_change(o[field])"><i class="fa-caret-right"></i></button></th>
											<th class="th_selected"><input type="checkbox" :checked="select_has(o[field])" @click="select_change(o[field])" /></th>
											<td>{{ o[field] }}</td>
											<td>
												<input class="input_display" v-model.number="o.display" @blur="set(o)" min="0" max="1000" />
											</td>
											<td>
												<span>{{ get_name(list_article_type, o.father_id, 'type_id', 'name') }}</span>
											</td>
											<td>
												<control_input :auto="true" v-model="o.name" @blur="set(o)" />
											</td>
											<td>
												<control_input :auto="true" v-model="o.title" @blur="set(o)" />
											</td>
											<td>
												<control_input :auto="true" v-model="o.description" @blur="set(o)" />
											</td>
											<td>
												<mm_btn class="btn_primary" :url="'./article_type_form?type_id=' + o[field]">修改</mm_btn>
												<mm_btn class="btn_warning" @click.native="del_show(o, field)">删除</mm_btn>
											</td>
										</tr>
									</tbody>
									<!-- </draggable> -->
								</mm_table>
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
						<dt>上级分类</dt>
						<dd>
							<control_select v-model="form.father_id" :options="$to_kv(list_article_type, 'type_id', 'name')" />
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
				url_get_list: "/apis/cms/article_type",
				url_del: "/apis/cms/article_type?method=del&",
				url_set: "/apis/cms/article_type?method=set&",
				url_import: "/apis/cms/article_type?method=import&",
				url_export: "/apis/cms/article_type?method=export&",
				field: "type_id",
				query_set: {
					"type_id": ""
				},
				// 查询条件
				query: {
					//页码
					page: 0,
					//页面大小
					size: '0',
					// 文章分类ID
					'type_id': 0,
					// 显示顺序——最小值
					'display_min': 0,
					// 显示顺序——最大值
					'display_max': 0,
					// 分类名称
					'name': '',
					// 分类标题
					'title': '',
					// 分类描述
					'description': '',
					// 关键词
					'keyword': '',
					//排序
					orderby: ""
				},
				form: {},
				//颜色
				arr_color: ['', '', 'font_yellow', 'font_success', 'font_warning', 'font_primary', 'font_info', 'font_default'],
				// 上级分类
				'list_article_type':[],
				// 视图模型
				vm: {}
			}
		},
		methods: {
			/**
			 * 获取上级分类
			 * @param {query} 查询条件
			 */
			get_article_type(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "type_id,name,father_id"
					};
				}
				this.$get('~/apis/cms/article_type?size=0', query, function(json) {
					if (json.result) {
						_this.list_article_type .clear();
						_this.list_article_type .addList(json.result.list)
					}
				});
			},
		},
		created() {
			// 获取上级分类
			this.get_article_type();
		},
		computed: {
			list_new() {
				var lt = this.list.toTree(this.field).toList();
				var list = [];
				var arr = this.opens;
				for (var i = 0; i < lt.length; i++) {
					var o = lt[i];
					if (this.opens.indexOf(o[this.father_id]) !== -1) {
						list.push(o);
					}
				}
				return list;
			}
		}
	}
</script>

<style>
</style>
