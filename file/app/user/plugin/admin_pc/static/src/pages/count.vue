<template>
	<main id="user_count">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>用户统计</h5>
							</div>
							<div class="card_body">
								<mm_form class="bar_filter">
									<div class="title">
										<h5><span>筛选条件</span></h5>
									</div>
									<mm_list :col="3">
										<mm_item>
											<mm_btn class="btn_primary-x" type="reset" @click.native="reset();search()">重置</mm_btn>
										</mm_item>
									</mm_list>
								</mm_form>
								<div class="bar_action">
									<h5><span>操作</span></h5>
									<div class="btns">
										<mm_btn class="btn_primary-x" url="./count_form?">添加</mm_btn>
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
												<control_reverse title="等级" v-model="query.orderby" field="level" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="IQ智商" v-model="query.orderby" field="iq" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="信用度" v-model="query.orderby" field="credit" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="积分" v-model="query.orderby" field="credit_points" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="经验值" v-model="query.orderby" field="exp" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="拓展积分1" v-model="query.orderby" field="extcredits1" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="拓展积分2" v-model="query.orderby" field="extcredits2" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="拓展积分3" v-model="query.orderby" field="extcredits3" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="拓展积分4" v-model="query.orderby" field="extcredits4" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="拓展积分5" v-model="query.orderby" field="extcredits5" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="拓展积分6" v-model="query.orderby" field="extcredits6" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="拓展积分7" v-model="query.orderby" field="extcredits7" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="拓展积分8" v-model="query.orderby" field="extcredits8" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="钱" v-model="query.orderby" field="money" :func="search"></control_reverse>
											</th>
											<th>
												<control_reverse title="货币" v-model="query.orderby" field="coin" :func="search"></control_reverse>
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
												<span>{{ o.level }}</span>
											</td>
											<td>
												<span>{{ o.iq }}</span>
											</td>
											<td>
												<span>{{ o.credit }}</span>
											</td>
											<td>
												<span>{{ o.credit_points }}</span>
											</td>
											<td>
												<span>{{ o.exp }}</span>
											</td>
											<td>
												<span>{{ o.extcredits1 }}</span>
											</td>
											<td>
												<span>{{ o.extcredits2 }}</span>
											</td>
											<td>
												<span>{{ o.extcredits3 }}</span>
											</td>
											<td>
												<span>{{ o.extcredits4 }}</span>
											</td>
											<td>
												<span>{{ o.extcredits5 }}</span>
											</td>
											<td>
												<span>{{ o.extcredits6 }}</span>
											</td>
											<td>
												<span>{{ o.extcredits7 }}</span>
											</td>
											<td>
												<span>{{ o.extcredits8 }}</span>
											</td>
											<td>
												<span>{{ o.money }}</span>
											</td>
											<td>
												<span>{{ o.coin }}</span>
											</td>
											<td>
												<mm_btn class="btn_primary" :url="'./count_form?user_id=' + o[field]">修改</mm_btn>
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
				url_get_list: "/apis/user/count",
				url_del: "/apis/user/count?method=del&",
				url_set: "/apis/user/count?method=set&",
				url_import: "/apis/user/count?method=import&",
				url_export: "/apis/user/count?method=export&",
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
					// 等级——最小值
					'level_min': 0,
					// 等级——最大值
					'level_max': 0,
					// IQ智商——最小值
					'iq_min': 0,
					// IQ智商——最大值
					'iq_max': 0,
					// 信用度——最小值
					'credit_min': 0,
					// 信用度——最大值
					'credit_max': 0,
					// 积分——最小值
					'credit_points_min': 0,
					// 积分——最大值
					'credit_points_max': 0,
					// 经验值——最小值
					'exp_min': 0,
					// 经验值——最大值
					'exp_max': 0,
					// 拓展积分1——最小值
					'extcredits1_min': 0,
					// 拓展积分1——最大值
					'extcredits1_max': 0,
					// 拓展积分2——最小值
					'extcredits2_min': 0,
					// 拓展积分2——最大值
					'extcredits2_max': 0,
					// 拓展积分3——最小值
					'extcredits3_min': 0,
					// 拓展积分3——最大值
					'extcredits3_max': 0,
					// 拓展积分4——最小值
					'extcredits4_min': 0,
					// 拓展积分4——最大值
					'extcredits4_max': 0,
					// 拓展积分5——最小值
					'extcredits5_min': 0,
					// 拓展积分5——最大值
					'extcredits5_max': 0,
					// 拓展积分6——最小值
					'extcredits6_min': 0,
					// 拓展积分6——最大值
					'extcredits6_max': 0,
					// 拓展积分7——最小值
					'extcredits7_min': 0,
					// 拓展积分7——最大值
					'extcredits7_max': 0,
					// 拓展积分8——最小值
					'extcredits8_min': 0,
					// 拓展积分8——最大值
					'extcredits8_max': 0,
					// 钱——最小值
					'money_min': 0,
					// 钱——最大值
					'money_max': 0,
					// 货币——最小值
					'coin_min': 0,
					// 货币——最大值
					'coin_max': 0,
					//排序
					orderby: ""
				},
				form: {},
				//颜色
				arr_color: ['', '', 'font_yellow', 'font_success', 'font_warning', 'font_primary', 'font_info', 'font_default'],
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
