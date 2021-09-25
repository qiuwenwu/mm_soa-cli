<template>
	<main id="sys_config">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>系统配置</h5>
							</div>
							<div class="card_body">
								<mm_form class="bar_filter">
									<div class="title">
										<h5><span>筛选条件</span></h5>
									</div>
									<mm_list :col="3">
										<mm_item>
											<control_input v-model="query.keyword" title="关键词" desc="变量名 / 变量标题 / 变量描述"
											 @blur="search()" />
										</mm_item>
										<mm_item>
											<control_select v-model="query.type" title="数据类型" :options="$to_kv(arr_type)" @change="search()" />
										</mm_item>
										<mm_item>
											<control_select v-model="query.control" title="控件类型" :options="$to_kv(arr_control)" @change="search()" />
										</mm_item>
										<mm_item>
											<mm_btn class="btn_primary-x" type="reset" @click.native="reset();search()">重置</mm_btn>
										</mm_item>
									</mm_list>
								</mm_form>
								<div class="bar_action">
									<h5><span>操作</span></h5>
									<div class="btns">
										<mm_btn class="btn_primary-x" url="./config_form?">添加</mm_btn>
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
											<th class="th_id"><span>#</span></th>
											<th class="th_name">
												<control_reverse title="变量名" v-model="query.orderby" field="name" :func="search"></control_reverse>
											</th>
											<th class="th_type">
												<control_reverse title="数据类型" v-model="query.orderby" field="type" :func="search"></control_reverse>
											</th>
											<th class="th_control">
												<control_reverse title="控件类型" v-model="query.orderby" field="control" :func="search"></control_reverse>
											</th>
											<th class="th_title">
												<control_reverse title="变量标题" v-model="query.orderby" field="title" :func="search"></control_reverse>
											</th>
											<th class="th_value">
												<control_reverse title="变量值" v-model="query.orderby" field="value" :func="search"></control_reverse>
											</th>
											<th class="th_description">
												<control_reverse title="变量描述" v-model="query.orderby" field="description" :func="search"></control_reverse>
											</th>
											<th class="th_model">
												<control_reverse title="数据模型" v-model="query.orderby" field="model" :func="search"></control_reverse>
											</th>
											<th class="th_handle"><span>操作</span></th>
										</tr>
									</thead>
									<tbody>
										<!-- <draggable v-model="list" tag="tbody" @change="sort_change"> -->
										<tr v-for="(o, idx) in list" :key="idx" :class="{'active': select == idx}" @click="selected(idx)">
											<td>{{ o[field] }}</td>
											<td>
												<span>{{ o.name }}</span>
											</td>
											<td>
												<control_select v-model="o.type" :options="$to_kv(arr_type)" @change.native="set(o)" />
											</td>
											<td>
												<control_select v-model="o.control" :options="$to_kv(arr_control)" @change.native="set(o)" />
											</td>
											<td>
												<span>{{ o.title }}</span>
											</td>
											<td>
												<control_com v-if="o.control == 'number'" tag="number" v-model="o.value" @change="set(o)" />
												<control_com v-else-if="o.control == 'select'" tag="select" v-model="o.value" :mod="o.model" @change="set(o)" />
												<control_com v-else-if="o.control == 'checkbox' || o.control == 'radio'" :tag="o.control" v-model="o.value" :mod="o.model" @change="set(o)" />
												<control_com v-else :auto="true" :tag="o.control" v-model="o.value" @change="set(o)" />
											</td>
											<td>
												<span>{{ o.description }}</span>
											</td>
											<td>
												<span>{{ o.model }}</span>
											</td>
											<td>
												<mm_btn class="btn_primary" :url="'./config_form?config_id=' + o[field]">修改</mm_btn>
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
						<dt>数据类型</dt>
						<dd>
							<control_select v-model="form.type" :options="$to_kv(arr_type)" />
						</dd>
						<dt>控件类型</dt>
						<dd>
							<control_select v-model="form.control" :options="$to_kv(arr_control)" />
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
	import control_com from '/src/components/control/control_com.vue';
	import mixin from '/src/mixins/page.js';

	export default {
		mixins: [mixin],
		components: {
			control_com
		},
		data() {
			return {
				// 列表请求地址
				url_get_list: "/apis/sys/config",
				url_del: "/apis/sys/config?method=del&",
				url_set: "/apis/sys/config?method=set&",
				url_import: "/apis/sys/config?method=import&",
				url_export: "/apis/sys/config?method=export&",
				field: "config_id",
				query_set: {
					"config_id": ""
				},
				// 查询条件
				query: {
					//页码
					page: 0,
					//页面大小
					size: '0',
					// 配置ID
					'config_id': 0,
					// 变量名
					'name': '',
					// 变量标题
					'title': '',
					// 变量描述
					'description': '',
					// 关键词
					'keyword': '',
					//排序
					orderby: ""
				},
				form: {},
				//颜色
				arr_color: ['', '', 'font_yellow', 'font_success', 'font_warning', 'font_primary', 'font_info', 'font_default'],
				// 数据类型
				'arr_type':[{"name":"文本型","value":"string"},{"name":"数字型","value":"number"},{"name":"布尔型","value":"boolean"}],
				// 控件类型
				'arr_control':[{"name":"输入框","value":"input"},{"name":"数字框","value":"number"},{"name":"选择框","value":"select"},{"name":"复选框","value":"checkbox"},{"name":"开关","value":"switch"},{"name":"多文本框","value":"textarea"},{"name":"单选框","value":"radio"}],
				// 视图模型
				vm: {}
			}
		},
		methods: {
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
		}
	}
</script>

<style>
</style>
