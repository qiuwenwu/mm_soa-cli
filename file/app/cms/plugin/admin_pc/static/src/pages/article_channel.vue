<template>
	<main id="cms_article_channel">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-12">
						<mm_card :class="{ 'hide_filter': !show_filter }">
							<div class="card_head arrow" @click="show_filter = !show_filter">
								<h5>文章频道</h5>
							</div>
							<div class="card_body">
								<mm_form class="bar_filter">
									<div class="title">
										<h5><span>筛选条件</span></h5>
									</div>
									<mm_list :col="3">
										<mm_item>
											<control_input v-model="query.keyword" title="关键词" desc="频道标题 / 描述"
											@blur="search()" />
										</mm_item>
										<mm_item>
											<control_select v-model="query.available" title="是否启用" :options="$to_kv(arr_available)" @change="search()" />
										</mm_item>
										<mm_item>
											<control_select v-model="query.hide" title="是否隐藏" :options="$to_kv(arr_hide)" @change="search()" />
										</mm_item>
										<mm_item>
											<control_select type="list" v-model="query.father_id" title="上级" :options="$to_kv(list_article_channel, 'channel_id', 'name')" @change="search()" />
										</mm_item>
										<mm_item>
											<mm_btn class="btn_primary-x" type="reset" @click.native="reset();">重置</mm_btn>
										</mm_item>
									</mm_list>
								</mm_form>
								<div class="bar_action">
									<h5><span>操作</span></h5>
									<div class="btns">
										<mm_btn class="btn_primary-x" url="./article_channel_form?">添加</mm_btn>
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
											<th class="td_icon">
												<control_reverse title="频道图标" v-model="query.orderby" field="icon" :func="search"></control_reverse>
											</th>
											<th class="td_title">
												<control_reverse title="频道标题" v-model="query.orderby" field="title" :func="search"></control_reverse>
											</th>
											<th class="td_available">
												<control_reverse title="是否启用" v-model="query.orderby" field="available" :func="search"></control_reverse>
											</th>
											<th class="td_hide">
												<control_reverse title="是否隐藏" v-model="query.orderby" field="hide" :func="search"></control_reverse>
											</th>
											<th class="td_description">
												<control_reverse title="描述" v-model="query.orderby" field="description" :func="search"></control_reverse>
											</th>
											<th class="td_display">
												<control_reverse title="显示顺序" v-model="query.orderby" field="display" :func="search"></control_reverse>
											</th>
											<th class="td_father_id">
												<control_reverse title="上级" v-model="query.orderby" field="father_id" :func="search"></control_reverse>
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
												<img class="icon" :src="o.icon" alt="频道图标" />
											</td>
											<td>
												<control_input :auto="true" v-model="o.title" @blur="set(o)" />
											</td>
											<td>
												<control_switch v-model="o.available" @click.native="set(o)" />
											</td>
											<td>
												<control_switch v-model="o.hide" @click.native="set(o)" />
											</td>
											<td>
												<control_input :auto="true" v-model="o.description" @blur="set(o)" />
											</td>
											<td>
												<input class="input_display" v-model.number="o.display" @blur="set(o)" min="0" max="1000" />
											</td>
											<td>
												<span>{{ $get_name(list_article_channel, o.father_id, 'channel_id', 'title') }}</span>
											</td>
											<td>
												<mm_btn class="btn_primary" :url="'./article_channel_form?channel_id=' + o[field]">修改</mm_btn>
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
				<div class="card_body pa">
					<dl>
						<dt>是否启用</dt>
						<dd>
							<control_select v-model="form.available" :options="$to_kv(arr_available)" />
						</dd>
						<dt>是否隐藏</dt>
						<dd>
							<control_select v-model="form.hide" :options="$to_kv(arr_hide)" />
						</dd>
						<dt>上级</dt>
						<dd>
								<control_select type="list" v-model="form.father_id" :options="$to_kv(list_article_channel, 'channel_id', 'name')" />
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
				url_get_list: "/apis/cms/article_channel",
				url_del: "/apis/cms/article_channel?method=del&",
				url_set: "/apis/cms/article_channel?method=set&",
				url_import: "/apis/cms/article_channel?method=import&",
				url_export: "/apis/cms/article_channel?method=export&",
				field: "channel_id",
				query_set: {
					"channel_id": ""
				},
				// 查询条件
				query: {
					//页码
					page: 0,
					//页面大小
					size: '0',
					// 频道ID
					'channel_id': 0,
					// 频道标题
					'title': '',
					// 是否启用
					'available': '',
					// 是否隐藏
					'hide': '',
					// 描述
					'description': '',
					// 显示顺序——最小值
					'display_min': 0,
					// 显示顺序——最大值
					'display_max': 0,
					// 上级ID
					'father_id': '',
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
				// 是否隐藏
				'arr_hide':["否","是"],
				// 上级
				'list_article_channel':[],
				// 视图模型
				vm: {}
			}
		},
		methods: {
			/**
			 * 获取上级
			 * @param {query} 查询条件
			 */
			get_article_channel(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "channel_id,title,father_id"
					};
				}
				this.$get('~/apis/cms/article_channel?size=0', query, function(json) {
					if (json.result) {
						_this.list_article_channel .clear();
						_this.list_article_channel .addList(json.result.list)
					}
				});
			},
			/**
			 * 获取列表之前
			 * @param {Object} param 参数
			 */
			get_list_before(param){
				delete param.page;
				param.size = "0";
				return param;
			}
		},
		created() {
			// 获取上级
			this.get_article_channel();
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
