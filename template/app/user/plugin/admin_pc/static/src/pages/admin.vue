<template>
	<main id="user_admin">
		<mm_grid>
			<mm_col>
				<mm_view>
					<header class="arrow">
						<h5>管理组</h5>
					</header>
					<mm_body>
						<mm_form class="mm_filter">
							<h5><span>筛选条件</span></h5>
							<mm_list col="3">
								<mm_col>
									<mm_input v-model="query.keyword" title="关键词" desc="名称 / 描述"
									 @blur="search()" />
								</mm_col>
								<mm_col>
									<mm_select v-model="query.father_id" title="上级" :options="$to_kv(list_admin, 'admin_id', 'name')"
									 @change="search()" />
								</mm_col>
								<mm_col>
									<mm_btn class="btn_primary-x" type="reset" @click.native="reset();search()">重置</mm_btn>
								</mm_col>
							</mm_list>
						</mm_form>
						<div class="mm_action">
							<h5><span>操作</span></h5>
							<div class="">
								<mm_btn class="btn_primary-x" url="./admin_form">添加</mm_btn>
								<mm_btn @click.native="show = true" class="btn_primary-x" v-bind:class="{ 'disabled': !selects }">批量修改</mm_btn>
							</div>
						</div>
						<mm_table type="2">
							<thead>
								<tr>
									<th scope="col" class="th_selected"><input type="checkbox" :checked="select_state" @click="select_all()" /></th>
									<th scope="col" class="th_id"><span>#</span></th>
									<th scope="col">
										<mm_reverse title="上级" v-model="query.orderby" field="father_id" :func="search"></mm_reverse>
									</th>
									<th scope="col">
										<mm_reverse title="显示顺序" v-model="query.orderby" field="display" :func="search"></mm_reverse>
									</th>
									<th scope="col">
										<mm_reverse title="名称" v-model="query.orderby" field="name" :func="search"></mm_reverse>
									</th>
									<th scope="col">
										<mm_reverse title="部门" v-model="query.orderby" field="department" :func="search"></mm_reverse>
									</th>
									<th scope="col">
										<mm_reverse title="描述" v-model="query.orderby" field="description" :func="search"></mm_reverse>
									</th>
									<th scope="col" class="th_handle"><span>操作</span></th>
								</tr>
							</thead>
							<draggable v-model="list" tag="tbody" @change="sort_change">
								<tr v-for="(o, idx) in list" :key="idx" :class="{'active': select == idx}" @click="selected(idx)">
									<th scope="row"><input type="checkbox" :checked="select_has(o[field])" @click="select_change(o[field])" /></th>
									<td>
										<span>{{ o.admin_id }}</span>
									</td>
									<td>
										<span>{{ get_name(list_admin, o.father_id, 'admin_id', 'name') }}</span>
									</td>
									<td>
										<input class="td_display" v-model.number="o.display" @blur="set(o)" min="0" max="1000" />
									</td>
									<td>
										<span>{{ o.name }}</span>
									</td>
									<td>
										<span>{{ o.department }}</span>
									</td>
									<td>
										<span>{{ o.description }}</span>
									</td>
									<td>
										<mm_btn class="btn_primary" :url="'./admin_form?admin_id=' + o[field]">修改</mm_btn>
										<mm_btn class="btn_warning" @click.native="del_show(o, field)">删除</mm_btn>
									</td>
								</tr>
							</draggable>
						</mm_table>
					</mm_body>
					<footer>
						<mm_grid class="mm_data_count">
							<mm_col>
								<mm_select v-model="query.size" :options="$to_size()" @change="search()" />
							</mm_col>
							<mm_col width="50" style="min-width: 22.5rem;">
								<mm_pager display="2" v-model="query.page" :count="count / query.size" :func="goTo" :icons="['首页', '上一页', '下一页', '尾页']"></mm_pager>
							</mm_col>
							<mm_col>
								<div class="right plr">
									<span class="mr">共 {{ count }} 条</span>
									<span>当前</span>
									<input class="pager_now" v-model.number="page_now" @blur="goTo(page_now)" @change="page_change" />
									<span>/{{ page_count }}页</span>
								</div>
							</mm_col>
						</mm_grid>
					</footer>
				</mm_view>
			</mm_col>
		</mm_grid>
		<mm_modal v-model="show" mask="true">
			<mm_view class="card bg_no">
				<header class="bg_white">
					<h5>批量修改</h5>
				</header>
				<mm_body>
					<dl>
						<dt>上级</dt>
						<dd>
							<mm_select v-model="form.father_id" :options="$to_kv(list_admin, 'admin_id', 'name')" />
						</dd>
					</dl>
				</mm_body>
				<footer>
					<div class="mm_group">
						<button class="btn_default" type="reset" @click="show = false">取消</button>
						<button class="btn_primary" type="button" @click="batchSet()">提交</button>
					</div>
				</footer>
			</mm_view>
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
				url_get_list: "/apis/user/admin",
				url_del: "/apis/user/admin?method=del&",
				url_set: "/apis/user/admin?method=set&",
				field: "admin_id",
				query_set: {
					"admin_id": ""
				},
				// 查询条件
				query: {
					//页码
					page: 1,
					//页面大小
					size: 10,
					// 管理组ID
					'admin_id': 0,
					// 显示顺序——最小值
					'display_min': 0,
					// 显示顺序——最大值
					'display_max': 0,
					// 名称
					'name': '',
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
				// 上级
				'list_admin': [ ],
				// 视图模型
				vm: {}
			}
		},
		methods: {
			/**
			 * 获取上级
			 * @param {query} 查询条件
			 */
			get_admin(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "admin_id,name"
					};
				}
				this.$get('~/apis/user/admin?size=0', query, function(json) {
					if (json.result) {
						_this.list_admin .clear();
						_this.list_admin .addList(json.result.list)
					}
				});
			},
		},
		created() {
			// 获取上级
			this.get_admin();
		}
	}
</script>

<style>
</style>
