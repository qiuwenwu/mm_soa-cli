<template>
	<main id="user_pay_account">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>支付账号</h5>
							</div>
							<div class="card_body">
								<mm_form class="bar_filter">
									<div class="title">
										<h5><span>筛选条件</span></h5>
									</div>
									<mm_list :col="3">
										<mm_item>
											<control_input v-model="query.keyword" title="关键词" desc="账号"
											 @blur="search()" />
										</mm_item>
										<mm_item>
											<control_select type="list" v-model="query.type_id" title="类型" :options="$to_kv(list_pay_type, 'type_id', 'name')" @change="search()" />
										</mm_item>
										<mm_item>
											<control_select v-model="query.state" title="状态" :options="$to_kv(arr_state)" @change="search()" />
										</mm_item>
										<mm_item>
											<mm_btn class="btn_primary-x" type="reset" @click.native="reset();search()">重置</mm_btn>
										</mm_item>
									</mm_list>
								</mm_form>
								<div class="bar_action">
									<h5><span>操作</span></h5>
									<div class="btns">
										<mm_btn class="btn_primary-x" url="./pay_account_form?">添加</mm_btn>
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
											<th class="th_type_id">
												<control_reverse title="类型" v-model="query.orderby" field="type_id" :func="search"></control_reverse>
											</th>
											<th class="th_uesrname">
												<control_reverse title="账号" v-model="query.orderby" field="uesrname" :func="search"></control_reverse>
											</th>
											<th class="th_state">
												<control_reverse title="状态" v-model="query.orderby" field="state" :func="search"></control_reverse>
											</th>
											<th class="th_time_create">
												<control_reverse title="创建时间" v-model="query.orderby" field="time_create" :func="search"></control_reverse>
											</th>
											<th class="th_time_update">
												<control_reverse title="更新时间" v-model="query.orderby" field="time_update" :func="search"></control_reverse>
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
												<span>{{ $get_name(list_pay_type, o.type_id, 'type_id', 'name') }}</span>
											</td>
											<td>
												<span>{{ o.uesrname }}</span>
											</td>
											<td>
												<span v-bind:class="arr_color[o.state]">{{arr_state[o.state] }}</span>
											</td>
											<td>
												<span>{{ $to_time(o.time_create, 'yyyy-MM-dd hh:mm') }}</span>
											</td>
											<td>
												<span>{{ $to_time(o.time_update, 'yyyy-MM-dd hh:mm') }}</span>
											</td>
											<td>
												<mm_btn class="btn_primary" :url="'./pay_account_form?user_id=' + o[field]">修改</mm_btn>
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
				<div class="card_body pa">
					<dl>
						<dt>类型</dt>
						<dd>
							<control_select v-model="form.type_id" :options="$to_kv(list_pay_type, 'type_id', 'name')" />
						</dd>
						<dt>状态</dt>
						<dd>
							<control_select v-model="form.state" :options="$to_kv(arr_state)" />
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
				url_get_list: "/apis/user/pay_account",
				url_del: "/apis/user/pay_account?method=del&",
				url_set: "/apis/user/pay_account?method=set&",
				url_import: "/apis/user/pay_account?method=import&",
				url_export: "/apis/user/pay_account?method=export&",
				field: "user_id",
				query_set: {
					"user_id": ""
				},
				// 查询条件
				query: {
					//页码
					page: 1,
					//页面大小
					size: 10,
					// 用户ID
					'user_id': 0,
					// 类型ID
					'type_id': '',
					// 账号
					'uesrname': '',
					// 状态——最小值
					'state_min': '',
					// 状态——最大值
					'state_max': '',
					// 创建时间——开始时间
					'time_create_min': '',
					// 创建时间——结束时间
					'time_create_max': '',
					// 更新时间——开始时间
					'time_update_min': '',
					// 更新时间——结束时间
					'time_update_max': '',
					// 关键词
					'keyword': '',
					//排序
					orderby: ""
				},
				form: {},
				//颜色
				arr_color: ['', '', 'font_yellow', 'font_success', 'font_warning', 'font_primary', 'font_info', 'font_default'],
				// 类型
				'list_pay_type':[],
				// 状态
				'arr_state':["","审核中","已通过","未通过","已冻结"],
				// 视图模型
				vm: {}
			}
		},
		methods: {
			/**
			 * 获取类型
			 * @param {query} 查询条件
			 */
			get_pay_type(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "type_id,name"
					};
				}
				this.$get('~/apis/user/pay_type?size=0', query, function(json) {
					if (json.result) {
						_this.list_pay_type.clear();
						_this.list_pay_type.addList(json.result.list)
					}
				});
			},
		},
		created() {
			// 获取类型
			this.get_pay_type();
		}
	}
</script>

<style>
</style>
