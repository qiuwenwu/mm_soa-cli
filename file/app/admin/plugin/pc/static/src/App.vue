<template>
	<div id="app">
		<mm_page v-if="is_sign">
			<router-view></router-view>
		</mm_page>
		<mm_page id="page_root" v-else>
			<mm_side v-model="hide" :fold="fold" :func="set_width">
				<mm_warp>
					<div class="mm_bar_logo"><img src="/img/logo.png"><span>超级美眉</span></div>
					<nav_side></nav_side>
				</mm_warp>
			</mm_side>
			<header :style="'width: calc(100% -' + width + 'px)'">
				<mm_warp>
					<mm_container>
						<mm_row>
							<mm_col class="col-12">
								<nav_quick>
									<button class="btn_link btn_primary hide_phone" @click="fold = !fold"><i class="fa-bars"></i></button>
									<button class="btn_link btn_primary show_phone" @click="hide = !hide"><i class="fa-bars"></i></button>
								</nav_quick>
								<nav_top></nav_top>
							</mm_col>
						</mm_row>
					</mm_container>
				</mm_warp>
				<mm_warp>
					<mm_container>
						<mm_row>
							<mm_col width="100">
								<!-- 页签组件 -->
								<mm_view id="tabs">
									<div class="mm_tab_head">
										<div v-for="(o, idx) in nav_cache" :key="idx" :class="{ 'active': o.url === url_now }">
											<router-link :to="o.url">
												{{ o.title }}
											</router-link>
											<i class="icon-close" v-if="o.name !== 'index'" @click="del_tab(o)"></i>
										</div>
									</div>
								</mm_view>
							</mm_col>
						</mm_row>
					</mm_container>
				</mm_warp>
			</header>

			<router-view :style="'width: calc(100% -' + width + 'px)'"></router-view>
			<footer :style="'width: calc(100% -' + width + 'px)'">
				<div class="mm_warp" id="copyright">
					<div class="mm_container">
						<div class="mm_row">
							<div class="mm_col col-12">
								<div class="info">
									<div class="fl"><a target="_blank" href="http://bbs.elins.cn">开发者: 超级美眉工作室</a></div>
									<div class="fr"><a href="tencent://message/?uin=573242395">升级维护联系：573242395@qq.com</a></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</footer>
			<div class="mm_modal hide">
				<div class="popup"></div>
				<div class="mask"></div>
			</div>
		</mm_page>
	</div>
</template>

<script>
	import Vue from 'Vue';
	import nav_top from './components/nav_top.vue'
	import nav_side from './components/nav_side.vue'
	import nav_quick from './components/nav_quick.vue'
	import nav_float from './components/nav_float.vue'

	export default {
		components: {
			// mm_side,
			nav_top,
			nav_side,
			nav_quick,
			nav_float
		},
		data: function() {
			return {
				nav_cache: this.$store.state.web.nav_cache,
				nav: this.$store.state.web.nav,
				web: this.$store.state.web,
				user: this.$store.state.user,
				hide: true,
				fold: false,
				width: 0,
				msg_count: 19,
				option: "",
				options: [{
						name: "基本资料",
						value: "/info"
					},
					{
						name: "修改密码",
						value: "/password"
					},
					{
						name: "退出",
						value: "/logout"
					}
				]
			}
		},
		methods: {
			select_item(o) {
				if (o.url === this.url_now) {
					return true;
				} else {
					return o.sub.has({
						url: this.url_now
					})
				}
			},
			set_width(width) {
				this.width = width;
			},
			del_tab(o) {
				this.$store.commit('del_nav_cache', o);
				var tabs = this.nav_cache;
				var keys = Object.keys(tabs);
				if (keys.length > 0) {
					this.$router.push(tabs[keys[keys.length - 1]].url);
				} else {
					this.$router.push('/');
				}
			}
		},
		computed: {
			url_now() {
				var query = this.$route.query
				if (query.length > 0) {
					return this.$route.path + "?" + $.toUrl(query);
				}
				return this.$route.path;
			},
			is_sign() {
				var p = this.$route.path;
				if (p.indexOf('/sign') !== -1 || p.indexOf('/forgot') !== -1) {
					return true;
				} else {
					return false;
				};
			}
		},
		created() {
			if (window.history && window.history.pushState) {
				history.pushState(null, null, document.URL);
			}
		},
		destroyed() {
			window.removeEventListener('popstate', this.goBack, flase)
		}
	};
</script>

<style>
	.card_body .mm_form {
		margin: 1rem;
	}
	.card_body .mm_table {
		margin: 1rem;
	}
	.card_body .bar_action {
		margin: 0 1rem;
	}
	.card_foot .fr{
		margin-right: 1rem;
	}
	.card_foot .fl{
		margin-left: 1rem;
	}
	.control_pager {
		margin: 1rem 0;
	}
	.icon-close {
		border-radius: 50%;
		background-color: var(--color_border);
		color: #fff;
		text-align: center;
		width: 1.125rem;
		height: 1.125rem;
		line-height: 1;
		font-weight: 600;
		display: inline-block;
		position: relative;
	}
	
	.icon-close::after {
		content: "×";
		position: relative;
		top: 2px;
		left: -1px;
	}

	.icon-close:hover {
		cursor: pointer;
		background-color: var(--color_error);
	}

	#tabs {
		width: 100%;
		overflow-x: auto;
		background: #fff;
	}

	.mm_page>header~main {
		margin-top: 4.5rem;
	}

	.bar_filter {
		display: flex;
		padding-bottom: .5rem;
		margin-bottom: 1rem;
		border-bottom: 1px solid rgba(51, 136, 255, .25);
	}

	.bar_filter .mm_list {
		align-items: center;
	}

	.bar_filter .mm_item {
		min-width: 20rem;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
	}

	.bar_filter>.title {
		flex: 1;
		position: relative;
		border-right: 2px solid #DBDBDB;
		background: #f3f9ff;
		min-width: 7rem;
		max-width: 7rem;
		text-align: center;
		min-height: 2rem;
	}

	.bar_filter>.title h5 {
		position: absolute;
		width: 100%;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		white-space: nowrap;
	}

	.pager_now {
		padding: 0;
		width: 3rem;
		min-width: auto !important;
	}

	.bar_filter button:first-child {
		margin-left: 1rem;
	}

	@media (max-width: 576px) {
		.bar_filter {
			display: block;
		}

		.control_pager,
		[class*=control_pager_] {
			float: none;
			clear: both;
			padding: 0.5rem 0;
		}
	}

	.bar_action {
		margin: 1rem 0 .5rem 0;
	}

	.bar_action>h5 {
		float: left;
		line-height: 2rem;
	}

	.bar_action .btns {
		float: right;
	}

	.bar_action .btn_small {
		padding: 0 2.5rem;
		margin-right: auto;
	}

	.bar_action .btn_small .mm_btn {
		font-size: 0.625rem;
		height: 1.5rem;
		line-height: 1.5rem;
		padding-left: var(--padding_mini);
		padding-right: var(--padding_mini);
		position: relative;
		top: 0.25rem
	}

	.bar_action::before,
	.bar_action::after {
		content: "";
		display: block;
		clear: both;
	}

	.mm_page>footer .mm_warp {
		line-height: 2rem;
	}

	#copyright {
		font-size: 0.75rem;
		padding-left: 1rem;
		padding-right: 1rem;
		color: var(--color_default);
	}

	#copyright a:hover {
		color: var(--color_info);
	}

	@media (max-width: 576px) {
		#copyright {
			display: none;
		}

		.col-mm-12 .mm_form input {
			width: 100%;
		}
	}
</style>
