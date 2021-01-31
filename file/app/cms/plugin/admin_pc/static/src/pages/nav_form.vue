<template>
	<main id="cms_nav_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-mm-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>{{ form[field] ? '修改' : '创建' }}CMS导航</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<dt>是否启用</dt>
										<dd>
											<mm_switch v-model="form.available" />
										</dd>
										<dt class="required">英文名称</dt>
										<dd>
											<mm_input v-model="form.name" :minlength="0" :maxlength="32" placeholder="用于多国语识别"
											 :required="true" />
										</dd>
										<dt>中文标题</dt>
										<dd>
											<mm_input v-model="form.title" :minlength="0" :maxlength="32" placeholder="用于中文提示" />
										</dd>
										<dt>跳转链接</dt>
										<dd>
											<mm_input v-model="form.url" :minlength="0" :maxlength="255" placeholder="跳转的链接地址" />
										</dd>
										<dt>风格样式</dt>
										<dd>
											<mm_input v-model="form.style" :minlength="0" :maxlength="255" placeholder="自定义css样式" />
										</dd>
										<dt>样式类型</dt>
										<dd>
											<mm_input v-model="form.class" :minlength="0" :maxlength="32" placeholder="绑定的css class" />
										</dd>
										<dt>跳转方式</dt>
										<dd>
											<mm_input v-model="form.target" :minlength="0" :maxlength="32" placeholder="_blank表示新窗口跳转" />
										</dd>
										<dt>展现位置</dt>
										<dd>
											<mm_input v-model="form.position" :minlength="0" :maxlength="125" placeholder="top顶部 / bottom底部 / side侧边，main主要，quick快捷，menu菜单，多个位置用逗号隔开" />
										</dd>
										<dt>呈现设备</dt>
										<dd>
											<mm_input v-model="form.device" :minlength="0" :maxlength="125" placeholder="在什么设备上展示，web_pc / web_pad / web_phone / app_pad / app_phone，多个设备用逗号隔开" />
										</dd>
										<dt>上级</dt>
										<dd>
											<mm_select v-model="form.father_id" :options="$to_kv(list_nav, 'nav_id', 'name', 0)" />
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
				url: "/apis/cms/nav?",
				url_get_obj: "/apis/cms/nav?method=get_obj",
				field: "nav_id",
				query: {
					"nav_id": 0
				},
				form: {
					"nav_id": 0,
					"available": 0,
					"name": '',
					"title": '',
					"url": '',
					"style": '',
					"class": '',
					"target": '',
					"position": '',
					"device": '',
					"father_id": 0,
				},
				// 是否启用
				'arr_available':["否","是"],
				// 上级
				'list_nav':[],
			}
		},
		methods: {
			/**
			 * 获取上级
			 * @param {query} 查询条件
			 */
			get_nav(query) {
				var _this = this;
				if (!query) {
					query = {
						field: "nav_id,name,father_id"
					};
				}
				this.$get('~/apis/cms/nav?size=0', query, function(json) {
					if (json.result) {
						_this.list_nav.clear();
						_this.list_nav.addList(json.result.list)
					}
				});
			},
		},
		created() {
			// 获取上级
			this.get_nav();
		}
	}
</script>

<style>
</style>
