<template>
	<mm_page id="page_tab">
		<header>
			<mm_warp>
				<mm_container>
					<mm_row>
						<mm_col width="100">
							<mm_view url="/">
								<h3>
									<span>标签栏</span>
									<span class="fr">&lt; 返回</span></router-link>
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
					<mm_row>
						<mm_col width="100">
							<mm_view>
								<bar_tab class="display-2" icon_key="" :list="list" :func="func_tab">
								</bar_tab>
							</mm_view>
							<mm_view>
								<bar_tab class="item-lr img-mini display-2" :list="list" :func="func_tab">
								</bar_tab>
							</mm_view>
						</mm_col>
						<mm_col width="25">
							<mm_view style="height: 25rem;">
								<bar_tab icon_key="" class="display-1" :col="1" :list="list" :func="func_tab">
								</bar_tab>
							</mm_view>
						</mm_col>
						<mm_col width="75" style="background-color: #efefef;">
							<mm_view>
							</mm_view>
						</mm_col>
						<mm_col width="100">
							<mm_view>
								<bar_tab class="display-2 item-tb img-base" :col="4" :list="list" :func="func_tab">
								</bar_tab>
							</mm_view>
						</mm_col>
						<mm_col width="25">
							<mm_view style="height: 25rem;">
								<bar_tab class="display-1 item-lr img-mini" :col="1" :list="list" :func="func_tab">
								</bar_tab>
							</mm_view>
						</mm_col>
						<mm_col width="75" style="background-color: #efefef;">
							<mm_view>
							</mm_view>
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
				select: 0,
				col: 2,
				options: [{
						name: "1列",
						value: 1
					},
					{
						name: "2列",
						value: 2
					},
					{
						name: "3列",
						value: 3
					},
					{
						name: "4列",
						value: 4
					},
					{
						name: "5列",
						value: 5
					},
					{
						name: "6列",
						value: 6
					},
					{
						name: "8列",
						value: 8
					},
					{
						name: "10列",
						value: 10
					},
					{
						name: "12列",
						value: 12
					}
				],
				list: undefined
			}
		},
		methods: {
			func_tab(o) {
				console.log(o)
			}
		}
	}
</script>

<style>
</style>
