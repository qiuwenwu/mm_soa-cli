<template>
	<main id="sys_notice_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-mm-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>{{ form[field] ? '修改' : '创建' }}系统公告</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<!-- <dt>广播频道</dt>
										<dd>
											<control_select v-model="form.broadcast" :options="$to_kv(arr_broadcast)" />
										</dd> -->
										<dt class="required">标题</dt>
										<dd>
											<control_input v-model="form.title" :minlength="0" :maxlength="125" placeholder=""
											 :required="true" />
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
				url_add: "/apis/sys/notice?method=add",
				url_set: "/apis/sys/notice?method=set",
				url_get_obj: "/apis/sys/notice?method=get_obj",
				field: "notice_id",
				query: {
					"notice_id": 0
				},
				form: {
					"notice_id": 0,
					"broadcast": '首页',
					"title": '',
					"content": '',
				},
				// 广播频道
				'arr_broadcast':[{"name":"无","value":"无"},{"name":"首页","value":"首页"},{"name":"社区","value":"社区"},{"name":"资产","value":"资产"},{"name":"应用","value":"应用"}],
			}
		},
		methods: {
		},
		created() {
		}
	}
</script>

<style>
</style>
