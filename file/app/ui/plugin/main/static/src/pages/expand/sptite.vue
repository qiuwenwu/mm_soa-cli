<template>
	<mm_page id="page_sptite">
		<header>
			<mm_warp>
				<mm_container>
					<mm_row>
						<mm_col width="100">
							<mm_view url="/">
								<h3>
									<span>精灵布局</span>
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
								<expand_sptite v-for="(o, i) in list" :key="i" :client="o.client" :name="o.name" :size="o.size" :pos="o.pos" :align="o.align"
								 :tag="o.tag" :type="o.type" :src="o.src" background="o.background" :z-index="o.zIndex" v-drag></expand_sptite>
							</mm_view>
							<mm_view>
								<expand_sptite v-for="(o, i) in list_form" :key="i" :client="o.client" :name="o.name" :size="o.size" v-model="o.text"
								 :pos="o.pos" :align="o.align" :tag="o.tag" :type="o.type" :background="o.background" :z-index="o.zIndex"></expand_sptite>
							</mm_view>
							<mm_view>
								<expand_sptite v-for="(o, i) in list_form" :key="i" :client="o.client" :name="o.name" :size="o.size" v-model="o.text"
								 :pos="o.pos" :align="o.align" :tag="o.tag" :type="o.type" :background="o.background" :z-index="o.zIndex">
									<template slot-scope="scope">
										<a :style="scope.style_sub">
											你好
										</a>
									</template>
								</expand_sptite>
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
				list: [
						{
						name: "test_center",
						tag: "img",
						src: "/img/logo.png",
						size: {
							width: "200",
							height: "200"
						},
						pos: {
							x: 0,
							y: 0
						},
						align: {
							x: "center",
							y: "center"
						},
						zIndex: 101
					},
					{
						name: "test_left_top",
						tag: "img",
						src: "/img/logo.png",
						pos: {
							x: 10,
							y: 10
						},
						align: {
							x: "left",
							y: "top"
						},
						zIndex: 101,
						client: "pad"
					},
					{
						name: "test_right_top",
						tag: "img",
						src: "/img/logo.png",
						pos: {
							x: 10,
							y: 10
						},
						align: {
							x: "right",
							y: "top"
						},
						zIndex: 101,
						client: "pad"
					},
					{
						name: "test_left_bottom",
						tag: "img",
						src: "/img/logo.png",
						pos: {
							x: 10,
							y: 10
						},
						align: {
							x: "left",
							y: "bottom"
						},
						zIndex: 101
					},
					{
						name: "test_right_bottom",
						tag: "img",
						src: "/img/logo.png",
						pos: {
							x: 10,
							y: 10
						},
						align: {
							x: "right",
							y: "bottom"
						},
						zIndex: 101
					},
					// {
					// 	name: "test_stretch_stretch",
					// 	tag: "img",
					// 	src: "/img/logo.png",
					// 	pos: {
					// 		x: 0,
					// 		y: 0
					// 	},
					// 	align: {
					// 		x: "stretch",
					// 		y: "stretch"
					// 	},
					// 	zIndex: 101
					// },
					// {
					// 	name: "test_stretch_stretch_wh",
					// 	tag: "img",
					// 	src: "/img/logo.png",
					// 	size: {
					// 		width: "",
					// 		height: "10rem"
					// 	},
					// 	pos: {
					// 		x: 0,
					// 		y: 0
					// 	},
					// 	align: {
					// 		x: "stretch",
					// 		y: "center"
					// 	},
					// 	zIndex: 101
					// },
					// {
					// 	name: "test_right_stretch",
					// 	tag: "img",
					// 	src: "/img/logo.png",
					// 	pos: {
					// 		x: 0,
					// 		y: 0
					// 	},
					// 	align: {
					// 		x: "right",
					// 		y: "stretch"
					// 	},
					// 	zIndex: 100
					// },
					// {
					// 	name: "test_left_stretch",
					// 	tag: "img",
					// 	src: "/img/logo.png",
					// 	size: {
					// 		width: "100%",
					// 		height: "100%"
					// 	},
					// 	pos: {
					// 		x: 0,
					// 		y: 0
					// 	},
					// 	align: {
					// 		x: "left",
					// 		y: "stretch"
					// 	},
					// 	zIndex: 101
					// }
				],
				list_form: [{
					name: "test_left_top",
					tag: "input",
					text: "你好",
					pos: {
						x: 0,
						y: 10
					},
					size: {
						width: '100%',
						height: '5rem',
					},
					align: {
						x: "center",
						y: "center"
					},
					zIndex: 101,
					background: "rgba(125,125,125, 0.5)"
				}, ]
			}
		},
		methods: {},
		computed: {}
	}
</script>

<style scoped>
	#page_sptite main .mm_view {
		min-height: calc(100vh - 12rem);
		position: relative;
	}
</style>
