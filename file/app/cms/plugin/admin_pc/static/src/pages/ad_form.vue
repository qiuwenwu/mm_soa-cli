<template>
	<main id="cms_ad_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-mm-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>{{ form[field] ? '修改' : '创建' }}CMS广告</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<dt>投放城市</dt>
										<dd>
											<control_select v-model="form.city_id" :options="$to_kv(list_address_city, 'city_id', 'name', 0)" />
										</dd>
										<dt>投放地区</dt>
										<dd>
											<control_select v-model="form.area_id" :options="$to_kv(list_address_area, 'area_id', 'name', 0)" />
										</dd>
										<dt>广告主</dt>
										<dd>
											<control_select v-model="form.user_id" :options="$to_kv(list_account, 'user_id', 'nickname', 0)" />
										</dd>
										<dt>访客数</dt>
										<dd>
											<control_number v-model="form.times_user" :min="0" :max="2147483647" />
										</dd>
										<dt>次数上限</dt>
										<dd>
											<control_number v-model="form.times_max" :min="0" :max="2147483647" />
										</dd>
										<dt>展现量</dt>
										<dd>
											<control_number v-model="form.times_show" :min="0" :max="2147483647" />
										</dd>
										<dt>点击量</dt>
										<dd>
											<control_number v-model="form.times_click" :min="0" :max="2147483647" />
										</dd>
										<dt>费用</dt>
										<dd>
											<control_number v-model="form.fee" :min="0" :max="0" />
										</dd>
										<dt>费用——最大值</dt>
										<dd>
											<control_number v-model="form.fee_max" :min="0" :max="0" />
										</dd>
										<dt>费用上限</dt>
										<dd>
											<control_number v-model="form.fee_max" :min="0" :max="0" />
										</dd>
										<dt class="required">广告名称</dt>
										<dd>
											<control_input v-model="form.name" :minlength="0" :maxlength="16" placeholder=""
											 :required="true" />
										</dd>
										<dt>广告类型</dt>
										<dd>
											<control_input v-model="form.type" :minlength="0" :maxlength="16" placeholder="text文字 / img图片 / video视频 / flash交互动画" />
										</dd>
										<dt>投放位置</dt>
										<dd>
											<control_input v-model="form.location" :minlength="0" :maxlength="16" placeholder="" />
										</dd>
										<dt>付费方式</dt>
										<dd>
											<control_input v-model="form.fee_way" :minlength="0" :maxlength="16" placeholder="click点击付费 / show展现付费 / user访客付费" />
										</dd>
										<dt>展现应用</dt>
										<dd>
											<control_input v-model="form.app" :minlength="0" :maxlength="16" placeholder="将在指定的应用下才展现广告" />
										</dd>
										<dt>所属行业</dt>
										<dd>
											<control_input v-model="form.trade" :minlength="0" :maxlength="24" placeholder="可以根据不同的行业定制不同的投放" />
										</dd>
										<dt>广告标题</dt>
										<dd>
											<control_input v-model="form.title" :minlength="0" :maxlength="32" placeholder="" />
										</dd>
										<dt>呈现设备</dt>
										<dd>
											<control_input v-model="form.device" :minlength="0" :maxlength="125" placeholder="在什么设备上展示，web_pc / web_pad / web_phone / app_pad / app_phone，多个设备用逗号隔开" />
										</dd>
										<dt>广告描述</dt>
										<dd>
											<control_input v-model="form.description" :minlength="0" :maxlength="255" placeholder="" />
										</dd>
										<dt>广告图</dt>
										<dd>
											<mm_upload_img width="10rem" height="10rem" name="img" type="text" v-model="form.img" />
										</dd>
										<dt>跳转链接</dt>
										<dd>
											<control_input v-model="form.url" :minlength="0" :maxlength="255" placeholder="" />
										</dd>
										<dt>关键词</dt>
										<dd>
											<control_input v-model="form.keywords" :minlength="0" :maxlength="255" placeholder="在出现于关键词相关的情况下才打广告，多个关键词用空格分隔" />
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
				url: "/apis/cms/ad?",
				url_get_obj: "/apis/cms/ad?method=get_obj",
				field: "ad_id",
				query: {
					"ad_id": 0
				},
				form: {
					"ad_id": 0,
					"city_id": 0,
					"area_id": 0,
					"user_id": 0,
					"times_user": 0,
					"times_max": 0,
					"times_show": 0,
					"times_click": 0,
					"fee": 0,
					"fee_max": 0,
					"fee_max": 0,
					"name": '',
					"type": '',
					"location": '',
					"fee_way": '',
					"app": '',
					"trade": '',
					"title": '',
					"device": '',
					"description": '',
					"img": '',
					"url": '',
					"keywords": '',
				},
				// 投放城市
				'list_address_city':[],
				// 投放地区
				'list_address_area':[],
				// 广告主
				'list_account':[],
			}
		},
		methods: {
			/**
			 * 获取投放城市
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
			/**
			 * 获取投放地区
			 * @param {query} 查询条件
			 */
			get_address_area(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "area_id,name"
					};
				}
				this.$get('~/apis/sys/address_area?size=0', query, function(json) {
					if (json.result) {
						_this.list_address_area.clear();
						_this.list_address_area.addList(json.result.list)
					}
				});
			},
			/**
			 * 获取广告主
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
			// 获取投放城市
			this.get_address_city();
			// 获取投放地区
			this.get_address_area();
			// 获取广告主
			this.get_account();
		}
	}
</script>

<style>
</style>
