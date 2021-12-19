<template>
	<main id="cms_article_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-mm-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>{{ form[field] ? '修改' : '创建' }}文章</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<dt>封面图</dt>
										<dd>
											<mm_upload_img width="10rem" height="10rem" name="img" type="text"
												v-model="form.img" />
										</dd>
										<dt class="required">标题</dt>
										<dd>
											<control_input v-model="form.title" :minlength="0"
												:maxlength="125"
												placeholder="用于文章和html的title标签中"
												:required="true" />
										</dd>
										<dt>是否启用</dt>
										<dd>
											<control_switch v-model="form.available" />
										</dd>
										<dt>状态</dt>
										<dd>
											<control_select v-model="form.state"
												:options="$to_kv(arr_state)" />
										</dd>
										<dt>频道</dt>
										<dd>
											<control_select type="list" v-model="form.channel_id"
												:options="$to_kv(list_article_channel, 'channel_id', 'title')" />
										</dd>
										<dt>用户</dt>
										<dd>
											<control_select type="list" v-model="form.user_id"
												:options="$to_kv(list_account, 'user_id', 'phone')" />
										</dd>
										<dt>描述</dt>
										<dd>
											<control_input v-model="form.description" :minlength="0"
												:maxlength="255"
												placeholder="用于文章提纲和搜索引擎收录" />
										</dd>
										<dt class="required">正文</dt>
										<dd>
											<control_rich v-model="form.content"></control_rich>
										</dd>
									</dl>
								</mm_form>
							</div>
							<div class="card_foot">
								<div class="mm_group">
									<button class="btn_default" type="button" @click="cancel">返回</button>
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
				url_add: "/apis/cms/article?method=add",
				url_set: "/apis/cms/article?method=set",
				url_get_obj: "/apis/cms/article?method=get_obj",
				field: "article_id",
				query: {
					"article_id": 0
				},
				form: {
					//文章id
					"article_id":0,
					//封面图
					"img": '',
					//标题
					"title": '',
					//是否启用
					"available":1,
					//状态
					"state":1,
					//频道
					"channel_id":1,
					//用户
					"user_id":0,
					//描述
					"description": '',
					//正文
					"content": '',
				},
				// 是否启用
				'arr_available':["否","是"],
				// 状态
				'arr_state':["","正常","推荐","认证","违规","官方"],
				// 频道
				'list_article_channel':[],
				// 用户
				'list_account':[],
			}
		},
		methods: {
			/**
			 * 获取频道
			 * @param {query} 查询条件
			 */
			get_article_channel(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "channel_id,title"
					};
				}
				this.$get('~/apis/cms/article_channel?size=0', query, function(json) {
					if (json.result) {
						_this.list_article_channel.clear();
						_this.list_article_channel.addList(json.result.list)
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
						field: "user_id,phone"
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
			// 获取频道
			this.get_article_channel();
			// 获取用户
			this.get_account();
		}
	}
</script>

<style>
</style>
