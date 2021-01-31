<template>
	<main id="cms_article_comment_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-mm-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>{{ form[field] ? '修改' : '创建' }}文章评论</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<dt>是否启用</dt>
										<dd>
											<mm_switch v-model="form.available" />
										</dd>
										<dt>评分</dt>
										<dd>
											<mm_number v-model="form.score" :min="0" :max="5" />
										</dd>
										<dt>所属文章</dt>
										<dd>
											<mm_select v-model="form.article_id" :options="$to_kv(list_article, 'article_id', 'title', 0)" />
										</dd>
										<dt>用户</dt>
										<dd>
											<mm_select v-model="form.user_id" :options="$to_kv(list_account, 'user_id', 'nickname', 0)" />
										</dd>
										<dt>留言者姓名</dt>
										<dd>
											<mm_input v-model="form.name" :minlength="0" :maxlength="0" placeholder="用于实名回复" />
										</dd>
										<dt>标签</dt>
										<dd>
											<mm_input v-model="form.tag" :minlength="0" :maxlength="64" placeholder="评论人给的标签，多个标签用空格隔开" />
										</dd>
										<dt>正文</dt>
										<dd>
											<mm_rich v-model="form.content"></mm_rich>
										</dd>
										<dt>评论回复</dt>
										<dd>
											<mm_textarea v-model="form.reply" type="text" placeholder="对评论人的评论做出的回复。通过form-url格式保存，多个人的回复用换行分隔"></mm_textarea>
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
				url: "/apis/cms/article_comment?",
				url_get_obj: "/apis/cms/article_comment?method=get_obj",
				field: "comment_id",
				query: {
					"comment_id": 0
				},
				form: {
					"comment_id": 0,
					"available": 0,
					"score": 0,
					"article_id": 0,
					"user_id": 0,
					"name": '',
					"tag": '',
					"content": '',
					"reply": '',
				},
				// 是否启用
				'arr_available':["否","是"],
				// 所属文章
				'list_article':[],
				// 用户
				'list_account':[],
			}
		},
		methods: {
			/**
			 * 获取所属文章
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
			/**
			 * 获取用户
			 * @param {query} 查询条件
			 */
			get_account(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "user_id,nickname"
					};
				}
				this.$get('~/apis/user/account?size=0', query, function(json) {
					if (json.result) {
						_this.list_account.clear();
						_this.list_account.addList(json.result.list)
					}
				});
			},
		},
		created() {
			// 获取所属文章
			this.get_article();
			// 获取用户
			this.get_account();
		}
	}
</script>

<style>
</style>
