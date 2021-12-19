<template>
	<main id="cms_article">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-12">
						<mm_card :class="{ 'hide_filter': !show_filter }">
							<div class="card_head arrow" @click="show_filter = !show_filter">
								<h5>文章</h5>
							</div>
							<div class="card_body">
								<mm_form class="bar_filter">
									<div class="title">
										<h5><span>筛选条件</span></h5>
									</div>
									<mm_list :col="3">
										<mm_item>
											<control_input v-model="query.keyword" title="关键词" desc="标题 / 描述 / 正文"
											 @blur="search()" />
										</mm_item>
										<mm_item>
											<control_select v-model="query.available" title="是否启用" :options="$to_kv(arr_available)" @change="search()" />
										</mm_item>
										<mm_item>
											<control_select v-model="query.state" title="状态" :options="$to_kv(arr_state)" @change="search()" />
										</mm_item>
										<mm_item>
											<control_select type="list" v-model="query.channel_id" title="频道" :options="$to_kv(list_article_channel, 'channel_id', 'title')" @change="search()" />
										</mm_item>
										<mm_item>
											<control_select type="list" v-model="query.user_id" title="用户" :options="$to_kv(list_account, 'user_id', 'phone')" @change="search()" />
										</mm_item>
										<mm_item>
											<mm_btn class="btn_primary-x" type="reset" @click.native="reset();search()">重置</mm_btn>
										</mm_item>
									</mm_list>
								</mm_form>
								<div class="bar_action">
									<h5><span>操作</span></h5>
									<div class="btns">
										<mm_btn class="btn_primary-x" url="./article_form?">添加</mm_btn>
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
											<th class="th_img">
												<control_reverse title="封面图" v-model="query.orderby" field="img" :func="search"></control_reverse>
											</th>
											<th class="th_title">
												<control_reverse title="标题" v-model="query.orderby" field="title" :func="search"></control_reverse>
											</th>
											<th class="th_available">
												<control_reverse title="是否启用" v-model="query.orderby" field="available" :func="search"></control_reverse>
											</th>
											<!-- <th class="th_state">
												<control_reverse title="状态" v-model="query.orderby" field="state" :func="search"></control_reverse>
											</th> -->
											<th class="th_channel_id">
												<control_reverse title="频道" v-model="query.orderby" field="channel_id" :func="search"></control_reverse>
											</th>
											<th class="th_display">
												<control_reverse title="排序" v-model="query.orderby" field="display" :func="search"></control_reverse>
											</th>
											<!-- <th class="th_user_id">
												<control_reverse title="用户" v-model="query.orderby" field="user_id" :func="search"></control_reverse>
											</th> -->
											<th class="th_time_create">
												<control_reverse title="创建时间" v-model="query.orderby" field="time_create" :func="search"></control_reverse>
											</th>
											<!-- <th class="th_time_update">
												<control_reverse title="更新时间" v-model="query.orderby" field="time_update" :func="search"></control_reverse>
											</th>
											<th class="th_description">
												<control_reverse title="描述" v-model="query.orderby" field="description" :func="search"></control_reverse>
											</th> -->
											<th class="th_handle"><span>操作</span></th>
										</tr>
									</thead>
									<tbody>
										<!-- <draggable v-model="list" tag="tbody" @change="sort_change"> -->
										<tr v-for="(o, idx) in list" :key="idx" :class="{'active': select == idx}" @click="selected(idx)">
											<th class="th_selected"><input type="checkbox" :checked="select_has(o[field])" @click="select_change(o[field])" /></th>
											<td>{{ o[field] }}</td>
											<td>
												<img class="img" :src="o.img" alt="封面图" />
											</td>
											<td>
												<span>{{ o.title }}</span>
											</td>
											<td>
												<control_switch v-model="o.available" @click.native="set(o)" />
											</td>
											<!-- <td>
												<span v-bind:class="arr_color[o.state]">{{arr_state[o.state] }}</span>
											</td> -->
											<td>
												<span>{{ $get_name(list_article_channel, o.channel_id, 'channel_id', 'title') }}</span>
											</td>
											<td>
												<input class="input_display" v-model.number="o.display" @blur="set(o)" min="0" max="1000" />
											</td>
											<!-- <td>
												<span>{{ $get_name(list_account, o.user_id, 'user_id', 'phone') }}</span>
											</td> -->
											<td>
												<span>{{ $to_time(o.time_create, 'yyyy-MM-dd hh:mm') }}</span>
											</td>
											<!-- <td>
												<span>{{ $to_time(o.time_update, 'yyyy-MM-dd hh:mm') }}</span>
											</td>
											<td>
												<span>{{ o.description }}</span>
											</td> -->
											<td>
												<mm_btn class="btn_primary" :url="'./article_form?article_id=' + o[field]">修改</mm_btn>
												<mm_btn class="btn_warning" @click.native="del_show(o, field)">删除</mm_btn>
											</td>
										</tr>
									</tbody>
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
						<dt>是否启用</dt>
						<dd>
							<control_select v-model="form.available" :options="$to_kv(arr_available)" />
						</dd>
						<dt>状态</dt>
						<dd>
							<control_select v-model="form.state" :options="$to_kv(arr_state)" />
						</dd>
						<dt>频道</dt>
						<dd>
								<control_select type="list" v-model="form.channel_id" :options="$to_kv(list_article_channel, 'channel_id', 'title')" />
						</dd>
						<dt>用户</dt>
						<dd>
								<control_select type="list" v-model="form.user_id" :options="$to_kv(list_account, 'user_id', 'phone')" />
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
				url_get_list: "/apis/cms/article",
				url_del: "/apis/cms/article?method=del&",
				url_set: "/apis/cms/article?method=set&",
				url_import: "/apis/cms/article?method=import&",
				url_export: "/apis/cms/article?method=export&",
				field: "article_id",
				query_set: {
					"article_id": ""
				},
				// 查询条件
				query: {
					//页码
					page: 1,
					//页面大小
					size: 10,
					// 文章id
					'article_id': 0,
					// 标题
					'title': '',
					// 是否启用
					'available': '',
					// 状态——最小值
					'state_min': '',
					// 状态——最大值
					'state_max': '',
					// 频道ID
					'channel_id': '',
					// 排序——最小值
					'display_min': 0,
					// 排序——最大值
					'display_max': 0,
					// 用户ID
					'user_id': '',
					// 创建时间——开始时间
					'time_create_min': '',
					// 创建时间——结束时间
					'time_create_max': '',
					// 更新时间——开始时间
					'time_update_min': '',
					// 更新时间——结束时间
					'time_update_max': '',
					// 描述
					'description': '',
					// 正文
					'content': '',
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
				// 状态
				'arr_state':["","正常","推荐","认证","违规","官方"],
				// 频道
				'list_article_channel':[],
				// 用户
				'list_account':[],
				// 视图模型
				vm: {}
			}
		},
		methods: {
			/**
			 * 获取频道
			 * @param {query} 查询条件
			 */
			get_article_channel(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "channel_id,title"
					};
				}
				this.$get('~/apis/cms/article_channel?size=0', query, function(json) {
					if (json.result) {
						_this.list_article_channel.clear();
						_this.list_article_channel.addList(json.result.list)
					}
				});
			},
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
			// 获取频道
			this.get_article_channel();
			// 获取用户
			this.get_account();
		}
	}
</script>

<style>
</style>
