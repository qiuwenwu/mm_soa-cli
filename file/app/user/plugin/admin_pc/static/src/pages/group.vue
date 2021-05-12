<template>
	<main id="user_group">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>用户组</h5>
							</div>
							<div class="card_body">
								<mm_form class="bar_filter">
									<div class="title">
										<h5><span>筛选条件</span></h5>
									</div>
									<mm_list col="3">
										<mm_item>
											<control_input v-model="query.keyword" title="关键词" desc="名称 / 分组标题 / 描述"
											 @blur="search()" />
										</mm_item>
										<mm_item>
											<control_select v-model="query.next_group_id" title="下级用户组" :options="$to_kv(list_group, 'group_id', 'name')"
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
										<mm_btn class="btn_primary-x" url="./group_form?">添加</mm_btn>
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
												<control_reverse title="等级划分" v-model="query.orderby" field="level" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="下级用户组" v-model="query.orderby" field="next_group_id" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="升级所需经验" v-model="query.orderby" field="exp" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="折扣" v-model="query.orderby" field="discount" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="奖励比例" v-model="query.orderby" field="bonus" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="应用" v-model="query.orderby" field="app" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="名称" v-model="query.orderby" field="name" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="分组标题" v-model="query.orderby" field="title" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="描述" v-model="query.orderby" field="description" :func="search"></control_reverse>
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
												<span>{{ o.level }}</span>
											</td>
											<td>
												<span>{{ get_name(list_group, o.next_group_id, 'group_id', 'name') }}</span>
											</td>
											<td>
												<span>{{ o.exp }}</span>
											</td>
											<td>
												<span>{{ o.discount }}</span>
											</td>
											<td>
												<span>{{ o.bonus }}</span>
											</td>
											<td>
												<span>{{ o.app }}</span>
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
												<mm_btn class="btn_primary" :url="'./group_form?group_id=' + o[field]">修改</mm_btn>
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
						<dt>下级用户组</dt>
						<dd>
							<control_select v-model="form.next_group_id" :options="$to_kv(list_group, 'group_id', 'name')" />
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
				url_get_list: "/apis/user/group",
				url_del: "/apis/user/group?method=del&",
				url_set: "/apis/user/group?method=set&",
				url_import: "/apis/user/group?method=import&",
				url_export: "/apis/user/group?method=export&",
				field: "group_id",
				query_set: {
					"group_id": ""
				},
				// 查询条件
				query: {
					//页码
					page: 1,
					//页面大小
					size: 10,
					// 用户组ID
					'group_id': 0,
					// 显示顺序——最小值
					'display_min': 0,
					// 显示顺序——最大值
					'display_max': 0,
					// 等级划分——最小值
					'level_min': 0,
					// 等级划分——最大值
					'level_max': 0,
					// 升级所需经验——最小值
					'exp_min': 0,
					// 升级所需经验——最大值
					'exp_max': 0,
					// 折扣——最小值
					'discount_min': 0,
					// 折扣——最大值
					'discount_max': 0,
					// 奖励比例——最小值
					'bonus_min': 0,
					// 奖励比例——最大值
					'bonus_max': 0,
					// 名称
					'name': '',
					// 分组标题
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
				// 下级用户组
				'list_group':[],
				// 视图模型
				vm: {}
			}
		},
		methods: {
			/**
			 * 获取下级用户组
			 * @param {query} 查询条件
			 */
			get_group(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "group_id,name"
					};
				}
				this.$get('~/apis/user/group?size=0', query, function(json) {
					if (json.result) {
						_this.list_group.clear();
						_this.list_group.addList(json.result.list)
					}
				});
			},
		},
		created() {
			// 获取下级用户组
			this.get_group();
		}
	}
</script>

<style>
</style>
