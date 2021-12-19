<template>
	<main id="user_team">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-12">
						<mm_card>
							<div class="card_head arrow">
								<h5></h5>
							</div>
							<div class="card_body">
								<mm_form class="bar_filter">
									<div class="title">
										<h5><span>筛选条件</span></h5>
									</div>
									<mm_list :col="3">
										<mm_item>
											<control_select type="list" v-model="query.user_id" title="用户"
												:options="$to_kv(list_account, 'user_id', 'phone')"
												@change="search()" />
										</mm_item>
										<mm_item>
											<mm_btn class="btn_primary-x" type="reset" @click.native="reset();search()">
												重置</mm_btn>
										</mm_item>
									</mm_list>
								</mm_form>
								<div class="bar_action">
									<h5><span>操作</span></h5>
									<div class="btns">
										<mm_btn class="btn_primary" @click.native="update_team()">
											更新团队
										</mm_btn>
									</div>
									<div class="btn_small">
										<control_file class="btn_default-x" type="excel" :func="import_db"
											v-if="url_import"></control_file>
										<mm_btn class="btn_default-x" @click.native="export_db()" v-if="url_export">导出
										</mm_btn>
									</div>
								</div>
								<mm_table type="3">
									<thead class="table-sm">
										<tr>
											<th class="th_open"></th>
											<th class="th_selected"><input type="checkbox" :checked="select_state"
													@click="select_all()" /></th>
											<th class="th_id"><span>#</span></th>
											<th class="th_user_id">
												<control_reverse title="用户" v-model="query.orderby" field="user_id"
													:func="search"></control_reverse>
											</th>
											<th class="th_referee_id">
												<control_reverse title="上级" v-model="query.orderby" field="referee_id"
													:func="search"></control_reverse>
											</th>
											<th class="th_branchs">
												<control_reverse title="子级" v-model="query.orderby" field="branchs"
													:func="search"></control_reverse>
											</th>
											<th class="th_servants">
												<control_reverse title="下级" v-model="query.orderby" field="servants"
													:func="search"></control_reverse>
											</th>
											<th class="th_time_create">
												<control_reverse title="创建时间" v-model="query.orderby"
													field="time_create" :func="search"></control_reverse>
											</th>
											<th class="th_time_update">
												<control_reverse title="更新时间" v-model="query.orderby"
													field="time_update" :func="search"></control_reverse>
											</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(o, idx) in list_new" :key="idx"
											:class="{'active': select == idx, sub: o['referee_id'], open: opens_has(o['user_id']), no_sub: !opens_has_sub(o['user_id']) }"
											@click="selected(idx)">

											<th class="th_open"><button class="btn_open"
													:style="'margin-left:' + (1.5 * opens_lv(o['referee_id'])) + 'rem;'"
													@click="opens_change(o['user_id'])"><i
														class="fa-caret-right"></i></button></th>

											<th class="th_selected"><input type="checkbox"
													:checked="select_has(o['user_id'])" @click="select_change(o['user_id'])" />
											</th>

											<td>{{ o['user_id'] }}</td>
											<td>
												<span>{{ $get_name(list_account, o.user_id, 'user_id', 'phone') }}</span>
											</td>
											<td>
												<span>{{ $get_name(list_account, o.referee_id, 'user_id', 'phone') }}</span>
											</td>
											<td>
												<div v-if="o.branchs.length > 0" class="center">
													<a @click="o.show1 = !o.show1">{{ o.show1 ? "收起" : "展开" }}</a>
													<div class="pt-1" v-show="o.show1" v-for="(o2 ,i2) in o.branchs">
														{{ $get_name(list_account, o2, 'user_id', 'phone') }}
													</div>
												</div>
											</td>
											<td>
												<div v-if="o.servants.length > 0" class="center">
													<a @click="o.show2 = !o.show2">{{ o.show2 ? "收起" : "展开" }}</a>
													<div class="pt-1" v-show="o.show2" v-for="(o2 ,i2) in o.servants">
														{{ $get_name(list_account, o2, 'user_id', 'phone') }}
													</div>
												</div>
											</td>
											<td>
												<span>{{ $to_time(o.time_create, 'yyyy-MM-dd hh:mm') }}</span>
											</td>
											<td>
												<span>{{ $to_time(o.time_update, 'yyyy-MM-dd hh:mm') }}</span>
											</td>
										</tr>
									</tbody>
								</mm_table>
							</div>
						</mm_card>
					</mm_col>
				</mm_row>
			</mm_container>
		</mm_warp>
	</main>
</template>

<script>
	import mixin from '/src/mixins/page.js';

	export default {
		mixins: [mixin],
		data() {
			return {
				// 列表请求地址
				url_get_list: "/apis/user/team",
				url_del: "/apis/user/team?method=del&",
				url_set: "/apis/user/team?method=set&",
				url_import: "/apis/user/team?method=import&",
				url_export: "/apis/user/team?method=export&",
				field: "user_id",
				query_set: {
					"team_id": ""
				},
				// 查询条件
				query: {
					"keyword": "",
					// 上级ID
					'referee_id': 0,
					//排序
					orderby: ""
				},
				form: {},
				//颜色
				arr_color: ['', '', 'font_yellow', 'font_success', 'font_warning', 'font_primary', 'font_info',
					'font_default'
				],
				// 用户
				'list_account': [],
				// 视图模型
				father_id: "referee_id",
				vm: {},
			}
		},
		methods: {
			/**
			 * 获取列表之前
			 * @param {Object} param 参数
			 */
			get_list_before(param) {
				delete param.page;
				param.size = "0";
				return param;
			},

			get_list_after(json, status) {
				json.result.list.map((o) => {
					o.branchs = JSON.parse(o.branchs);
					o.servants = JSON.parse(o.servants);
					o.show1 = false;
					o.show2 = false;
				});
			},
			/**
			 *  更新团队
			 */
			update_team() {
				this.$post("/apis/user/update_team", {}, (res) => {
					if (res.result) {
						this.$toast(res.result.tip);
					} else if (res.error) {
						this.$toast(res.error.message);
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
						field: "user_id,phone,referee_id"
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
		},
		computed: {
			list_new() {
				var list = [];
				var {
					keyword,
					referee_id
				} = this.query;
				
				if(this.list.length){
					if(!this.list[0].name)
					{
						this.list.map((o) => {
							o.name = this.list_account.getVal("phone" , {
								user_id: o.user_id
							});
						});
					}
				}
				
				if (keyword && referee_id) {
					return this.list.filter(function(o) {
						return o.referee_id == referee_id && (o.name.indexOf(keyword) !== -1 || o.name.indexOf(
							keyword) !== -1);
					});
				} else if (referee_id) {
					return this.list.filter(function(o) {
						return o.referee_id == referee_id;
					});
				} else if (keyword) {
					return this.list.filter(function(o) {
						return o.name.indexOf(keyword) !== -1 || o.name.indexOf(keyword) !== -1;
					});
				} else {
					var lt = this.list.toTree("user_id", 0, "referee_id").toList();
					var arr = this.opens;
					for (var i = 0; i < lt.length; i++) {
						var o = lt[i];
						if (this.opens.indexOf(o["referee_id"]) !== -1) {
							list.push(o);
						}
					}
					return list;
				}
			}
		}
	}
</script>

<style>
</style>
