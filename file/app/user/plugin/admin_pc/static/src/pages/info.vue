<template>
	<main id="user_info">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>用户信息</h5>
							</div>
							<div class="card_body">
								<mm_form class="bar_filter">
									<div class="title">
										<h5><span>筛选条件</span></h5>
									</div>
									<mm_list :col="3">
										<mm_item>
											<control_input v-model="query.keyword" title="关键词" desc="姓名"
												@blur="search()" />
										</mm_item>
										<mm_item>
											<control_select v-model="query.idcard_state" title="身份实名认证"
												:options="$to_kv(arr_idcard_state)" @change="search()" />
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
										<mm_btn class="btn_primary-x" url="./info_form?">添加</mm_btn>
									</div>
									<div class="btn_small">
										<control_file class="btn_default-x" type="excel" :func="import_db"
											v-if="url_import"></control_file>
										<mm_btn class="btn_default-x" @click.native="export_db()" v-if="url_export">导出
										</mm_btn>
									</div>
								</div>
								<mm_table type="2">
									<thead class="table-sm">
										<tr>
											<th class="th_selected"><input type="checkbox" :checked="select_state"
													@click="select_all()" /></th>
											<th class="th_id"><span>#</span></th>
											<th class="th_name">
												<control_reverse title="姓名" v-model="query.orderby" field="name"
													:func="search"></control_reverse>
											</th>
											<th class="th_idcard">
												<control_reverse title="身份证号" v-model="query.orderby" field="idcard"
													:func="search"></control_reverse>
											</th>
											<th class="th_img_idcard_front">
												<control_reverse title="身份证正面" v-model="query.orderby"
													field="img_idcard_front" :func="search"></control_reverse>
											</th>
											<th class="th_img_idcard_back">
												<control_reverse title="身份证反面" v-model="query.orderby"
													field="img_idcard_back" :func="search"></control_reverse>
											</th>
											<th class="th_img_hand_held">
												<control_reverse title="手持身份证" v-model="query.orderby"
													field="img_hand_held" :func="search"></control_reverse>
											</th>
											<th class="th_idcard_state">
												<control_reverse title="身份实名认证" v-model="query.orderby"
													field="idcard_state" :func="search"></control_reverse>
											</th>
											<th class="th_handle"><span>操作</span></th>
											<th class="th_note">
												<control_reverse title="备注" v-model="query.orderby" field="note"
													:func="search"></control_reverse>
											</th>
										</tr>
									</thead>
									<tbody>
										<!-- <draggable v-model="list" tag="tbody" @change="sort_change"> -->
										<tr v-for="(o, idx) in list" :key="idx" :class="{'active': select == idx}"
											@click="selected(idx)">
											<th class="th_selected"><input type="checkbox"
													:checked="select_has(o[field])" @click="select_change(o[field])" />
											</th>
											<td>{{ o[field] }}</td>
											<td>
												<span>{{ o.name }}</span>
											</td>
											<td>
												<span>{{ o.idcard }}</span>
											</td>
											<td>
												<a @click="enlarge(o.img_idcard_front ,'身份证正面')">
													<img class="img_idcard_front" :src="o.img_idcard_front"
														alt="身份证正面" />
												</a>
											</td>
											<td>
												<a @click="enlarge(o.img_idcard_back ,'身份证反面')">
													<img class="img_idcard_back" :src="o.img_idcard_back" alt="身份证反面" />
												</a>
											</td>
											<td>
												<a @click="enlarge(o.img_hand_held ,'手持身份证')">
													<img class="img_hand_held" :src="o.img_hand_held" alt="手持身份证" />
												</a>
											</td>
											<td>
												<control_select v-if="o.idcard_state === 2" v-model="o.idcard_state" @change="set(o)" :options="$to_kv(arr_idcard_state)" />
												<span v-else>
													{{ arr_idcard_state[o.idcard_state] }}
												</span>
											</td>
											<td>
												<mm_btn class="btn_primary" :url="'./info_form?user_id=' + o[field]">修改
												</mm_btn>
											</td>
											<td>
												<span>{{ o.note }}</span>
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
									<input type="number" class="pager_now" v-model.number="page_now"
										@blur="goTo(page_now)" @change="page_change" />
									<span>/{{ page_count }}页</span>
								</div>
								<control_pager display="2" v-model="query.page" :count="count / query.size" :func="goTo"
									:icons="['首页', '上一页', '下一页', '尾页']"></control_pager>
							</div>
						</mm_card>
					</mm_col>
				</mm_row>
			</mm_container>
		</mm_warp>

		<mm_modal v-model="show" mask="true">
			<mm_card class="card">
				<div class="card_head">
					<h5>{{ big_img.title }}</h5>
				</div>
				<div class="card_body">
					<div class="img_box">
						<img :src="big_img.src" />
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
				url_get_list: "/apis/user/info",
				url_del: "/apis/user/info?method=del&",
				url_set: "/apis/user/info?method=set&",
				url_import: "/apis/user/info?method=import&",
				url_export: "/apis/user/info?method=export&",
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
					// 性别——最小值
					'sex_min': '',
					// 性别——最大值
					'sex_max': '',
					// 年龄——最小值
					'age_min': 0,
					// 年龄——最大值
					'age_max': 0,
					// 身份实名认证——最小值
					'idcard_state_min': '',
					// 身份实名认证——最大值
					'idcard_state_max': '',
					// 省份ID
					'province_id': '',
					// 所在城市ID
					'city_id': '',
					// 生日——开始时间
					'birthday_min': '',
					// 生日——结束时间
					'birthday_max': '',
					// 姓名
					'name': '',
					// 关键词
					'keyword': '',
					//排序
					orderby: ""
				},

				big_img: {
					title: "",
					src: ""
				},

				form: {},
				//颜色
				arr_color: ['', '', 'font_yellow', 'font_success', 'font_warning', 'font_primary', 'font_info',
					'font_default'
				],
				// 性别
				'arr_sex': ["未设置", "男", "女"],
				// 身份实名认证
				'arr_idcard_state': ["", "未认证", "认证中", "认证通过", "驳回"],
				// 省份
				'list_address_province': [],
				// 所在城市
				'list_address_city': [],
				// 视图模型
				vm: {}
			}
		},
		methods: {
			
			/**
			 *  修改前事件
			 *  @param {Object} p
			 */
			set_before(param ,includeZero){
				// 克隆
				let p = Object.assign({} ,param);
				let birthday = param.birthday.toTime();
				p.birthday = birthday.toStr("yyyy-MM-dd");
				
				// 删除无用参
				var pm = $.delete(p, includeZero);
				for (var k in pm) {
					if (k.toLocaleLowerCase().indexOf('time') !== -1 && typeof(pm[k]) === 'string' && pm[k].indexOf('T') !== -1) {
						pm[k] = new Date(pm[k]).toStr('yyyy-MM-dd 00:00:00');
					}
				}
				return pm;
			},
			
			/**
			 *  展开大图
			 */
			enlarge(src = "", title = "") {
				this.show = true;
				this.big_img = {
					title,
					src
				};
			},

			/**
			 * 获取省份
			 * @param {query} 查询条件
			 */
			get_address_province(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "province_id,name"
					};
				}
				this.$get('~/apis/sys/address_province?size=0', query, function(json) {
					if (json.result) {
						_this.list_address_province.clear();
						_this.list_address_province.addList(json.result.list)
					}
				});
			},
			/**
			 * 获取所在城市
			 * @param {query} 查询条件
			 */
			get_address_city(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "city_id,name"
					};
				}
				this.$get('~/apis/sys/address_city?size=0', query, function(json) {
					if (json.result) {
						_this.list_address_city.clear();
						_this.list_address_city.addList(json.result.list)
					}
				});
			},
		},
		created() {
			// 获取省份
			this.get_address_province();
			// 获取所在城市
			this.get_address_city();
		}
	}
</script>

<style>
	.mm_modal .modal_main {
		max-width: 50rem;
		width: 100%;
		min-width: 20rem;
	}

	.mm_modal .mm_card {
		max-width: 50rem;
		width: 100%;
		min-width: 20rem;
		
		flex-direction: column;
		display: flex;
		flex: 1;
	}
	
	.mm_modal .card_body .img_box {
		overflow-y: scroll;
		display: block;
		
		max-height: calc(40rem - 4.5rem);
		width: calc(100% - 2rem);
		margin: 1rem auto;
	}
	
	.mm_modal .card_body img {
		height: 100%;
		width: 100%;
	}
</style>
