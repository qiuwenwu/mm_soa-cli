<template>
	<!-- 图片 -->
	<mm_page id="page_img">
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
								<button class="btn_info" @click="border = !border"><span v-if="border">无</span><span v-else>加</span>边框</button>
							</mm_view>
						</mm_col>
						<mm_col width="100">
							<mm_view>
								<h5>样式一</h5>
								<mm_list col="4" id="list_img_1" class="list_img item-tb" v-bind:class="{'icon-x': border}">
									<mm_img v-for="(o, k) in list" :key="k" :url="o.url" :obj="o"></mm_img>
								</mm_list>
							</mm_view>

							<mm_view>
								<h5>样式二</h5>
								<mm_list col="4" id="list_img_2" class="list_img item-tb">
									<mm_img v-for="(o, k) in list" :key="k" :url="o.url" :obj="o"></mm_img>
								</mm_list>
							</mm_view>

							<mm_view>
								<h5>样式三</h5>
								<mm_list col="2" id="list_img_2" class="list_img item-ltb">
									<mm_img v-for="(o, k) in list" :key="k" :url="o.url" :obj="o"></mm_img>
								</mm_list>
							</mm_view>

							<mm_view>
								<h5>样式四</h5>
								<mm_list col="2" id="list_img_2" class="item-rtb">
									<mm_img v-for="(o, k) in list" :key="k" :url="o.url" :obj="o"></mm_img>
								</mm_list>
							</mm_view>

							<mm_view>
								<h5>样式五</h5>
								<mm_list col="2" id="list_img_2" class="item-ll">
									<mm_img v-for="(o, k) in list" :key="k" :url="o.url" :obj="o"></mm_img>
								</mm_list>
							</mm_view>

							<mm_view>
								<h5>样式五</h5>
								<mm_list col="2" id="list_img_2" class="item-rr">
									<mm_img v-for="(o, k) in list" :key="k" :url="o.url" :obj="o"></mm_img>
								</mm_list>
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
				list: [{
						title: "测试1",
						image: "/img/default.png",
						description: "这是一个图片的描述，为了方便演示排版而写",
						url: "/"
					},
					{
						title: "测试2",
						image: "/img/default.png",
						description: "这是一个图片的描述，为了方便演示排版而写",
						url: "/"
					},
					{
						title: "测试3",
						image: "/img/default.png",
						tip: "12集全",
						tag: "独播",
						description: "这是一个图片的描述，为了方便演示排版而写",
						url: "/"
					},
					{
						title: "测试4",
						image: "/img/default.png",
						url: "/"
					},
					{
						title: "测试5",
						image: "/img/default.png",
						url: "/"
					},
					{
						title: "测试6",
						image: "/img/default.png",
						url: "/"
					},
					{
						title: "测试7",
						image: "/img/default.png",
						url: "/"
					},
					{
						title: "测试8",
						image: "/img/default.png",
						url: "/"
					}
				]
			}
		}
	}
</script>

<style>
	#list_img_1 figure {
		border-radius: 0.25rem;
	}

	#list_img_2 .mm_img {
		border-radius: 0.25rem;
		background: #fff;
		overflow: hidden;
		box-shadow: 0 0.25rem 0.5rem 0 rgba(7, 17, 27, 0.1);
	}

	#page_img #list_img_2 .mm_img {
		border: none;
		/* box-shadow: none; */
	}
	
	#page_img #list_img_2 figure {
		border: none;
	}

	#page_img #list_img_2 .title {
		text-align: left;
	}

	#page_img #list_img_2 .tip {
		position: absolute;
		bottom: 2.5rem;
		right: 0;
		text-align: right;
		color: #fff;
	}

	#page_img .mm_item {
		padding: 0.5rem;
	}
</style>
