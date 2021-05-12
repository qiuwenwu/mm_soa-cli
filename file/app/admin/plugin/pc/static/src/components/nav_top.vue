<template>
	<mm_nav_top id="nav_top" v-model="show">
		<div class="item">
			<a href="javascript:void(0)" @click="show = false">
				<mm_icon src="<i class='fa-search'></i>"></mm_icon>
				<span>搜索</span>
			</a>
		</div>
		<div class="item">
			<router-link to="/" @click="show = false">
				<span>消息</span>
				<span class="msg">{{ msg_count }}</span>
			</router-link>
		</div>
		<div class="item">
			<control_select class="user" v-model="option" :options="options" type="click" :func="select">
				<img class="avatar" :src="user.avatar || '/img/avatar.png'" />
			</control_select>
		</div>
		<div class="item">
			<router-link to="/config" @click="show = false">
				<mm_icon src="<i class='fa-ellipsis-v'></i>"></mm_icon>
			</router-link>
		</div>
	</mm_nav_top>
</template>

<script>
	export default {
		data: function() {
			return {
				nav: this.$store.state.web.nav,
				user: this.$store.state.user,
				msg_count: 19,
				show: false,
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
						value: "/sign_out"
					}
				]
			}
		},
		methods: {
			select(value) {
				if (value == '/sign_out') {
					var _this = this;
					this.$get('~/api/user/sign_out', null, function(res) {
						_this.$store.commit('sign_out');
						_this.$router.push('/sign_in');
					});
				} else {
					this.$router.push(value);
				}
				this.show = false;
			}
		}
	};
</script>

<style>
	
	@media (min-width: 576px) {
		#nav_top .item>* {
			border-left: 1px solid rgba(0, 0, 0, 0.4);
			position: relative;
			min-width: 2.5rem;
			text-align: center;
		}

		#nav_top .item>*:before {
			content: "";
			display: block;
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			height: 100%;
			border-left: 1px solid rgba(255, 255, 255, 0.1);
		}
	}


	#nav_top .item>*:hover {
		background: rgba(128, 128, 128, 0.1);
	}

	#nav_top .item>*:active {
		background: rgb(0, 0, 0);
	}

	#nav_top .msg {
		text-align: center;
		display: inline-block;
		border-radius: 0.15rem;
		min-width: 1rem;
		font-size: 0.625rem;
		height: 1rem;
		line-height: 1.425;
		padding: 0 0.25rem 0 0.2rem;
		background: #ff9000;
		color: #fff;
	}

	#nav_top .user:hover {
		background: rgba(128, 128, 128, 0.1);
	}

	#nav_top .user .mm_box {
		left: calc(-100% - var(--padding_small) / 2);
		top: 100%;
	}

	#nav_top .user a {
		color: #666;
	}
</style>
