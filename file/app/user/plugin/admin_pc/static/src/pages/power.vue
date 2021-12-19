<template>
	<main id="user_power">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>管理组</h5>
							</div>
							<div class="card_body">
								<mm_form class="bar_filter">
									<div class="title">
										<h5><span>筛选条件</span></h5>
									</div>
									<mm_list :col="3">
										<mm_item>
											<control_input v-model="query.keyword" title="关键词" desc="名称"
											 @blur="search()" />
										</mm_item>
										<mm_item>
											<control_select v-model="query.method" title="方法" :options="$to_kv(arr_method)" @change="search()" />
										</mm_item>
										<mm_item>
											<mm_btn class="btn_primary-x" type="reset" @click.native="reset();search()">重置</mm_btn>
										</mm_item>
									</mm_list>
								</mm_form>
								<div class="bar_action">
									<h5><span>操作</span></h5>
									<div class="btns">
										<mm_btn class="btn_primary-x" url="./power_form?">添加</mm_btn>
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
											<th class="th_admin_id">
												<control_reverse title="管理组ID" v-model="query.orderby" field="admin_id" :func="search"></control_reverse>
											</th>
											<th class="th_display">
												<control_reverse title="显示顺序" v-model="query.orderby" field="display" :func="search"></control_reverse>
											</th>
											<th class="th_name">
												<control_reverse title="名称" v-model="query.orderby" field="name" :func="search"></control_reverse>
											</th>
											<th class="th_path">
												<control_reverse title="路由路径" v-model="query.orderby" field="path" :func="search"></control_reverse>
											</th>
											<th class="th_method">
												<control_reverse title="方法" v-model="query.orderby" field="method" :func="search"></control_reverse>
											</th>
											<th class="th_user_add">
												<control_reverse title="添加权限人" v-model="query.orderby" field="user_add" :func="search"></control_reverse>
											</th>
											<th class="th_user_set">
												<control_reverse title="修改权限人" v-model="query.orderby" field="user_set" :func="search"></control_reverse>
											</th>
											<th class="th_user_del">
												<control_reverse title="删除权限人" v-model="query.orderby" field="user_del" :func="search"></control_reverse>
											</th>
											<th class="th_user_get">
												<control_reverse title="查看权限人" v-model="query.orderby" field="user_get" :func="search"></control_reverse>
											</th>
											<th class="th_field_set">
												<control_reverse title="修改可见字段" v-model="query.orderby" field="field_set" :func="search"></control_reverse>
											</th>
											<th class="th_field_add">
												<control_reverse title="添加可见字段" v-model="query.orderby" field="field_add" :func="search"></control_reverse>
											</th>
											<th class="th_field_del">
												<control_reverse title="删除可见字段" v-model="query.orderby" field="field_del" :func="search"></control_reverse>
											</th>
											<th class="th_field_get">
												<control_reverse title="查询可见字段" v-model="query.orderby" field="field_get" :func="search"></control_reverse>
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
												<span>{{ o.admin_id }}</span>
											</td>
											<td>
												<input class="input_display" v-model.number="o.display" @blur="set(o)" min="0" max="1000" />
											</td>
											<td>
												<span>{{ o.name }}</span>
											</td>
											<td>
												<span>{{ o.path }}</span>
											</td>
											<td>
												<span>{{ $get_name(arr_method, o.method, 'value') }}</span>
											</td>
											<td>
												<span>{{ o.user_add }}</span>
											</td>
											<td>
												<span>{{ o.user_set }}</span>
											</td>
											<td>
												<span>{{ o.user_del }}</span>
											</td>
											<td>
												<span>{{ o.user_get }}</span>
											</td>
											<td>
												<span>{{ o.field_set }}</span>
											</td>
											<td>
												<span>{{ o.field_add }}</span>
											</td>
											<td>
												<span>{{ o.field_del }}</span>
											</td>
											<td>
												<span>{{ o.field_get }}</span>
											</td>
											<td>
												<mm_btn class="btn_primary" :url="'./power_form?power_id=' + o[field]">修改</mm_btn>
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
						<dt>方法</dt>
						<dd>
							<control_select v-model="form.method" :options="$to_kv(arr_method)" />
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
				url_get_list: "/apis/user/power",
				url_del: "/apis/user/power?method=del&",
				url_set: "/apis/user/power?method=set&",
				url_import: "/apis/user/power?method=import&",
				url_export: "/apis/user/power?method=export&",
				field: "power_id",
				query_set: {
					"power_id": ""
				},
				// 查询条件
				query: {
					//页码
					page: 1,
					//页面大小
					size: 10,
					// 权限ID
					'power_id': 0,
					// 管理组ID
					'admin_id': 0,
					// 显示顺序——最小值
					'display_min': 0,
					// 显示顺序——最大值
					'display_max': 0,
					// 名称
					'name': '',
					// 关键词
					'keyword': '',
					//排序
					orderby: ""
				},
				form: {},
				//颜色
				arr_color: ['', '', 'font_yellow', 'font_success', 'font_warning', 'font_primary', 'font_info', 'font_default'],
				// 方法
				'arr_method':[{"name":"GET","value":"GET"},{"name":"POST","value":"POST"},{"name":"ALL","value":"ALL"}],
				// 视图模型
				vm: {}
			}
		},
		methods: {
		},
		created() {
		}
	}
</script>

<style>
</style>
