<template>
	<mm_page id="page_div">
		<header>
			<mm_warp>
				<mm_container>
					<mm_row>
						<mm_col width="100">
							<mm_view url="/">
								<h3>
									<span>块</span>
									<span class="fr">&lt; 返回</span></router-link>
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
					<mm_row class="center">
						<mm_col width="100">
							<mm_view>
								<h5>无圆角</h5>
							</mm_view>
						</mm_col>
						<mm_col width="50">
							<mm_card class="b-n">
								<div class="card_head">块头</div>
								<div class="card_body">
									<p>&nbsp;</p>内容主体<p>&nbsp;</p>
								</div>
								<div class="card_foot">块脚</div>
							</mm_card>
						</mm_col>
						<mm_col width="50">
							<mm_card class="b-n">
								<div class="card_head">块头</div>
								<div class="card_body">
									<p>&nbsp;</p>内容主体<p>&nbsp;</p>
								</div>
								<div class="card_foot bt">块脚</div>
							</mm_card>
						</mm_col>

						<mm_col width="100">
							<mm_view>
								<h5>带圆角块</h5>
							</mm_view>
						</mm_col>
						<mm_col width="50">
							<mm_card class="ba b-a">
								<div class="card_head">块头</div>
								<div class="card_body">
									<p>&nbsp;</p>内容主体<p>&nbsp;</p>
								</div>
								<div class="card_foot bt">块脚</div>
							</mm_card>
						</mm_col>
						<mm_col width="50">
							<mm_card>
								<div class="card_head">块头</div>
								<div class="card_body">
									<p>&nbsp;</p>内容主体<p>&nbsp;</p>
								</div>
								<div class="card_foot">块脚</div>
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
	#page_div header,
	#page_div footer {
		background: #FDFDFD;
	}
</style>
