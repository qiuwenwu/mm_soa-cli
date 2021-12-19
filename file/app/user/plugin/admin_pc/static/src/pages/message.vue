<template>
	<main id="user_message">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>问题反馈</h5>
							</div>
							<div class="card_body">
								<mm_form class="bar_filter">
									<div class="title">
										<h5><span>筛选条件</span></h5>
									</div>
									<mm_list :col="3">
										<mm_item>
											<control_input v-model="query.keyword" title="关键词" desc="留言标题 / 留言内容 / 留言者姓名"
											 @blur="search()" />
										</mm_item>
										<mm_item>
											<control_select type="list" v-model="query.user_id" title="用户" :options="$to_kv(list_account, 'user_id', 'phone')" @change="search()" />
										</mm_item>
										<mm_item>
											<control_select v-model="query.type" title="类型" :options="$to_kv(arr_type)" @change="search()" />
										</mm_item>
										<mm_item>
											<mm_btn class="btn_primary-x" type="reset" @click.native="reset();search()">重置</mm_btn>
										</mm_item>
									</mm_list>
								</mm_form>
								<div class="bar_action">
									<h5><span>操作</span></h5>
									<div class="btns">
										<mm_btn class="btn_primary-x" url="./message_form?">添加</mm_btn>
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
											<th class="th_user_id">
												<control_reverse title="用户" v-model="query.orderby" field="user_id" :func="search"></control_reverse>
											</th>
											<th class="th_img">
												<control_reverse title="图片" v-model="query.orderby" field="img" :func="search"></control_reverse>
											</th>
											<th class="th_img_2">
												<control_reverse title="图片2" v-model="query.orderby" field="img_2" :func="search"></control_reverse>
											</th>
											<th class="th_img_3">
												<control_reverse title="图片3" v-model="query.orderby" field="img_3" :func="search"></control_reverse>
											</th>
											<th class="th_type">
												<control_reverse title="类型" v-model="query.orderby" field="type" :func="search"></control_reverse>
											</th>
											<th class="th_title">
												<control_reverse title="留言标题" v-model="query.orderby" field="title" :func="search"></control_reverse>
											</th>
											<th class="th_phone">
												<control_reverse title="留言者手机" v-model="query.orderby" field="phone" :func="search"></control_reverse>
											</th>
											<th class="th_email">
												<control_reverse title="留言者邮箱" v-model="query.orderby" field="email" :func="search"></control_reverse>
											</th>
											<th class="th_name">
												<control_reverse title="留言者姓名" v-model="query.orderby" field="name" :func="search"></control_reverse>
											</th>
											<th class="th_time_create">
												<control_reverse title="留言时间" v-model="query.orderby" field="time_create" :func="search"></control_reverse>
											</th>
											<th class="th_time_update">
												<control_reverse title="最后更新时间" v-model="query.orderby" field="time_update" :func="search"></control_reverse>
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
												<span>{{ $get_name(list_account, o.user_id, 'user_id', 'phone') || o.user_id }}</span>
											</td>
											<td>
												<img class="img" :src="o.img" alt="图片" />
											</td>
											<td>
												<img class="img_2" :src="o.img_2" alt="图片2" />
											</td>
											<td>
												<img class="img_3" :src="o.img_3" alt="图片3" />
											</td>
											<td>
												<span>{{ $get_name(arr_type, o.type, 'value') }}</span>
											</td>
											<td>
												<span>{{ o.title }}</span>
											</td>
											<td>
												<span>{{ o.phone }}</span>
											</td>
											<td>
												<span>{{ o.email }}</span>
											</td>
											<td>
												<span>{{ o.name }}</span>
											</td>
											<td>
												<span>{{ $to_time(o.time_create, 'yyyy-MM-dd hh:mm') }}</span>
											</td>
											<td>
												<span>{{ $to_time(o.time_update, 'yyyy-MM-dd hh:mm') }}</span>
											</td>
											<td>
												<mm_btn class="btn_primary" :url="'./message_form?message_id=' + o[field]">修改</mm_btn>
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
						<dt>用户</dt>
						<dd>
							<control_select v-model="form.user_id" :options="$to_kv(list_account, 'user_id', 'phone')" />
						</dd>
						<dt>类型</dt>
						<dd>
							<control_select v-model="form.type" :options="$to_kv(arr_type)" />
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
				url_get_list: "/apis/user/message",
				url_del: "/apis/user/message?method=del&",
				url_set: "/apis/user/message?method=set&",
				url_import: "/apis/user/message?method=import&",
				url_export: "/apis/user/message?method=export&",
				field: "message_id",
				query_set: {
					"message_id": ""
				},
				// 查询条件
				query: {
					//页码
					page: 1,
					//页面大小
					size: 10,
					// 消息ID
					'message_id': 0,
					// 用户ID
					'user_id': '',
					// 留言标题
					'title': '',
					// 留言内容
					'content': '',
					// 留言者姓名
					'name': '',
					// 留言时间——开始时间
					'time_create_min': '',
					// 留言时间——结束时间
					'time_create_max': '',
					// 最后更新时间——开始时间
					'time_update_min': '',
					// 最后更新时间——结束时间
					'time_update_max': '',
					// 关键词
					'keyword': '',
					//排序
					orderby: ""
				},
				form: {},
				//颜色
				arr_color: ['', '', 'font_yellow', 'font_success', 'font_warning', 'font_primary', 'font_info', 'font_default'],
				// 用户
				'list_account':[],
				// 类型
				'arr_type':[{"name":"平台","value":"平台"},{"name":"账号","value":"账号"},{"name":"订单","value":"订单"},{"name":"支付","value":"支付"},{"name":"其他","value":"其他"}],
				// 视图模型
				vm: {}
			}
		},
		methods: {
			/**
			 * 获取用户
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
			// 获取用户
			this.get_account();
		}
	}
</script>

<style>
</style>
