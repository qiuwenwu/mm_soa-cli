<template>
	<main id="mall_product_channel_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-mm-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>{{ form[field] ? '修改' : '创建' }}商品专区</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<dt>是否启用</dt>
										<dd>
											<control_switch v-model="form.available" />
										</dd>
										<dt>是否隐藏</dt>
										<dd>
											<control_switch v-model="form.hide" />
										</dd>
										<dt>是否可评论</dt>
										<dd>
											<control_switch v-model="form.can_comment" />
										</dd>
										<dt>上级</dt>
										<dd>
											<control_select v-model="form.father_id" :options="$to_kv(list_product_channel, 'channel_id', 'name', 0)" />
										</dd>
										<dt>所属城市</dt>
										<dd>
											<control_select v-model="form.city_id" :options="$to_kv(list_address_city, 'city_id', 'name', 0)" />
										</dd>
										<dt class="required">频道类型</dt>
										<dd>
											<control_input v-model="form.type" :minlength="0" :maxlength="16" placeholder="question问答 / info资讯 / news新闻 / product产品 / activity活动"
											 :required="true" />
										</dd>
										<dt class="required">频道名称</dt>
										<dd>
											<control_input v-model="form.name" :minlength="0" :maxlength="0" placeholder=""
											 :required="true" />
										</dd>
										<dt>频道标题</dt>
										<dd>
											<control_input v-model="form.title" :minlength="0" :maxlength="125" placeholder="" />
										</dd>
										<dt>风格模板</dt>
										<dd>
											<control_input v-model="form.template" :minlength="0" :maxlength="64" placeholder="频道和产品都使用的样式" />
										</dd>
										<dt>频道图标</dt>
										<dd>
											<mm_upload_img width="10rem" height="10rem" name="icon" type="text" v-model="form.icon" />
										</dd>
										<dt>外链地址</dt>
										<dd>
											<control_input v-model="form.url" :minlength="0" :maxlength="255" placeholder="如果该频道是跳转到其他网站的情况下，就在该URL上设置" />
										</dd>
										<dt>描述</dt>
										<dd>
											<control_input v-model="form.description" :minlength="0" :maxlength="255" placeholder="描述该频道的作用" />
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
				url: "/apis/mall/product_channel?",
				url_get_obj: "/apis/mall/product_channel?method=get_obj",
				field: "channel_id",
				query: {
					"channel_id": 0
				},
				form: {
					"channel_id": 0,
					"available": 0,
					"hide": 0,
					"can_comment": 0,
					"father_id": 0,
					"city_id": 0,
					"type": '',
					"name": '',
					"title": '',
					"template": '',
					"icon": '',
					"url": '',
					"description": '',
				},
				// 是否启用
				'arr_available':["否","是"],
				// 是否隐藏
				'arr_hide':["否","是"],
				// 是否可评论
				'arr_can_comment':["否","是"],
				// 上级
				'list_product_channel':[],
				// 所属城市
				'list_address_city':[],
			}
		},
		methods: {
			/**
			 * 获取上级
			 * @param {query} 查询条件
			 */
			get_product_channel(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "channel_id,name,father_id"
					};
				}
				this.$get('~/apis/mall/product_channel?size=0', query, function(json) {
					if (json.result) {
						_this.list_product_channel.clear();
						_this.list_product_channel.addList(json.result.list)
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
			// 获取上级
			this.get_product_channel();
			// 获取所属城市
			this.get_address_city();
		}
	}
</script>

<style>
</style>
