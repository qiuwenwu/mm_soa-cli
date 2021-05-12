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
										<dt>是否启用</dt>
										<dd>
											<control_switch v-model="form.available" />
										</dd>
										<dt>状态</dt>
										<dd>
											<control_select v-model="form.state" :options="$to_kv(arr_state)" />
										</dd>
										<dt>文章分类</dt>
										<dd>
											<control_select v-model="form.type_id" :options="$to_kv(list_article_type, 'type_id', 'name', 0)" />
										</dd>
										<dt>频道</dt>
										<dd>
											<control_select v-model="form.channel_id" :options="$to_kv(list_article_channel, 'channel_id', 'name', 0)" />
										</dd>
										<dt>用户</dt>
										<dd>
											<control_select v-model="form.user_id" :options="$to_kv(list_account, 'user_id', 'nickname', 0)" />
										</dd>
										<dt>所属城市</dt>
										<dd>
											<control_select v-model="form.city_id" :options="$to_kv(list_address_city, 'city_id', 'name', 0)" />
										</dd>
										<dt>热度</dt>
										<dd>
											<control_number v-model="form.hot" :min="0" :max="1000000000" />
										</dd>
										<dt>点赞次数</dt>
										<dd>
											<control_number v-model="form.praise" :min="0" :max="1000000000" />
										</dd>
										<dt>采集规则ID</dt>
										<dd>
											<control_input v-model="form.collect_id" :minlength="0" :maxlength="0" placeholder="如果文章是通过采集的方式获得，那么具有采集ID" />
										</dd>
										<dt>语言</dt>
										<dd>
											<control_select v-model="form.lang" :options="$to_kv(arr_lang)" />
										</dd>
										<dt>作者</dt>
										<dd>
											<control_input v-model="form.author" :minlength="0" :maxlength="16" placeholder="写出该文章的人" />
										</dd>
										<dt class="required">标题</dt>
										<dd>
											<control_input v-model="form.title" :minlength="0" :maxlength="125" placeholder="用于文章和html的title标签中"
											 :required="true" />
										</dd>
										<dt>关键词</dt>
										<dd>
											<control_input v-model="form.keywords" :minlength="0" :maxlength="125" placeholder="引擎收录" />
										</dd>
										<dt>描述</dt>
										<dd>
											<control_input v-model="form.description" :minlength="0" :maxlength="255" placeholder="用于文章提纲和搜索引擎收录" />
										</dd>
										<dt>来源</dt>
										<dd>
											<control_input v-model="form.source" :minlength="0" :maxlength="255" placeholder="文章的出处" />
										</dd>
										<dt>来源地址</dt>
										<dd>
											<control_input v-model="form.url" :minlength="0" :maxlength="255" placeholder="用于跳转到发布该文章的网站" />
										</dd>
										<dt>标签</dt>
										<dd>
											<control_input v-model="form.tag" :minlength="0" :maxlength="255" placeholder="用于标注文章所属相关内容，多个标签用空格隔开" />
										</dd>
										<dt>封面图</dt>
										<dd>
											<mm_upload_img width="10rem" height="10rem" name="img" type="text" v-model="form.img" />
										</dd>
										<dt class="required">正文</dt>
										<dd>
											<control_rich v-model="form.content"></control_rich>
										</dd>
										<dt class="required">收藏者</dt>
										<dd>
											<mm_textarea v-model="form.collecter" type="text" placeholder="多个收藏者用”,“分隔"></mm_textarea>
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
				url: "/apis/cms/article?",
				url_get_obj: "/apis/cms/article?method=get_obj",
				field: "article_id",
				query: {
					"article_id": 0
				},
				form: {
					"article_id": 0,
					"available": 0,
					"state": 0,
					"type_id": 0,
					"channel_id": 0,
					"user_id": 0,
					"city_id": 0,
					"hot": 0,
					"praise": 0,
					"collect_id": 0,
					"lang": '',
					"author": '',
					"title": '',
					"keywords": '',
					"description": '',
					"source": '',
					"url": '',
					"tag": '',
					"img": '',
					"content": '',
					"collecter": '',
				},
				// 是否启用
				'arr_available':["否","是"],
				// 状态
				'arr_state':["","正常","推荐","认证","违规","官方"],
				// 文章分类
				'list_article_type':[],
				// 频道
				'list_article_channel':[],
				// 用户
				'list_account':[],
				// 所属城市
				'list_address_city':[],
				// 语言
				'arr_lang':[{"name":"zh_cn","value":"zh_cn"},{"name":"en","value":"en"},{"name":"zh_tw","value":"zh_tw"},{"name":"ko","value":"ko"},{"name":"ja","value":"ja"}],
			}
		},
		methods: {
			/**
			 * 获取文章分类
			 * @param {query} 查询条件
			 */
			get_article_type(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "type_id,name"
					};
				}
				this.$get('~/apis/cms/article_type?size=0', query, function(json) {
					if (json.result) {
						_this.list_article_type.clear();
						_this.list_article_type.addList(json.result.list)
					}
				});
			},
			/**
			 * 获取频道
			 * @param {query} 查询条件
			 */
			get_article_channel(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "channel_id,name"
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
			/**
			 * 获取所属城市
			 * @param {query} 查询条件
			 */
			get_address_city(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "city_id,name"
					};
				}
				this.$get('~/apis/sys/address_city?size=0', query, function(json) {
					if (json.result) {
						_this.list_address_city.clear();
						_this.list_address_city.addList(json.result.list)
					}
				});
			},
		},
		created() {
			// 获取文章分类
			this.get_article_type();
			// 获取频道
			this.get_article_channel();
			// 获取用户
			this.get_account();
			// 获取所属城市
			this.get_address_city();
		}
	}
</script>

<style>
</style>
