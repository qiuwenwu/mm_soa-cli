<template>
	<mm_page id="page_loading">
		<header>
			<mm_warp>
				<mm_container>
					<mm_row>
						<mm_col width="100">
							<mm_view url="/">
								<h3>
									<span>加载</span>
									<span class="fr">&lt; 返回</span>
								</h3>
							</mm_view>
						</mm_col>
					</mm_row>
				</mm_container>
			</mm_warp>
		</header>
		<main>
			<mm_warp>
				<mm_container>
					<mm_row>
						<mm_col class="col-6 col-md-3">
							<mm_card>
								<div class="card_head">样式一</div>
								<div class="card_body">
									<mm_loading></mm_loading>
								</div>
							</mm_card>
						</mm_col>
						<mm_col class="col-6 col-md-3">
							<mm_card>
								<div class="card_head">样式二</div>
								<div class="card_body">
									<mm_loading class="loading"></mm_loading>
								</div>
							</mm_card>
						</mm_col>
						<mm_col class="col-6 col-md-3">
							<mm_card>
								<div class="card_head">样式三</div>
								<div class="card_body">
									<mm_loading><i class="fa fa-user"></i></mm_loading>
								</div>
							</mm_card>
						</mm_col>
						<mm_col class="col-6 col-md-3">
							<mm_card>
								<div class="card_head">样式四</div>
								<div class="card_body">
									<mm_loading><img src="/img/logo_round.png" style="width: 2rem;"></mm_loading>
								</div>
							</mm_card>
						</mm_col>
						<mm_col class="col-6 col-md-3">
							<mm_card>
								<div class="card_head">样式五</div>
								<div class="card_body">
									<mm_loading display="2"></mm_loading>
								</div>
							</mm_card>
						</mm_col>
					</mm_row>
				</mm_container>
			</mm_warp>
		</main>
	</mm_page>
</template>

<script>
</script>

<style>
	#page_loading .loading {
		text-align: left;
		max-width: 5rem;
	}

	#page_loading .loading .state {
		line-height: 1.75;
	}

	#page_loading .loading .load {
		float: left;
	}
	#page_loading .card_body {
		text-align: center;
	}
	
	.mm_loading {
		margin: auto;
	}
	
</style>
