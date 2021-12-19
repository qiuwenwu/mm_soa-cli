<template>
	<main id="cms_article_channel_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-mm-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>{{ form[field] ? '修改' : '创建' }}文章频道</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<dt>频道图标</dt>
										<dd>
											<mm_upload_img width="10rem" height="10rem" name="icon" type="text"
												v-model="form.icon" />
										</dd>
										<dt>频道标题</dt>
										<dd>
											<control_input v-model="form.title" :minlength="0"
												:maxlength="125"
												placeholder="" />
										</dd>
										<dt>是否启用</dt>
										<dd>
											<control_switch v-model="form.available" />
										</dd>
										<dt>是否隐藏</dt>
										<dd>
											<control_switch v-model="form.hide" />
										</dd>
										<dt>描述</dt>
										<dd>
											<control_input v-model="form.description" :minlength="0"
												:maxlength="255"
												placeholder="描述该频道的作用" />
										</dd>
										<dt>上级</dt>
										<dd>
											<control_select type="list" v-model="form.father_id"
												:options="$to_kv(list_article_channel, 'channel_id', 'name')" />
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
				url_add: "/apis/cms/article_channel?method=add",
				url_set: "/apis/cms/article_channel?method=set",
				url_get_obj: "/apis/cms/article_channel?method=get_obj",
				field: "channel_id",
				query: {
					"channel_id": 0
				},
				form: {
					//频道ID
					"channel_id":0,
					//频道图标
					"icon": '',
					//频道标题
					"title": '',
					//是否启用
					"available":1,
					//是否隐藏
					"hide":0,
					//描述
					"description": '',
					//上级
					"father_id":0,
				},
				// 是否启用
				'arr_available':["否","是"],
				// 是否隐藏
				'arr_hide':["否","是"],
				// 上级
				'list_article_channel':[],
			}
		},
		methods: {
			/**
			 * 获取上级
			 * @param {query} 查询条件
			 */
			get_article_channel(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "channel_id,name,father_id"
					};
				}
				this.$get('~/apis/cms/article_channel?size=0', query, function(json) {
					if (json.result) {
						_this.list_article_channel.clear();
						_this.list_article_channel.addList(json.result.list)
					}
				});
			},
		},
		created() {
			// 获取上级
			this.get_article_channel();
		}
	}
</script>

<style>
</style>
