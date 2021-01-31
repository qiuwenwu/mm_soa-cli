<template>
	<main id="user_account">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>用户账户</h5>
							</div>
							<div class="card_body">
								<mm_form class="mm_filter">
									<div class="title">
										<h5><span>筛选条件</span></h5>
									</div>
									<mm_list col="3">
										<mm_item>
											<mm_input v-model="query.keyword" title="关键词" desc="用户名 / 昵称"
											 @blur="search()" />
										</mm_item>
										<mm_item>
											<mm_select v-model="query.state" title="账户状态" :options="$to_kv(arr_state)" @change="search()" />
										</mm_item>
										<mm_item>
											<mm_select v-model="query.group_id" title="所在用户组" :options="$to_kv(list_group, 'group_id', 'name')"
											 @change="search()" />
										</mm_item>
										<mm_item>
											<mm_select v-model="query.admin_id" title="所在管理组" :options="$to_kv(list_admin, 'admin_id', 'name')"
											 @change="search()" />
										</mm_item>
										<mm_item>
											<mm_select v-model="query.referee_id" title="推荐人" :options="$to_kv(list_account, 'user_id', 'nickname')"
											 @change="search()" />
										</mm_item>
										<mm_item>
											<mm_select v-model="query.phone_state" title="手机认证" :options="$to_kv(arr_phone_state)" @change="search()" />
										</mm_item>
										<mm_item>
											<mm_select v-model="query.email_state" title="邮箱认证" :options="$to_kv(arr_email_state)" @change="search()" />
										</mm_item>
										<mm_item>
											<mm_btn class="btn_primary-x" type="reset" @click.native="reset();search()">重置</mm_btn>
										</mm_item>
									</mm_list>
								</mm_form>
								<div class="mm_action">
									<h5><span>操作</span></h5>
									<div class="btns">
										<mm_btn class="btn_primary-x" url="./account_form?">添加</mm_btn>
										<mm_btn @click.native="show = true" class="btn_primary-x" v-bind:class="{ 'disabled': !selects }">批量修改</mm_btn>
									</div>
									<div class="btn_small">
										<mm_file class="btn_default-x" type="excel" :func="import_db" v-if="url_import"></mm_file>
										<mm_btn class="btn_default-x" @click.native="export_db()" v-if="url_export">导出</mm_btn>
									</div>
								</div>
								<mm_table type="2">
									<thead class="table-sm">
										<tr>
											<th class="th_selected"><input type="checkbox" :checked="select_state" @click="select_all()" /></th>
											<th class="th_id"><span>#</span></th>
											<th>
												<mm_reverse title="账户状态" v-model="query.orderby" field="state" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="会员级别" v-model="query.orderby" field="vip" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="管理员级别" v-model="query.orderby" field="gm" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="商家级别" v-model="query.orderby" field="mc" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="所在用户组" v-model="query.orderby" field="group_id" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="所在管理组" v-model="query.orderby" field="admin_id" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="推荐人" v-model="query.orderby" field="referee_id" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="上次登录时间" v-model="query.orderby" field="login_time" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="邀请注册码" v-model="query.orderby" field="invite_code" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="手机号码" v-model="query.orderby" field="phone" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="手机认证" v-model="query.orderby" field="phone_state" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="用户名" v-model="query.orderby" field="username" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="昵称" v-model="query.orderby" field="nickname" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="邮箱" v-model="query.orderby" field="email" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="邮箱认证" v-model="query.orderby" field="email_state" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="上次登录IP" v-model="query.orderby" field="login_ip" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="个性签名" v-model="query.orderby" field="signature" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="头像地址" v-model="query.orderby" field="avatar" :func="search"></mm_reverse>
											</th>
											<th>
												<mm_reverse title="创建时间" v-model="query.orderby" field="create_time" :func="search"></mm_reverse>
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
												<span v-bind:class="arr_color[o.state]">{{arr_state[o.state] }}</span>
											</td>
											<td>
												<span>{{ o.vip }}</span>
											</td>
											<td>
												<span>{{ o.gm }}</span>
											</td>
											<td>
												<span>{{ o.mc }}</span>
											</td>
											<td>
												<span>{{ get_name(list_group, o.group_id, 'group_id', 'name') }}</span>
											</td>
											<td>
												<span>{{ get_name(list_admin, o.admin_id, 'admin_id', 'name') }}</span>
											</td>
											<td>
												<span>{{ get_name(list_account, o.referee_id, 'user_id', 'nickname') }}</span>
											</td>
											<td>
												<span>{{ $to_time(o.login_time, 'yyyy-MM-dd hh:mm') }}</span>
											</td>
											<td>
												<span>{{ o.invite_code }}</span>
											</td>
											<td>
												<span>{{ o.phone }}</span>
											</td>
											<td>
												<span>{{arr_phone_state[o.phone_state] }}</span>
											</td>
											<td>
												<span>{{ o.username }}</span>
											</td>
											<td>
												<span>{{ o.nickname }}</span>
											</td>
											<td>
												<span>{{ o.email }}</span>
											</td>
											<td>
												<span>{{arr_email_state[o.email_state] }}</span>
											</td>
											<td>
												<span>{{ o.login_ip }}</span>
											</td>
											<td>
												<span>{{ o.signature }}</span>
											</td>
											<td>
												<img class="avatar" :src="o.avatar" alt="头像地址" />
											</td>
											<td>
												<span>{{ $to_time(o.create_time, 'yyyy-MM-dd hh:mm') }}</span>
											</td>
											<td>
												<mm_btn class="btn_primary" :url="'./account_form?user_id=' + o[field]">修改</mm_btn>
												<mm_btn class="btn_warning" @click.native="del_show(o, field)">删除</mm_btn>
											</td>
										</tr>
									</tbody>
									<!-- </draggable> -->
								</mm_table>
							</div>
							<div class="card_foot">
								<div class="fl">
									<mm_select v-model="query.size" :options="$to_size()" @change="search()" />
								</div>
								<div class="fr">
									<span class="mr">共 {{ count }} 条</span>
									<span>当前</span>
									<input type="number" class="pager_now" v-model.number="page_now" @blur="goTo(page_now)" @change="page_change" />
									<span>/{{ page_count }}页</span>
								</div>
								<mm_pager display="2" v-model="query.page" :count="count / query.size" :func="goTo" :icons="['首页', '上一页', '下一页', '尾页']"></mm_pager>
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
						<dt>账户状态</dt>
						<dd>
							<mm_select v-model="form.state" :options="$to_kv(arr_state)" />
						</dd>
						<dt>所在用户组</dt>
						<dd>
							<mm_select v-model="form.group_id" :options="$to_kv(list_group, 'group_id', 'name')" />
						</dd>
						<dt>所在管理组</dt>
						<dd>
							<mm_select v-model="form.admin_id" :options="$to_kv(list_admin, 'admin_id', 'name')" />
						</dd>
						<dt>推荐人</dt>
						<dd>
							<mm_select v-model="form.referee_id" :options="$to_kv(list_account, 'user_id', 'nickname')" />
						</dd>
						<dt>手机认证</dt>
						<dd>
							<mm_select v-model="form.phone_state" :options="$to_kv(arr_phone_state)" />
						</dd>
						<dt>邮箱认证</dt>
						<dd>
							<mm_select v-model="form.email_state" :options="$to_kv(arr_email_state)" />
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
				url_get_list: "/apis/user/account",
				url_del: "/apis/user/account?method=del&",
				url_set: "/apis/user/account?method=set&",
				url_import: "/apis/user/account?method=import&",
				url_export: "/apis/user/account?method=export&",
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
					// 账户状态——最小值
					'state_min': '',
					// 账户状态——最大值
					'state_max': '',
					// 会员级别——最小值
					'vip_min': 0,
					// 会员级别——最大值
					'vip_max': 0,
					// 管理员级别——最小值
					'gm_min': 0,
					// 管理员级别——最大值
					'gm_max': 0,
					// 商家级别——最小值
					'mc_min': 0,
					// 商家级别——最大值
					'mc_max': 0,
					// 上次登录时间——开始时间
					'login_time_min': '',
					// 上次登录时间——结束时间
					'login_time_max': '',
					// 手机认证——最小值
					'phone_state_min': '',
					// 手机认证——最大值
					'phone_state_max': '',
					// 用户名
					'username': '',
					// 昵称
					'nickname': '',
					// 邮箱认证——最小值
					'email_state_min': '',
					// 邮箱认证——最大值
					'email_state_max': '',
					// 创建时间——开始时间
					'create_time_min': '',
					// 创建时间——结束时间
					'create_time_max': '',
					// 关键词
					'keyword': '',
					//排序
					orderby: ""
				},
				form: {},
				//颜色
				arr_color: ['', '', 'font_yellow', 'font_success', 'font_warning', 'font_primary', 'font_info', 'font_default'],
				// 账户状态
				'arr_state':["","可用","异常","已冻结","已注销"],
				// 所在用户组
				'list_group':[],
				// 所在管理组
				'list_admin':[],
				// 推荐人
				'list_account':[],
				// 手机认证
				'arr_phone_state':["未认证","审核中","已认证"],
				// 邮箱认证
				'arr_email_state':["未认证","审核中","已认证"],
				// 视图模型
				vm: {}
			}
		},
		methods: {
			/**
			 * 获取所在用户组
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
			/**
			 * 获取所在管理组
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
						_this.list_admin.clear();
						_this.list_admin.addList(json.result.list)
					}
				});
			},
			/**
			 * 获取推荐人
			 * @param {query} 查询条件
			 */
			get_account(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "user_id,nickname"
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
			// 获取所在用户组
			this.get_group();
			// 获取所在管理组
			this.get_admin();
			// 获取推荐人
			this.get_account();
		}
	}
</script>

<style>
</style>
