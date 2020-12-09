<template>
	<div class="mm_nav_side">
		<mm_item v-for="(o, idx) in nav.main" :key="idx" :url="o.sub.length > 0 ? '' : o.url" :class="{'active': select == idx }">
			<div class="btn" @click="select = idx">
				<mm_icon :src="o.icon" v-if="o.icon"></mm_icon>
				<span>{{ o.title }}</span>
			</div>
			<div class="box">
				<router-link v-for="(item, i) in o.sub" :key="i" :to="item.url" @click.native="set_tab(item)">
					<mm_icon :src="item.icon" v-if="item.icon"></mm_icon>
					<span>{{ show_title(item) }}</span>
				</router-link>
			</div>
		</mm_item>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				nav: this.$store.state.web.nav,
				select: 0
			}
		},
		methods: {
			set_tab(o) {
				this.$store.commit('set_nav_cache', o)
			},
			show_title(o) {
				if (o.title) {
					return o.title;
				} else {
					return this.$lang(o.name);
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
			}
		}
	}
</script>

<style>
</style>
