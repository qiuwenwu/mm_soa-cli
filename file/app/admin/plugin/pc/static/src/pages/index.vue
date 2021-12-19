<template>
	<main id="index">
		<mm_warp>
			<mm_container>
				<mm_row>
					<mm_col class="col-12 col-md-6 col-lg-4">
						<mm_card class="balance">
							<div class="card_head arrow">
								<h5>
									可提总额
								</h5>
							</div>
							<div class="card_body">
								<mm_btn class="card_coin" v-for="(o, idx) in list_coin" v-if="o.can_withdraw"
									:url="`/chain/user_wallet?page=1&size=10&coin_id=${o.coin_id}`">
									<div>
										<span class="media">
											<img class="img" :src="o.img || '/sys/img/file_1635304200263.png'"
												alt="币种图片" />
										</span>
										<span>{{ o.type }}</span>
									</div>
									<div>
										<span>{{ $get_name(list_wallet, o.coin_id, 'coin_id', 'sum_balance') || 0 }}</span>
									</div>
								</mm_btn>
							</div>
						</mm_card>
					</mm_col>
					
					<mm_col class="col-12 col-md-6 col-lg-4">
						<mm_card class="balance">
							<div class="card_head arrow">
								<h5>
									订单销售数
								</h5>
							</div>
							<div class="card_body">
								<table>
									<thead>
										<tr>
											<td>
												<span>
													商品封面
												</span>
											</td>
											<td>
												<span>
													商品名
												</span>
											</td>
											<td>
												<span>
													销售量
												</span>
											</td>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(o ,i) in list_goods">
											<td>
												<img class="img" :src="o.img" />
											</td>
											<td>
												<span>
													{{ o.name }}
												</span>
											</td>
											<td>
												<span>
													{{ o.sales }}
												</span>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</mm_card>
					</mm_col>
					
					<mm_col class="col-12 col-lg-8">
						<mm_card class="balance">
							<div class="card_head arrow">
								<h5>
									产出情况
								</h5>
							</div>
							<div class="card_body">
								<table>
									<thead>
										<tr>
											<td>
												<span>
													图标
												</span>
											</td>
											<td>
												<span>
													类型
												</span>
											</td>
											<td>
												<span>
													总产出额度
												</span>
											</td>
											<td>
												<span>
													今日产出
												</span>
											</td>
											<td>
												<span>
													今日发放
												</span>
											</td>
											<td>
												<span>
													今日待发放
												</span>
											</td>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(o,i) in produce_info">
											<td>
												<img class="img" :src="$get_name(list_coin ,o.coin_id ,'coin_id' ,'img') || '/sys/img/file_1635304200263.png'" />
											</td>
											<td>
												<span>
													{{ $get_name(list_coin ,o.coin_id ,"coin_id" ,"type") }}
												</span>
											</td>
											<td v-for="(val ,key) in o" v-if="key !== 'coin_id'">
												<span>
													{{ val }}
												</span>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</mm_card>
					</mm_col>
					
					<mm_col>
						<mm_card class="balance">
							<div class="card_head arrow">
								<h5>
									提现记录
								</h5>
							</div>
							<div class="card_body">
								<table>
									<thead>
										<tr>
											<td>
												<span>
													图标
												</span>
											</td>
											<td>
												<span>
													币种
												</span>
											</td>
											<td>
												<span>
													总额度
												</span>
											</td>
											<td>
												<span>
													成功额度
												</span>
											</td>
											<td>
												<span>
													失败额度
												</span>
											</td>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(o,i) in list_extract">
											<td>
												<img class="img" :src="$get_name(list_coin ,o.coin_id ,'coin_id' ,'img') || '/sys/img/file_1635304200263.png'" />
											</td>
											<td>
												{{ $get_name(list_coin ,o.coin_id ,'coin_id' ,'type') }}
											</td>
											<td v-for="(val ,key) in o" v-if="key !== 'coin_id'">
												<span>
													{{ val }}
												</span>
											</td>
										</tr>
									</tbody>
								</table>
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
		data() {
			return {
				// 列表请求地址
				url_get_list: "",
				// 查询条件
				query: {},
				// 视图模型
				vm: {},

				produce_key: [{
						"name": "累计产出",
						"key": "all_actual"
					},
					{
						"name": "今日产出",
						"key": "now_actual"
					},
					{
						"name": "今日发放",
						"key": "now_grant"
					},
					{
						"name": "今日待发放",
						"key": "now_lock"
					}
				],

				list_coin: [],
				list_wallet: [],
				produce_info: {},
				list_goods: [],
				list_extract: []
			}
		},
		methods: {
			/**
			 * @description 滚动刷新
			 * @param {Number} n 滚动的方向，-1是向上， 1是向下
			 */
			scoll(n) {
				this.go(n);
			},
			
			/**
			 *  获取币种
			 */
			get_list_coin() {
				let _this = this;
				let query = {
					"state": 1,
					"field": "coin_id ,type ,img ,can_withdraw"
				};
				this.$get("~/apis/chain/coin?", query, function(res) {
					if (res.result && res.result.list) {
						let list = res.result.list;
						console.log("list_coin" ,list);
						
						_this.list_coin = list;
					} else if (res.error) {
						console.log(res.error);
					}
				});
			},
			
			/**
			 *  获取钱包信息
			 */
			get_list_wallet() {
				let _this = this;

				let query = {
					groupby: "coin_id",
					field: "balance"
				};

				this.$get("~/apis/chain/user_wallet?method=sum", query, function(res) {
					if (res.result && res.result.list) {
						let list = res.result.list;
						console.log("list_wallet", list);

						_this.list_wallet = list;
					} else if (res.error) {
						console.log(res.error);
					}
				});
			},
			
			/**
			 *  获取产出信息
			 */
			get_produce_info() {
				let _this = this;
				this.$get("~/apis/mall/get_produce_info?", {}, function(res) {
					if (res.result && res.result.list) {
						let list = res.result.list;
						console.log("produce_info", list);

						_this.produce_info = list;
					} else if (res.error) {
						console.error(res.error);
					}
				});
			},
			
			/**
			 *  获取商品销售额
			 */
			get_list_goods() {
				let _this = this;
				let query = {
					field: "name ,img ,sales"
				};
				this.$get("~/apis/mall/goods?" ,query ,function(res){
					if (res.result && res.result.list) {
						let list = res.result.list;
						console.log("list_goods" ,list);
						
						_this.list_goods = list;
					}
					else if(res.error){
						
					}
				});
			},
			
			/**
			 *  获取提现信息
			 */
			get_list_extract() {
				let _this = this;
				let query = {
					field: "coin_id ,num ,state"
				};
				this.$get("~/apis/chain/user_extract?" ,query ,function(res){
					if (res.result && res.result.list) {
						let list = res.result.list;
						let arr = [];
						list.map((o)=>{
							let obj = {};
							if(arr.length > 1){
								obj = arr.getObj({"coin_id": o.coin_id});
							}
							
							if(obj && JSON.stringify(obj) !== "{}"){
								obj["total"] += o.num;
								if(o.state === 2){
									obj["fail"] += o.num;
								}
								else if (o.state === 3){
									obj["success"] += o.num;
								}
							}
							else{
								obj = {"coin_id": o.coin_id ,"total": o.num ,"success": 0 ,"fail": 0};
								if(o.state === 2){
									obj["fail"] = o.num;
								}
								else if (o.state === 3){
									obj["success"] = o.num;
								}
								arr.push(obj);
							}
						});
						console.log("list_extract" ,arr);
						
						_this.list_extract = arr;
					}
					else if(res.error){
						console.error(res.error);
					}
				});
			},
			
		},
		created() {
			this.get_list_coin();
			this.get_list_wallet();
			this.get_produce_info();
			this.get_list_goods();
			this.get_list_extract();
		}
	}
</script>

<style>
	#index .mm_btn {
		padding: 0;
		border: none;
		display: block;
	}

	#index .balance .card_body {
		overflow: auto;
		height: 12.25rem;
	}

	#index .arrow::after {
		position: absolute;
		right: 1rem;
		top: calc(50% + 1px);
		transform: translateY(-50%) rotate(-45deg);
		content: "";
		padding: 3px;
		display: block;
		border: 1px solid var(--color_default_h);
		border-width: 0 1px 1px 0;
		transition: all 0.2s;
	}

	#index .balance .card_coin {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: .5rem .75rem;
	}

	#index .balance .card_coin:hover {
		background-color: rgba(0, 130, 220, .15) !important;
	}

	#index .balance .media {
		padding: 0;
		padding-right: .75rem;
	}

	#index .balance img {
		height: 2rem;
		width: 2rem;
	}

	#index .produce {
		display: flex;
		justify-content: space-between;
	}

	/* 标题栏 */

	/* 搜索栏 */

	/* 排序栏 */

	/* 列表 */

	/* 选择栏 */
</style>
