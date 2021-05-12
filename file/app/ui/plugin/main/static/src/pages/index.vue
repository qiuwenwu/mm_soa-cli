<template>
	<mm_page id="page_root" class="mobile">
		<header>
			<mm_warp>
				<mm_container>
					<mm_row>
						<mm_col width="100">
							<mm_view>
								<h3>
									<span>MM-UI组件示例</span>
									<router-link to="/design" class="arrow" style="position: relative;">
										<span>点击查看</span> <span class="font_primary">设计规范</span>
									</router-link>
								</h3>
							</mm_view>
						</mm_col>
					</mm_row>
				</mm_container>
			</mm_warp>
		</header>
		<main>
			<mm_warp>
				<mm_container>
					<mm_row class="row-lg-3 row-md-2 row-sm-1">
						<mm_col width="100">
							<div class="center">基础组件</div>
						</mm_col>
						<mm_col>
							<mm_card>
								<div class="card_head">内容容器</div>
								<div class="card_body">
									<mm_list col="1" class="item-lr content-right">
										<item_base class="arrow" v-for="(o, idx) in content" :key="idx" :obj="o"
											:viewmodel="{content:'name'}"
											:class="{ 'font_success': o.progress == 100, 'font_info': o.progress > 0 && o.progress < 100 }">
										</item_base>
									</mm_list>
								</div>
							</mm_card>
						</mm_col>
						<mm_col>
							<mm_card>
								<div class="card_head">布局容器</div>
								<div class="card_body">
									<mm_list col="1" class="item-lr content-right">
										<item_base class="arrow" v-for="(o, idx) in layout" :key="idx" :obj="o"
											:viewmodel="{content:'name'}"
											:class="{ 'font_success': o.progress == 100, 'font_info': o.progress > 0 && o.progress < 100 }">
										</item_base>
									</mm_list>
								</div>
							</mm_card>
						</mm_col>
						<mm_col>
							<mm_card>
								<div class="card_head">控件</div>
								<div class="card_body">
									<mm_list col="1" class="item-lr content-right">
										<item_base class="arrow" v-for="(o, idx) in control" :key="idx" :obj="o"
											:viewmodel="{content:'name'}"
											:class="{ 'font_success': o.progress == 100, 'font_info': o.progress > 0 && o.progress < 100 }">
										</item_base>
									</mm_list>
								</div>
							</mm_card>
						</mm_col>
					</mm_row>
					<mm_row class="row-lg-3 row-md-2 row-sm-1">
						<mm_col width="100">
							<div class="center mt">复合组件</div>
						</mm_col>
						<mm_col>
							<mm_card>
								<div class="card_head">栏</div>
								<div class="card_body">
									<mm_list col="1" class="item-lr content-right">
										<item_base class="arrow" v-for="(o, idx) in bar" :key="idx" :obj="o"
											:viewmodel="{content:'name'}"
											:class="{ 'font_success': o.progress == 100, 'font_info': o.progress > 0 && o.progress < 100 }">
										</item_base>
									</mm_list>
								</div>
							</mm_card>
						</mm_col>
						<mm_col>
							<mm_card>
								<div class="card_head">列表</div>
								<div class="card_body">
									<mm_list col="1" class="item-lr content-right">
										<item_base class="arrow" v-for="(o, idx) in list" :key="idx" :obj="o"
											:viewmodel="{content:'name'}"
											:class="{ 'font_success': o.progress == 100, 'font_info': o.progress > 0 && o.progress < 100 }">
										</item_base>
									</mm_list>
								</div>
							</mm_card>
						</mm_col>
						<mm_col>
							<mm_card>
								<div class="card_head">导航</div>
								<div class="card_body">
									<mm_list col="1" class="item-lr content-right">
										<item_base class="arrow" v-for="(o, idx) in nav" :key="idx" :obj="o"
											:viewmodel="{content:'name'}"
											:class="{ 'font_success': o.progress == 100, 'font_info': o.progress > 0 && o.progress < 100 }">
										</item_base>
									</mm_list>
								</div>
							</mm_card>
						</mm_col>
						<mm_col>
							<mm_card>
								<div class="card_head">轮播</div>
								<div class="card_body">
									<mm_list col="1" class="item-lr content-right">
										<item_base class="arrow" v-for="(o, idx) in swiper" :key="idx" :obj="o"
											:viewmodel="{content:'name'}"
											:class="{ 'font_success': o.progress == 100, 'font_info': o.progress > 0 && o.progress < 100 }">
										</item_base>
									</mm_list>
								</div>
							</mm_card>
						</mm_col>
						<mm_col>
							<mm_card>
								<div class="card_head">图表</div>
								<div class="card_body">
									<mm_list col="1" class="item-lr content-right">
										<item_base class="arrow" v-for="(o, idx) in chart" :key="idx" :obj="o"
											:viewmodel="{content:'name'}"
											:class="{ 'font_success': o.progress == 100, 'font_info': o.progress > 0 && o.progress < 100 }">
										</item_base>
									</mm_list>
								</div>
							</mm_card>
						</mm_col>
						<mm_col>
							<mm_card>
								<div class="card_head">拓展</div>
								<div class="card_body">
									<mm_list col="1" class="item-lr content-right">
										<item_base class="arrow" v-for="(o, idx) in expand" :key="idx" :obj="o"
											:viewmodel="{content:'name'}"
											:class="{ 'font_success': o.progress == 100, 'font_info': o.progress > 0 && o.progress < 100 }">
										</item_base>
									</mm_list>
								</div>
							</mm_card>
						</mm_col>
						<mm_col>
							<mm_card>
								<div class="card_head">表单</div>
								<div class="card_body">
									<mm_list col="1" class="item-lr content-right">
										<item_base class="arrow" v-for="(o, idx) in form" :key="idx" :obj="o"
											:viewmodel="{content:'name'}"
											:class="{ 'font_success': o.progress == 100, 'font_info': o.progress > 0 && o.progress < 100 }">
										</item_base>
									</mm_list>
								</div>
							</mm_card>
						</mm_col>
						<mm_col>
							<mm_card>
								<div class="card_head">表格</div>
								<div class="card_body">
									<mm_list col="1" class="item-lr content-right">
										<item_base class="arrow" v-for="(o, idx) in table" :key="idx" :obj="o"
											:viewmodel="{content:'name'}"
											:class="{ 'font_success': o.progress == 100, 'font_info': o.progress > 0 && o.progress < 100 }">
										</item_base>
									</mm_list>
								</div>
							</mm_card>
						</mm_col>
					</mm_row>
				</mm_container>
			</mm_warp>
		</main>
	</mm_page>
</template>

<script>
	export default {
		data() {
			return {
				bar: [{
						title: "操作栏",
						name: "bar_action",
						url: "/bar/action",
						progress: 0
					},
					{
						title: "广告栏",
						name: "bar_ad",
						url: "/bar/ad",
						progress: 10
					},
					{
						title: "购买栏",
						name: "bar_buy",
						url: "/bar/buy",
						progress: 0
					},
					{
						title: "聊天栏",
						name: "bar_chat",
						url: "/bar/chat",
						progress: 0
					},
					{
						title: "结算栏",
						name: "bar_count",
						url: "/bar/count",
						progress: 0
					},
					{
						title: "筛选栏",
						name: "bar_filter",
						url: "/bar/filter",
						progress: 10
					},
					{
						title: "菜单栏",
						name: "bar_menu",
						url: "/bar/menu",
						progress: 10
					},
					{
						title: "搜索栏",
						name: "bar_search",
						url: "/bar/search",
						progress: 0
					},
					{
						title: "排序栏",
						name: "bar_sort",
						url: "/bar/sort",
						progress: 10
					},
					{
						title: "标签栏",
						name: "bar_tab",
						url: "/bar/tab",
						progress: 100
					},
					{
						title: "标题栏",
						name: "bar_title",
						url: "/bar/title",
						progress: 10
					},
					{
						title: "工具栏",
						name: "bar_tool",
						url: "/bar/tool",
						progress: 10
					},
					{
						title: "用户栏",
						name: "bar_user",
						url: "/bar/user",
						progress: 0
					}
				],
				chart: [{
						title: "条形图",
						name: "chart_bar",
						url: "/chart/bar",
						progress: 0
					},
					{
						title: "深度图",
						name: "chart_depth",
						url: "/chart/depth",
						progress: 0
					},
					{
						title: "K线图",
						name: "chart_k",
						url: "/chart/k",
						progress: 0
					},
					{
						title: "条形图",
						name: "chart_line",
						url: "/chart/line",
						progress: 0
					},
					{
						title: "仪表盘",
						name: "chart_panel",
						url: "/chart/panel",
						progress: 0
					},
					{
						title: "饼形图",
						name: "chart_pie",
						url: "/chart/pie",
						progress: 0
					}
				],
				content: [{
						title: "按钮",
						name: "mm_btn",
						url: "/content/btn",
						progress: 100
					},
					{
						title: "图标",
						name: "mm_icon",
						url: "/content/icon",
						progress: 100
					},
					{
						title: "加载",
						name: "mm_loading",
						url: "/content/loading",
						progress: 100
					},
					{
						title: "颜色",
						name: "mm_color",
						url: "/content/color",
						progress: 100
					}
				],
				layout: [{
						title: "栅格",
						name: "mm_row",
						url: "/layout/grid",
						progress: 100
					},
					{
						title: "列表",
						name: "mm_list",
						url: "/layout/list",
						progress: 100
					},
					{
						title: "表格",
						name: "mm_table",
						url: "/layout/table",
						progress: 100
					},
					{
						title: "组合框",
						name: "mm_group",
						url: "/layout/group",
						progress: 100
					},
					{
						title: "块",
						name: "mm_card",
						url: "/layout/div",
						progress: 100
					},
					{
						title: "模态窗",
						name: "mm_modal",
						url: "/layout/modal",
						progress: 100
					}
				],
				control: [{
						title: "复选框",
						name: "control_checkbox",
						url: "/control/checkbox",
						progress: 100
					},
					{
						title: "单选框",
						name: "control_radio",
						url: "/control/radio",
						progress: 100
					},
					{
						title: "输入框",
						name: "control_input",
						url: "/control/input",
						progress: 100
					},
					{
						title: "计数器",
						name: "control_number",
						url: "/control/number",
						progress: 100
					},
					{
						title: "选择框",
						name: "control_select",
						url: "/control/select",
						progress: 100
					},
					{
						title: "开关",
						name: "control_switch",
						url: "/control/switch",
						progress: 100
					},
					{
						title: "反转器",
						name: "control_reverse",
						url: "/control/reverse",
						progress: 100
					},
					{
						title: "分页器",
						name: "control_pager",
						url: "/control/pager",
						progress: 100
					},
					{
						title: "日期选择器",
						name: "control_date",
						url: "/control/date",
						progress: 0
					},
					{
						title: "地址选择器",
						name: "control_address",
						url: "/control/address",
						progress: 0
					},
					{
						title: "富文本编辑器",
						name: "control_rich",
						url: "/control/rich",
						progress: 100
					}
				],
				expand: [{
						title: "拖拽",
						name: "expand_drag",
						url: "/expand/drag",
						progress: 50
					},
					{
						title: "支付",
						name: "expand_pay",
						url: "/expand/pay",
						progress: 0
					},
					{
						title: "源代码",
						name: "expand_pre",
						url: "/expand/pre",
						progress: 100
					},
					{
						title: "二维码",
						name: "expand_qrcode",
						url: "/expand/qrcode",
						progress: 100
					},
					{
						title: "精灵",
						name: "expand_sptite",
						url: "/expand/sptite",
						progress: 100
					}
				],
				nav: [{
						title: "主导航",
						name: "nav_main",
						url: "/nav/main",
						progress: 100
					},
					{
						title: "侧边导航",
						name: "nav_side",
						url: "/nav/side",
						progress: 100
					},
					{
						title: "顶部导航",
						name: "nav_top",
						url: "/nav/top",
						progress: 0
					},
					{
						title: "底部导航",
						name: "nav_bottom",
						url: "/nav/bottom",
						progress: 100
					},
					{
						title: "快捷导航",
						name: "nav_quick",
						url: "/nav/quick",
						progress: 100
					},
					{
						title: "用户导航",
						name: "nav_user",
						url: "/nav/user",
						progress: 100
					}
				],
				form: [{
						title: "注册",
						name: "form_register",
						url: "/form/register",
						progress: 0
					},
					{
						title: "登录",
						name: "form_login",
						url: "/form/login",
						progress: 0
					},
					{
						title: "找回密码",
						name: "form_forgot",
						url: "/form/forgot",
						progress: 0
					},
					{
						title: "修改密码",
						name: "form_password",
						url: "/form/password",
						progress: 0
					}
				],
				list: [{
						title: "基础列表",
						name: "list_base",
						url: "/list/base",
						progress: 100
					},
					{
						title: "图片列表",
						name: "list_image",
						url: "/list/image",
						progress: 100
					},
					{
						title: "文章列表",
						name: "list_article",
						url: "/list/article",
						progress: 100
					},
					{
						title: "通讯录列表",
						name: "list_contact",
						url: "/list/contact",
						progress: 100
					},
					{
						title: "消息列表",
						name: "list_message",
						url: "/list/message",
						progress: 100
					},
					{
						title: "新闻列表",
						name: "list_news",
						url: "/list/news",
						progress: 100
					},
					{
						title: "号码列表",
						name: "list_number",
						url: "/list/number",
						progress: 100
					},
					{
						title: "商品列表",
						name: "list_goods",
						url: "/list/goods",
						progress: 100
					},
					{
						title: "问答列表",
						name: "list_question",
						url: "/list/question",
						progress: 100
					},
					{
						title: "用户列表",
						name: "list_user",
						url: "/list/user",
						progress: 100
					},
					{
						title: "视频列表",
						name: "list_video",
						url: "/list/video",
						progress: 100
					},
					{
						title: "音乐列表",
						name: "list_music",
						url: "/list/music",
						progress: 100
					}
				],
				swiper: [{
						title: "卡片轮播",
						name: "swiper_card",
						url: "/swiper/card",
						progress: 100
					},
					{
						title: "旋转卡片轮播",
						name: "swiper_rotate_card",
						url: "/swiper/rotate_card",
						progress: 80
					},
					{
						title: "图片轮播",
						name: "swiper_image",
						url: "/swiper/image",
						progress: 100
					},
					{
						title: "文本轮播",
						name: "swiper_text",
						url: "/swiper/text",
						progress: 100
					},
					{
						title: "页面轮播",
						name: "swiper_page",
						url: "/swiper/page",
						progress: 100
					},
					{
						title: "页面竖直轮播",
						name: "swiper_vertical_page",
						url: "/swiper/vertical_page",
						progress: 100
					},
					{
						title: "菜单轮播",
						name: "swiper_menu",
						url: "/swiper/menu",
						progress: 100
					}
				],
				table: [{
						title: "货币",
						name: "table_coin",
						url: "/table/coin",
						progress: 0
					},
					{
						title: "股票",
						name: "table_stock",
						url: "/table/stock",
						progress: 0
					},
					{
						title: "挂单",
						name: "table_resting_order",
						url: "/table/resting_order",
						progress: 0
					},
					{
						title: "买卖",
						name: "table_buy_sell",
						url: "/table/buy_sell",
						progress: 0
					}
				]
			}
		}
	}
</script>

<style>
	#page_root h3 a {
		font-size: 1rem;
		float: right;
		color: #999;
	}

	#page_root h3 .font_info {
		font-weight: 600;
	}

	#page_root h4 {
		margin: auto;
		padding-bottom: 1rem;
	}
</style>
