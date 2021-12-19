<template>
	<main id="sys_share_form">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-mm-12">
						<mm_card>
							<div class="card_head arrow">
								<h5>{{ form[field] ? '修改' : '创建' }}</h5>
							</div>
							<div class="card_body">
								<mm_form>
									<dl>
										<dt>是否启用</dt>
										<dd>
											<control_switch v-model="form.available" />
										</dd>
										<dt>配置名</dt>
										<dd>
											<control_input v-model="form.name" :minlength="0"
												:maxlength="64"
												placeholder="" />
										</dd>
										<dt>二维码X轴</dt>
										<dd>
											<control_input v-model="form.qrcode_pos_x" :minlength="0"
												:maxlength="16"
												placeholder="" />
										</dd>
										<dt>二维码Y轴</dt>
										<dd>
											<control_input v-model="form.qrcode_pos_y" :minlength="0"
												:maxlength="16"
												placeholder="" />
										</dd>
										<dt>二维码定位方式</dt>
										<dd>
											<control_input v-model="form.qrcode_pos_way" :minlength="0"
												:maxlength="16"
												placeholder="" />
										</dd>
										<dt>按钮X轴</dt>
										<dd>
											<control_input v-model="form.button_pos_x" :minlength="0"
												:maxlength="16"
												placeholder="" />
										</dd>
										<dt>按钮Y轴</dt>
										<dd>
											<control_input v-model="form.button_pos_y" :minlength="0"
												:maxlength="16"
												placeholder="" />
										</dd>
										<dt>按钮定位方式</dt>
										<dd>
											<control_input v-model="form.button_pos_way" :minlength="0"
												:maxlength="255"
												placeholder="" />
										</dd>
										<dt>分享背景图</dt>
										<dd>
											<mm_upload_img width="10rem" height="10rem" name="img_bg" type="text"
												v-model="form.img_bg" />
										</dd>
										<dt>背景颜色</dt>
										<dd>
											<control_input v-model="form.background_color" :minlength="0"
												:maxlength="255"
												placeholder="" />
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
				url_add: "/apis/sys/share?method=add",
				url_set: "/apis/sys/share?method=set",
				url_get_obj: "/apis/sys/share?method=get_obj",
				field: "share_id",
				query: {
					"share_id": 0
				},
				form: {
					"share_id": 0,
					"available": 0,
					"name": '',
					"qrcode_pos_x": '',
					"qrcode_pos_y": '',
					"qrcode_pos_way": '',
					"button_pos_x": '',
					"button_pos_y": '',
					"button_pos_way": '',
					"img_bg": '',
					"background_color": '',
				},
				// 是否启用
				'arr_available':["否","是"],
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
