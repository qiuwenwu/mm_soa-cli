define(["Vue", "VueRouter"], function(Vue, VueRouter) {
	"use strict";

	VueRouter.prototype.goBack = function() {
		this.isBack = true;
		window.history.go(-1);
	};
	Vue.use(VueRouter);
	var routes = [{
			// 首页
			path: "/",
			component: function(resolve) {
				return require(['vue!./pages/index.vue'], resolve);
			}
		},
		{
			// 设计规范
			path: "/design",
			component: function(resolve) {
				return require(['vue!./pages/design.vue'], resolve);
			}
		},

		/* 栏目 */
		{
			// 操作栏
			path: "/bar/action",
			component: function(resolve) {
				return require(['vue!./pages/bar/action.vue'], resolve);
			}
		},
		{
			// 广告栏
			path: "/bar/ad",
			component: function(resolve) {
				return require(['vue!./pages/bar/ad.vue'], resolve);
			}
		},
		{
			// 购物栏
			path: "/bar/buy",
			component: function(resolve) {
				return require(['vue!./pages/bar/buy.vue'], resolve);
			}
		},
		{
			// 聊天栏
			path: "/bar/chat",
			component: function(resolve) {
				return require(['vue!./pages/bar/chat.vue'], resolve);
			}
		},
		{
			// 结算栏
			path: "/bar/count",
			component: function(resolve) {
				return require(['vue!./pages/bar/count.vue'], resolve);
			}
		},
		{
			// 筛选栏
			path: "/bar/filter",
			component: function(resolve) {
				return require(['vue!./pages/bar/filter.vue'], resolve);
			}
		},
		{
			// 菜单栏
			path: "/bar/menu",
			component: function(resolve) {
				return require(['vue!./pages/bar/menu.vue'], resolve);
			}
		},
		{
			// 搜索栏
			path: "/bar/search",
			component: function(resolve) {
				return require(['vue!./pages/bar/search.vue'], resolve);
			}
		},
		{
			// 排序栏
			path: "/bar/sort",
			component: function(resolve) {
				return require(['vue!./pages/bar/sort.vue'], resolve);
			}
		},
		{
			// 标签栏
			path: "/bar/tab",
			component: function(resolve) {
				return require(['vue!./pages/bar/tab.vue'], resolve);
			}
		},
		{
			// 标题栏
			path: "/bar/title",
			component: function(resolve) {
				return require(['vue!./pages/bar/title.vue'], resolve);
			}
		},
		{
			// 工具栏
			path: "/bar/tool",
			component: function(resolve) {
				return require(['vue!./pages/bar/tool.vue'], resolve);
			}
		},
		{
			// 用户栏
			path: "/bar/user",
			component: function(resolve) {
				return require(['vue!./pages/bar/user.vue'], resolve);
			}
		},

		/* 图表 */
		{
			// 条形图
			path: "/chart/bar",
			component: function(resolve) {
				return require(['vue!./pages/chart/bar.vue'], resolve);
			}
		},
		{
			// 深度图
			path: "/chart/depth",
			component: function(resolve) {
				return require(['vue!./pages/chart/depth.vue'], resolve);
			}
		},
		{
			// K线图
			path: "/chart/k",
			component: function(resolve) {
				return require(['vue!./pages/chart/k.vue'], resolve);
			}
		},
		{
			// 折线图
			path: "/chart/line",
			component: function(resolve) {
				return require(['vue!./pages/chart/line.vue'], resolve);
			}
		},
		{
			// 仪表盘
			path: "/chart/panel",
			component: function(resolve) {
				return require(['vue!./pages/chart/panel.vue'], resolve);
			}
		},
		{
			// 饼形图
			path: "/chart/pie",
			component: function(resolve) {
				return require(['vue!./pages/chart/pie.vue'], resolve);
			}
		},

		/* 内容 */
		{
			// 地址选择器
			path: "/content/address",
			component: function(resolve) {
				return require(['vue!./pages/content/address.vue'], resolve);
			}
		},
		{
			// 日期选择器
			path: "/content/date",
			component: function(resolve) {
				return require(['vue!./pages/content/date.vue'], resolve);
			}
		},
		{
			// 按钮
			path: "/content/btn",
			component: function(resolve) {
				return require(['vue!./pages/content/btn.vue'], resolve);
			}
		},
		{
			// 图标
			path: "/content/icon",
			component: function(resolve) {
				return require(['vue!./pages/content/icon.vue'], resolve);
			}
		},
		{
			// 加载
			path: "/content/loading",
			component: function(resolve) {
				return require(['vue!./pages/content/loading.vue'], resolve);
			}
		},
		{
			// 颜色
			path: "/content/color",
			component: function(resolve) {
				return require(['vue!./pages/content/color.vue'], resolve);
			}
		},

		/* 拓展 */
		{
			// 拖拽拓展
			path: "/expand/drag",
			component: function(resolve) {
				return require(['vue!./pages/expand/drag.vue'], resolve);
			}
		},
		{
			// 支付拓展
			path: "/expand/pay",
			component: function(resolve) {
				return require(['vue!./pages/expand/pay.vue'], resolve);
			}
		},
		{
			// 源代码拓展
			path: "/expand/pre",
			component: function(resolve) {
				return require(['vue!./pages/expand/pre.vue'], resolve);
			}
		},
		{
			// 二维码拓展
			path: "/expand/qrcode",
			component: function(resolve) {
				return require(['vue!./pages/expand/qrcode.vue'], resolve);
			}
		},
		{
			// 精灵拓展
			path: "/expand/sptite",
			component: function(resolve) {
				return require(['vue!./pages/expand/sptite.vue'], resolve);
			}
		},

		/* 布局 */
		{
			// 块
			path: "/layout/div",
			component: function(resolve) {
				return require(['vue!./pages/layout/div.vue'], resolve);
			}
		},
		{
			// 栅格
			path: "/layout/grid",
			component: function(resolve) {
				return require(['vue!./pages/layout/grid.vue'], resolve);
			}
		},
		{
			// 组合框
			path: "/layout/group",
			component: function(resolve) {
				return require(['vue!./pages/layout/group.vue'], resolve);
			}
		},
		{
			// 列表
			path: "/layout/list",
			component: function(resolve) {
				return require(['vue!./pages/layout/list.vue'], resolve);
			}
		},
		{
			// 模态窗
			path: "/layout/modal",
			component: function(resolve) {
				return require(['vue!./pages/layout/modal.vue'], resolve);
			}
		},
		{
			// 表格
			path: "/layout/table",
			component: function(resolve) {
				return require(['vue!./pages/layout/table.vue'], resolve);
			}
		},

		/* 控件 */
		{
			// 复选框
			path: "/control/checkbox",
			component: function(resolve) {
				return require(['vue!./pages/control/checkbox.vue'], resolve);
			}
		},
		{
			// 输入框
			path: "/control/input",
			component: function(resolve) {
				return require(['vue!./pages/control/input.vue'], resolve);
			}
		},
		{
			// 数字框
			path: "/control/number",
			component: function(resolve) {
				return require(['vue!./pages/control/number.vue'], resolve);
			}
		},
		{
			// 分页器
			path: "/control/pager",
			component: function(resolve) {
				return require(['vue!./pages/control/pager.vue'], resolve);
			}
		},
		{
			// 单选框
			path: "/control/radio",
			component: function(resolve) {
				return require(['vue!./pages/control/radio.vue'], resolve);
			}
		},
		{
			// 反转器
			path: "/control/reverse",
			component: function(resolve) {
				return require(['vue!./pages/control/reverse.vue'], resolve);
			}
		},
		{
			// 选择框
			path: "/control/select",
			component: function(resolve) {
				return require(['vue!./pages/control/select.vue'], resolve);
			}
		},
		{
			// 开关
			path: "/control/switch",
			component: function(resolve) {
				return require(['vue!./pages/control/switch.vue'], resolve);
			}
		},
		{
			// 富文本编辑器
			path: "/control/rich",
			component: function(resolve) {
				return require(['vue!./pages/control/rich.vue'], resolve);
			}
		},
		{
			// 日期选择器
			path: "/control/date",
			component: function(resolve) {
				return require(['vue!./pages/control/date.vue'], resolve);
			}
		},
		{
			// 地址选择器
			path: "/control/address",
			component: function(resolve) {
				return require(['vue!./pages/control/address.vue'], resolve);
			}
		},

		/* 表单 */
		{
			// 注册
			path: "/form/register",
			component: function(resolve) {
				return require(['vue!./pages/form/register.vue'], resolve);
			}
		},
		{
			// 登录
			path: "/form/login",
			component: function(resolve) {
				return require(['vue!./pages/form/login.vue'], resolve);
			}
		},
		{
			// 找回密码
			path: "/form/forgot",
			component: function(resolve) {
				return require(['vue!./pages/form/forgot.vue'], resolve);
			}
		},
		{
			// 修改密码
			path: "/form/password",
			component: function(resolve) {
				return require(['vue!./pages/form/password.vue'], resolve);
			}
		},

		/* 列表 */
		{
			// 地址列表
			path: "/list/address",
			component: function(resolve) {
				return require(['vue!./pages/list/address.vue'], resolve);
			}
		},
		{
			// 分析列表
			path: "/list/analyse",
			component: function(resolve) {
				return require(['vue!./pages/list/analyse.vue'], resolve);
			}
		},
		{
			// 文章列表
			path: "/list/article",
			component: function(resolve) {
				return require(['vue!./pages/list/article.vue'], resolve);
			}
		},
		{
			// 基础列表
			path: "/list/base",
			component: function(resolve) {
				return require(['vue!./pages/list/base.vue'], resolve);
			}
		},
		{
			// 购物车列表
			path: "/list/cart",
			component: function(resolve) {
				return require(['vue!./pages/list/cart.vue'], resolve);
			}
		},
		{
			// 联系人列表
			path: "/list/contact",
			component: function(resolve) {
				return require(['vue!./pages/list/contact.vue'], resolve);
			}
		},
		{
			// 结算列表
			path: "/list/count",
			component: function(resolve) {
				return require(['vue!./pages/list/count.vue'], resolve);
			}
		},
		{
			// 商品列表
			path: "/list/goods",
			component: function(resolve) {
				return require(['vue!./pages/list/goods.vue'], resolve);
			}
		},
		{
			// 图片列表
			path: "/list/image",
			component: function(resolve) {
				return require(['vue!./pages/list/image.vue'], resolve);
			}
		},
		{
			// 媒体列表
			path: "/list/media",
			component: function(resolve) {
				return require(['vue!./pages/list/media.vue'], resolve);
			}
		},
		{
			// 消息列表
			path: "/list/message",
			component: function(resolve) {
				return require(['vue!./pages/list/message.vue'], resolve);
			}
		},
		{
			// 音乐列表
			path: "/list/music",
			component: function(resolve) {
				return require(['vue!./pages/list/music.vue'], resolve);
			}
		},
		{
			// 新闻列表
			path: "/list/news",
			component: function(resolve) {
				return require(['vue!./pages/list/news.vue'], resolve);
			}
		},
		{
			// 号码列表
			path: "/list/number",
			component: function(resolve) {
				return require(['vue!./pages/list/number.vue'], resolve);
			}
		},
		{
			// 订单列表
			path: "/list/order",
			component: function(resolve) {
				return require(['vue!./pages/list/order.vue'], resolve);
			}
		},
		{
			// 问答列表
			path: "/list/question",
			component: function(resolve) {
				return require(['vue!./pages/list/question.vue'], resolve);
			}
		},
		{
			// 用户列表
			path: "/list/user",
			component: function(resolve) {
				return require(['vue!./pages/list/user.vue'], resolve);
			}
		},
		{
			// 视频列表
			path: "/list/video",
			component: function(resolve) {
				return require(['vue!./pages/list/video.vue'], resolve);
			}
		},

		/* 导航 */
		{
			// 底部导航
			path: "/nav/bottom",
			component: function(resolve) {
				return require(['vue!./pages/nav/bottom.vue'], resolve);
			}
		},
		{
			// 主导航
			path: "/nav/main",
			component: function(resolve) {
				return require(['vue!./pages/nav/main.vue'], resolve);
			}
		},
		{
			// 路径导航
			path: "/nav/path",
			component: function(resolve) {
				return require(['vue!./pages/nav/path.vue'], resolve);
			}
		},
		{
			// 快捷导航
			path: "/nav/quick",
			component: function(resolve) {
				return require(['vue!./pages/nav/quick.vue'], resolve);
			}
		},
		{
			// 侧边导航
			path: "/nav/side",
			component: function(resolve) {
				return require(['vue!./pages/nav/side.vue'], resolve);
			}
		},
		{
			// 顶部导航
			path: "/nav/top",
			component: function(resolve) {
				return require(['vue!./pages/nav/top.vue'], resolve);
			}
		},
		{
			// 用户导航
			path: "/nav/user",
			component: function(resolve) {
				return require(['vue!./pages/nav/user.vue'], resolve);
			}
		},

		/* 轮播 */
		{
			// 卡片轮播
			path: "/swiper/card",
			component: function(resolve) {
				return require(['vue!./pages/swiper/card.vue'], resolve);
			}
		},
		{
			// 旋转卡片轮播
			path: "/swiper/rotate_card",
			component: function(resolve) {
				return require(['vue!./pages/swiper/rotate_card.vue'], resolve);
			}
		},
		{
			// 图片轮播
			path: "/swiper/image",
			component: function(resolve) {
				return require(['vue!./pages/swiper/image.vue'], resolve);
			}
		},
		{
			// 菜单轮播
			path: "/swiper/menu",
			component: function(resolve) {
				return require(['vue!./pages/swiper/menu.vue'], resolve);
			}
		},
		{
			// 页面轮播
			path: "/swiper/page",
			component: function(resolve) {
				return require(['vue!./pages/swiper/page.vue'], resolve);
			}
		},
		{
			// 页面竖方向轮播
			path: "/swiper/vertical_page",
			component: function(resolve) {
				return require(['vue!./pages/swiper/vertical_page.vue'], resolve);
			}
		},
		{
			// 文本轮播
			path: "/swiper/text",
			component: function(resolve) {
				return require(['vue!./pages/swiper/text.vue'], resolve);
			}
		},


		/* 表格 */
		{
			// 货币表格
			path: "/table/coin",
			component: function(resolve) {
				return require(['vue!./pages/table/coin.vue'], resolve);
			}
		},
		{
			// 股票表格
			path: "/table/stock",
			component: function(resolve) {
				return require(['vue!./pages/table/stock.vue'], resolve);
			}
		},
		{
			// 挂单表格
			path: "/table/resting_order",
			component: function(resolve) {
				return require(['vue!./pages/table/resting_order.vue'], resolve);
			}
		},
		{
			// 买卖表格
			path: "/table/buy_sell",
			component: function(resolve) {
				return require(['vue!./pages/table/buy_sell.vue'], resolve);
			}
		},
		{
			// 错误404
			path: "*",
			redirect: "/404"
		}
	];

	var router = new VueRouter({
		mode: "history",
		base: "/ui",
		hashbang: true,
		history: false,
		saveScrollPosition: true,
		transitionOnLoad: true,
		routes: routes
	});
	router.beforeEach(function(to, from, next) {
		next();
	});
	return router;
});
