<template>
	<main id="cms_nav">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>CMS导航</h5>
							</div>
							<div class="card_body">
								<mm_form class="bar_filter">
									<div class="title">
										<h5><span>筛选条件</span></h5>
									</div>
									<mm_list col="3">
										<mm_item>
											<control_input v-model="query.keyword" title="关键词" desc="英文名称 / 中文标题"
											 @blur="search()" />
										</mm_item>
										<mm_item>
											<control_select v-model="query.available" title="是否启用" :options="$to_kv(arr_available)" @change="search()" />
										</mm_item>
										<mm_item>
											<control_select v-model="query.father_id" title="上级" :options="$to_kv(list_nav, 'nav_id', 'name')"
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
										<mm_btn class="btn_primary-x" url="./nav_form?">添加</mm_btn>
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
												<control_reverse title="是否启用" v-model="query.orderby" field="available" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="英文名称" v-model="query.orderby" field="name" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="中文标题" v-model="query.orderby" field="title" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="跳转链接" v-model="query.orderby" field="url" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="风格样式" v-model="query.orderby" field="style" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="样式类型" v-model="query.orderby" field="class" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="跳转方式" v-model="query.orderby" field="target" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="展现位置" v-model="query.orderby" field="position" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="呈现设备" v-model="query.orderby" field="device" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="上级" v-model="query.orderby" field="father_id" :func="search"></control_reverse>
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
												<control_switch v-model="o.available" @click.native="set(o)" />
											</td>
											<td>
												<span>{{ o.name }}</span>
											</td>
											<td>
												<span>{{ o.title }}</span>
											</td>
											<td>
												<span>{{ o.url }}</span>
											</td>
											<td>
												<span>{{ o.style }}</span>
											</td>
											<td>
												<span>{{ o.class }}</span>
											</td>
											<td>
												<span>{{ o.target }}</span>
											</td>
											<td>
												<span>{{ o.position }}</span>
											</td>
											<td>
												<span>{{ o.device }}</span>
											</td>
											<td>
												<span>{{ get_name(list_nav, o.father_id, 'nav_id', 'name') }}</span>
											</td>
											<td>
												<mm_btn class="btn_primary" :url="'./nav_form?nav_id=' + o[field]">修改</mm_btn>
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
						<dt>是否启用</dt>
						<dd>
							<control_select v-model="form.available" :options="$to_kv(arr_available)" />
						</dd>
						<dt>上级</dt>
						<dd>
							<control_select v-model="form.father_id" :options="$to_kv(list_nav, 'nav_id', 'name')" />
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
				url_get_list: "/apis/cms/nav",
				url_del: "/apis/cms/nav?method=del&",
				url_set: "/apis/cms/nav?method=set&",
				url_import: "/apis/cms/nav?method=import&",
				url_export: "/apis/cms/nav?method=export&",
				field: "nav_id",
				query_set: {
					"nav_id": ""
				},
				// 查询条件
				query: {
					//页码
					page: 1,
					//页面大小
					size: 10,
					// 导航ID
					'nav_id': 0,
					// 是否启用
					'available': '',
					// 英文名称
					'name': '',
					// 中文标题
					'title': '',
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
				// 上级
				'list_nav':[],
				// 视图模型
				vm: {}
			}
		},
		methods: {
			/**
			 * 获取上级
			 * @param {query} 查询条件
			 */
			get_nav(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "nav_id,name,father_id"
					};
				}
				this.$get('~/apis/cms/nav?size=0', query, function(json) {
					if (json.result) {
						_this.list_nav.clear();
						_this.list_nav.addList(json.result.list)
					}
				});
			},
		},
		created() {
			// 获取上级
			this.get_nav();
		}
	}
</script>

<style>
</style>
