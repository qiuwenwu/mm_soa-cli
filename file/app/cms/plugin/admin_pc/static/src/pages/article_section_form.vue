<template>
	<main id="cms_article_section_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-mm-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>{{ form[field] ? '修改' : '创建' }}文章章节</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<dt>对应文章</dt>
										<dd>
											<mm_select v-model="form.article_id" :options="$to_kv(list_article, 'article_id', 'title', 0)" />
										</dd>
										<dt class="required">章节标题</dt>
										<dd>
											<mm_input v-model="form.title" :minlength="0" :maxlength="255" placeholder=""
											 :required="true" />
										</dd>
										<dt class="required">章节标签</dt>
										<dd>
											<mm_input v-model="form.tag" :minlength="0" :maxlength="255" placeholder=""
											 :required="true" />
										</dd>
										<dt>章节内容</dt>
										<dd>
											<mm_rich v-model="form.content"></mm_rich>
										</dd>
										<dt>章节图片</dt>
										<dd>
											<mm_upload_img width="10rem" height="10rem" name="img" type="text" v-model="form.img" />
										</dd>
									</dl>
								</mm_form>
							</div>
							<div class="card_foot">
								<div class="mm_group">
									<button class="btn_default" type="button" @click="cancel">取消</button>
									<button class="btn_primary" type="button" @click="submit()">提交</button>
								</div>
							</div>
						</mm_card>
					</mm_col>
				</mm_row>
			</mm_container>
		</mm_warp>
	</main>
</template>


<script>
	import mixin from '/src/mixins/page.js';

	export default {
		mixins: [mixin],
		components: {},
		data() {
			return {
				url: "/apis/cms/article_section?",
				url_get_obj: "/apis/cms/article_section?method=get_obj",
				field: "section_id",
				query: {
					"section_id": 0
				},
				form: {
					"section_id": 0,
					"article_id": 0,
					"title": '',
					"tag": '',
					"content": '',
					"img": '',
				},
				// 对应文章
				'list_article':[],
			}
		},
		methods: {
			/**
			 * 获取对应文章
			 * @param {query} 查询条件
			 */
			get_article(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "article_id,title"
					};
				}
				this.$get('~/apis/cms/article?size=0', query, function(json) {
					if (json.result) {
						_this.list_article.clear();
						_this.list_article.addList(json.result.list)
					}
				});
			},
		},
		created() {
			// 获取对应文章
			this.get_article();
		}
	}
</script>

<style>
</style>
