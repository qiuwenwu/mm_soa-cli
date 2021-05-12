<template>
	<!-- 图片 -->
	<mm_page id="expand_drag">
		<header>
			<mm_warp>
				<mm_container>
					<mm_row>
						<mm_col width="100">
							<mm_view url="/">
								<h3>
									<span>图片</span>
									<span class="fr">&lt; 返回</span></router-link>
								</h3>
							</mm_view>
						</mm_col>
					</mm_row>
				</mm_container>
			</mm_warp>
		</header>
		<main style="overflow: auto; min-height: calc(100vh - 5rem);">
			<mm_warp>
				<mm_container>
					<mm_row>
						<mm_col width="100">
							<expand_drag id="drag_1" :pos="obj.pos">请拖动我1！</expand_drag>
							<expand_drag id="drag_2" :pos="obj2.pos">请拖动我2！</expand_drag>
						</mm_col>
						<mm_col width="100">
							{{ obj }}
						</mm_col>
						<mm_col width="100">
							{{ obj2 }}
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
				obj: {
					pos: {
						x: 0,
						y: 10
					}
				},
				obj2: {
					pos: {
						x: 0,
						y: 50
					}
				}
			}
		}
	}
</script>

<style>
</style>
