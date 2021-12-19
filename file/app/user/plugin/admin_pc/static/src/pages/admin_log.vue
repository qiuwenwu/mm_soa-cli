<template>
	<main id="user_admin_log">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>管理日志</h5>
							</div>
							<div class="card_body">
								<mm_form class="bar_filter">
									<div class="title">
										<h5><span>筛选条件</span></h5>
									</div>
									<mm_list :col="3">
										<mm_item>
											<control_input v-model="query.keyword" title="关键词" desc="管理员名字 / 日志标题 / 内容"
											 @blur="search()" />
										</mm_item>
										<mm_item>
											<control_select type="list" v-model="query.user_id" title="管理员" :options="$to_kv(list_account, 'user_id', 'phone')" @change="search()" />
										</mm_item>
										<mm_item>
											<mm_btn class="btn_primary-x" type="reset" @click.native="reset();search()">重置</mm_btn>
										</mm_item>
									</mm_list>
								</mm_form>
								<div class="bar_action">
									<h5><span>操作</span></h5>
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
											<th class="th_user_id">
												<control_reverse title="管理员" v-model="query.orderby" field="user_id" :func="search"></control_reverse>
											</th>
											<th class="th_username">
												<control_reverse title="管理员名字" v-model="query.orderby" field="username" :func="search"></control_reverse>
											</th>
											<th class="th_url">
												<control_reverse title="操作接口" v-model="query.orderby" field="url" :func="search"></control_reverse>
											</th>
											<th class="th_title">
												<control_reverse title="日志标题" v-model="query.orderby" field="title" :func="search"></control_reverse>
											</th>
											<th class="th_ip">
												<control_reverse title="IP" v-model="query.orderby" field="ip" :func="search"></control_reverse>
											</th>
											<th class="th_useragent">
												<control_reverse title="User-Agent" v-model="query.orderby" field="useragent" :func="search"></control_reverse>
											</th>
											<th class="th_time_create">
												<control_reverse title="创建时间" v-model="query.orderby" field="time_create" :func="search"></control_reverse>
											</th>
											<th class="th_time_update">
												<control_reverse title="更新时间" v-model="query.orderby" field="time_update" :func="search"></control_reverse>
											</th>
										</tr>
									</thead>
									<tbody>
										<!-- <draggable v-model="list" tag="tbody" @change="sort_change"> -->
										<tr v-for="(o, idx) in list" :key="idx" :class="{'active': select == idx}" @click="selected(idx)">
											<th class="th_selected"><input type="checkbox" :checked="select_has(o[field])" @click="select_change(o[field])" /></th>
											<td>{{ o[field] }}</td>
											<td>
												<span>{{ $get_name(list_account, o.user_id, 'user_id', 'phone') || o.user_id }}</span>
											</td>
											<td>
												<span>{{ o.username }}</span>
											</td>
											<td>
												<span>{{ o.url }}</span>
											</td>
											<td>
												<span>{{ o.title }}</span>
											</td>
											<td>
												<span>{{ o.ip }}</span>
											</td>
											<td>
												<span>{{ o.useragent }}</span>
											</td>
											<td>
												<span>{{ $to_time(o.time_create, 'yyyy-MM-dd hh:mm') }}</span>
											</td>
											<td>
												<span>{{ $to_time(o.time_update, 'yyyy-MM-dd hh:mm') }}</span>
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
						<dt>管理员</dt>
						<dd>
							<control_select v-model="form.user_id" :options="$to_kv(list_account, 'user_id', 'phone')" />
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
				url_get_list: "/apis/user/admin_log",
				url_del: "/apis/user/admin_log?method=del&",
				url_set: "/apis/user/admin_log?method=set&",
				url_import: "/apis/user/admin_log?method=import&",
				url_export: "/apis/user/admin_log?method=export&",
				field: "log_id",
				query_set: {
					"log_id": ""
				},
				// 查询条件
				query: {
					//页码
					page: 1,
					//页面大小
					size: 10,
					// 日志ID
					'log_id': 0,
					// 管理员ID
					'user_id': '',
					// 管理员名字
					'username': '',
					// 日志标题
					'title': '',
					// 内容
					'content': '',
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
				// 管理员
				'list_account':[],
				// 视图模型
				vm: {}
			}
		},
		methods: {
			/**
			 * 获取管理员
			 * @param {query} 查询条件
			 */
			get_account(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "user_id,phone"
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
			// 获取管理员
			this.get_account();
		}
	}
</script>

<style>
</style>
