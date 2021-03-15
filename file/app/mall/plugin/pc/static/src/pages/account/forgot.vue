<template>
	<mm_page id="forgot">
		<main>
			<mm_warp>
				<mm_container>
					<mm_row>
						<mm_col width="100">
							<mm_card>
								<div class="card_head arrow">
									<h5>忘记密码</h5>
								</div>
								<div class="card_body">

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
