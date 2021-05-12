<template>
	<main id="user_sns">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>社交账户</h5>
							</div>
							<div class="card_body">
								<mm_form class="bar_filter">
									<div class="title">
										<h5><span>筛选条件</span></h5>
									</div>
									<mm_list :col="3">
										<mm_item>
											<control_select v-model="query.qq_state" title="QQ认证" :options="$to_kv(arr_qq_state)" @change="search()" />
										</mm_item>
										<mm_item>
											<control_select v-model="query.wechat_state" title="微信认证" :options="$to_kv(arr_wechat_state)" @change="search()" />
										</mm_item>
										<mm_item>
											<control_select v-model="query.mm_state" title="MM认证" :options="$to_kv(arr_mm_state)" @change="search()" />
										</mm_item>
										<mm_item>
											<control_select v-model="query.baidu_state" title="百度认证" :options="$to_kv(arr_baidu_state)" @change="search()" />
										</mm_item>
										<mm_item>
											<control_select v-model="query.taobao_state" title="淘宝认证" :options="$to_kv(arr_taobao_state)" @change="search()" />
										</mm_item>
										<mm_item>
											<mm_btn class="btn_primary-x" type="reset" @click.native="reset();search()">重置</mm_btn>
										</mm_item>
									</mm_list>
								</mm_form>
								<div class="bar_action">
									<h5><span>操作</span></h5>
									<div class="">
										<mm_btn class="btn_primary-x" url="./sns_form">添加</mm_btn>
										<mm_btn @click.native="show = true" class="btn_primary-x" v-bind:class="{ 'disabled': !selects }">批量修改</mm_btn>
									</div>
								</div>
								<mm_table type="2">
									<thead class="table-sm">
										<tr>
											<th class="th_selected"><input type="checkbox" :checked="select_state" @click="select_all()" /></th>
											<th class="th_id"><span>#</span></th>
											<th>
												<control_reverse title="QQ号" v-model="query.orderby" field="qq" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="QQ认证" v-model="query.orderby" field="qq_state" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="微信号" v-model="query.orderby" field="wechat" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="微信认证" v-model="query.orderby" field="wechat_state" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="MM号" v-model="query.orderby" field="mm" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="MM认证" v-model="query.orderby" field="mm_state" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="百度账号" v-model="query.orderby" field="baidu" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="百度认证" v-model="query.orderby" field="baidu_state" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="淘宝账号" v-model="query.orderby" field="taobao" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="淘宝认证" v-model="query.orderby" field="taobao_state" :func="search"></control_reverse>
											</th>
											<th class="th_handle"><span>操作</span></th>
										</tr>
									</thead>
									<tbody>
										<!-- <draggable v-model="list" tag="tbody" @change="sort_change"> -->
										<tr v-for="(o, idx) in list" :key="idx" :class="{'active': select == idx}" @click="selected(idx)">
											<th scope="row"><input type="checkbox" :checked="select_has(o[field])" @click="select_change(o[field])" /></th>
											<td>
												<span>{{ o.user_id }}</span>
											</td>
											<td>
												<span>{{ o.qq }}</span>
											</td>
											<td>
												<control_switch v-model="o.qq_state" @click.native="set(o)" />
											</td>
											<td>
												<span>{{ o.wechat }}</span>
											</td>
											<td>
												<control_switch v-model="o.wechat_state" @click.native="set(o)" />
											</td>
											<td>
												<span>{{ o.mm }}</span>
											</td>
											<td>
												<control_switch v-model="o.mm_state" @click.native="set(o)" />
											</td>
											<td>
												<span>{{ o.baidu }}</span>
											</td>
											<td>
												<control_switch v-model="o.baidu_state" @click.native="set(o)" />
											</td>
											<td>
												<span>{{ o.taobao }}</span>
											</td>
											<td>
												<control_switch v-model="o.taobao_state" @click.native="set(o)" />
											</td>
											<td>
												<mm_btn class="btn_primary" :url="'./sns_form?user_id=' + o[field]">修改</mm_btn>
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
						<dt>QQ认证</dt>
						<dd>
							<control_select v-model="form.qq_state" :options="$to_kv(arr_qq_state)" />
						</dd>
						<dt>微信认证</dt>
						<dd>
							<control_select v-model="form.wechat_state" :options="$to_kv(arr_wechat_state)" />
						</dd>
						<dt>MM认证</dt>
						<dd>
							<control_select v-model="form.mm_state" :options="$to_kv(arr_mm_state)" />
						</dd>
						<dt>百度认证</dt>
						<dd>
							<control_select v-model="form.baidu_state" :options="$to_kv(arr_baidu_state)" />
						</dd>
						<dt>淘宝认证</dt>
						<dd>
							<control_select v-model="form.taobao_state" :options="$to_kv(arr_taobao_state)" />
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
				url_get_list: "/apis/user/sns",
				url_del: "/apis/user/sns?method=del&",
				url_set: "/apis/user/sns?method=set&",
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
					// QQ认证
					'qq_state': '',
					// 微信认证
					'wechat_state': '',
					// MM认证
					'mm_state': '',
					// 百度认证
					'baidu_state': '',
					// 淘宝认证
					'taobao_state': '',
					//排序
					orderby: ""
				},
				form: {},
				//颜色
				arr_color: ['', '', 'font_yellow', 'font_success', 'font_warning', 'font_primary', 'font_info', 'font_default'],
				// QQ认证
				'arr_qq_state': [ '未认证' , '已认证' ],
				// 微信认证
				'arr_wechat_state': [ '未认证' , '已认证' ],
				// MM认证
				'arr_mm_state': [ '未认证' , '已认证' ],
				// 百度认证
				'arr_baidu_state': [ '未认证' , '已认证' ],
				// 淘宝认证
				'arr_taobao_state': [ '未认证' , '已认证' ],
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
