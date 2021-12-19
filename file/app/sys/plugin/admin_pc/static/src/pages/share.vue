<template>
	<main id="sys_share">
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
											<control_input v-model="query.keyword" title="关键词" desc="配置名"
												@blur="search()" />
										</mm_item>
										<mm_item>
											<control_select v-model="query.available" title="是否启用"
												:options="$to_kv(arr_available)" @change="search()" />
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
										<mm_btn class="btn_primary-x" url="./share_form?">添加</mm_btn>
										<mm_btn @click.native="show = true" class="btn_primary-x"
											v-bind:class="{ 'disabled': !selects }">批量修改</mm_btn>
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
											<th class="th_available">
												<control_reverse title="是否启用" v-model="query.orderby" field="available"
													:func="search"></control_reverse>
											</th>
											<th class="th_name">
												<control_reverse title="配置名" v-model="query.orderby" field="name"
													:func="search"></control_reverse>
											</th>
											<th class="th_qrcode_pos_x">
												<control_reverse title="二维码X轴" v-model="query.orderby"
													field="qrcode_pos_x" :func="search"></control_reverse>
											</th>
											<th class="th_qrcode_pos_y">
												<control_reverse title="二维码Y轴" v-model="query.orderby"
													field="qrcode_pos_y" :func="search"></control_reverse>
											</th>
											<th class="th_qrcode_pos_way">
												<control_reverse title="二维码定位方式" v-model="query.orderby"
													field="qrcode_pos_way" :func="search"></control_reverse>
											</th>
											<th class="th_button_pos_x">
												<control_reverse title="按钮X轴" v-model="query.orderby"
													field="button_pos_x" :func="search"></control_reverse>
											</th>
											<th class="th_button_pos_y">
												<control_reverse title="按钮Y轴" v-model="query.orderby"
													field="button_pos_y" :func="search"></control_reverse>
											</th>
											<th class="th_button_pos_way">
												<control_reverse title="按钮定位方式" v-model="query.orderby"
													field="button_pos_way" :func="search"></control_reverse>
											</th>
											<th class="th_img_bg">
												<control_reverse title="分享背景图" v-model="query.orderby" field="img_bg"
													:func="search"></control_reverse>
											</th>
											<th class="th_background_color">
												<control_reverse title="背景颜色" v-model="query.orderby"
													field="background_color" :func="search"></control_reverse>
											</th>
											<th class="th_handle"><span>操作</span></th>
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
												<control_switch v-model="o.available" @click.native="set(o)" />
											</td>
											<td>
												<span>{{ o.name }}</span>
											</td>
											<td>
												<span>{{ o.qrcode_pos_x }}</span>
											</td>
											<td>
												<span>{{ o.qrcode_pos_y }}</span>
											</td>
											<td>
												<span>{{ o.qrcode_pos_way }}</span>
											</td>
											<td>
												<span>{{ o.button_pos_x }}</span>
											</td>
											<td>
												<span>{{ o.button_pos_y }}</span>
											</td>
											<td>
												<span>{{ o.button_pos_way }}</span>
											</td>
											<td>
												<img class="img_bg" :src="o.img_bg" alt="分享背景图" />
											</td>
											<td>
												<span>{{ o.background_color }}</span>
											</td>
											<td>
												<mm_btn class="btn_primary" :url="'./share_form?share_id=' + o[field]">
													修改</mm_btn>
												<mm_btn class="btn_warning" @click.native="del_show(o, field)">删除
												</mm_btn>
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
					<h5>批量修改</h5>
				</div>
				<div class="card_body pa">
					<dl>
						<dt>是否启用</dt>
						<dd>
							<control_select v-model="form.available" :options="$to_kv(arr_available)" />
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
				url_get_list: "/apis/sys/share",
				url_del: "/apis/sys/share?method=del&",
				url_set: "/apis/sys/share?method=set&",
				url_import: "/apis/sys/share?method=import&",
				url_export: "/apis/sys/share?method=export&",
				field: "share_id",
				query_set: {
					"share_id": ""
				},
				// 查询条件
				query: {
					//页码
					page: 1,
					//页面大小
					size: 10,
					// 分享ID
					'share_id': 0,
					// 是否启用
					'available': '',
					// 配置名
					'name': '',
					// 关键词
					'keyword': '',
					//排序
					orderby: ""
				},
				form: {},
				//颜色
				arr_color: ['', '', 'font_yellow', 'font_success', 'font_warning', 'font_primary', 'font_info',
					'font_default'
				],
				// 是否启用
				'arr_available': ["否", "是"],
				// 视图模型
				vm: {}
			}
		},
		methods: {},
		created() {}
	}
</script>

<style>
</style>
