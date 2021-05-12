<template>
	<!-- 图片 -->
	<mm_page id="page_image">
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
		<main>
			<mm_warp>
				<mm_container>
					<mm_row>
						<mm_col width="100">
							<mm_view>
								<control_select v-model="col" :options="options"></control_select>
								<mm_btn class="btn_primary" @click.native="set_layout()">切换排版方式</mm_btn>
								<button class="btn_primary" @click="border = !border">
									<span v-if="border">无</span>
									<span v-else>加</span>边框
								</button>
							</mm_view>
						</mm_col>
						<mm_col width="100">
							<mm_view class="card">
								<h5>样式一</h5>
								<list_image :col="col" :list="list"
									:class="list_layout[select] + (border ? ' icon-x icon-radius' : '')"></list_image>
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
				border: false,
				select: 2,
				col: "4",
				list_layout: [
					"item-ltb img-base",
					"item-rtb img-base",
					"item-tb"
				],
				options: [{
						name: "1列",
						value: "1"
					},
					{
						name: "2列",
						value: "2"
					},
					{
						name: "3列",
						value: "3"
					},
					{
						name: "4列",
						value: "4"
					},
					{
						name: "5列",
						value: "5"
					},
					{
						name: "6列",
						value: "6"
					},
					{
						name: "8列",
						value: "8"
					},
					{
						name: "10列",
						value: "10"
					},
					{
						name: "12列",
						value: "12"
					}
				],
				list: [{
						title: "测试1",
						image: "/img/default.png",
						description: "这是一个图片的描述，为了方便演示排版而写",
						url: "/",
						tip: "简单的"
					},
					{
						title: "测试2",
						image: "/img/default.png",
						description: "这是一个图片的描述，为了方便演示排版而写",
						url: "/",
						tip: "简单的"
					},
					{
						title: "测试3",
						image: "/img/default.png",
						tip: "12集全",
						tag: "独播",
						description: "这是一个图片的描述，为了方便演示排版而写",
						url: "#",
						tip: "简单的"
					},
					{
						title: "测试4",
						image: "/img/default.png",
						url: "#"
					},
					{
						title: "测试5",
						image: "/img/default.png",
						url: "#",
						tip: "简单的"
					},
					{
						title: "测试6",
						image: "/img/default.png",
						url: "#"
					},
					{
						title: "测试7",
						image: "/img/default.png",
						url: "/",
						tip: "简单的"
					},
					{
						title: "测试8",
						image: "/img/default.png",
						url: "/"
					}
				]
			}
		},
		methods: {
			set_layout() {
				if (this.select < this.list_layout.length - 1) {
					this.select++;
				} else {
					this.select = 0;
				}
			}
		}
	}
</script>

<style>
	#list_img_1 figure {
		border-radius: 0.25rem;
	}

	#list_img_2 .list_image {
		border-radius: 0.25rem;
		background: #fff;
		overflow: hidden;
		box-shadow: 0 0.25rem 0.5rem 0 rgba(7, 17, 27, 0.1);
	}

	#page_image #list_img_2 .list_image {
		border: none;
		/* box-shadow: none; */
	}

	#page_image #list_img_2 figure {
		border: none;
	}

	#page_image #list_img_2 .title {
		text-align: left;
	}

	#page_image #list_img_2 .tip {
		position: absolute;
		bottom: 2.5rem;
		right: 0;
		text-align: right;
		color: #fff;
	}

	#page_image .mm_item {
		padding: 0.5rem;
	}
</style>
