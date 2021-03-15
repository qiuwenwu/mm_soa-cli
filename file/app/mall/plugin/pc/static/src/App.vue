<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		components: {},
		data: function() {
			return {
				nav: this.$store.state.web.nav,
				web: this.$store.state.web,
				user: this.$store.state.user,
				hide: true,
				fold: false
			}
		},
		methods: {},
		computed: {},
		created() {},
		destroyed() {
			
		}
	};
</script>

<style>

</style>
