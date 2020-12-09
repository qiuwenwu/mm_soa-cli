<template>
	<mm_page>
		<main id="root_index"><mm_warp><mm_container><mm_row>
			<mm_col>
				<mm_view>
					<mm_title>
						<h5>超级美眉</h5>
						<span class="arrow"></span>
					</mm_title>
					<mm_body>

					</mm_body>
				</mm_view>
			</mm_col>
		</mm_row></mm_container></mm_warp>
	</mm_page>
</template>

<script>
	import Vue from 'Vue';

	export default {
		data: function() {
			return {
				web: this.$store.state.web
			}
		}
	};
</script>

<style>
	#root_index .mm_body {
		min-height: calc(100vh - 9.25rem);
	}
</style>
