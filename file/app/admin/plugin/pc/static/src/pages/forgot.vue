<template>
	<main id="forgot">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col width="100">
						<mm_card>
							<div class="card_head arrow">
								<h5>后台配置</h5>
							</div>
							<div class="card_body">
								
							</div>
						</mm_card>
					</mm_col>
				</mm_row>
			</mm_container>
		</mm_warp>
	</main>
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
