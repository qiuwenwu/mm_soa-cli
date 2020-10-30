<template>
	<mm_page id="page_div">
		<header>
			<mm_grid>
				<mm_col width="100">
					<mm_view url="/">
						<h3>
							<span>块</span>
							<span class="fr">&lt; 返回</span></router-link>
						</h3>
					</mm_view>
				</mm_col>
			</mm_grid>
		</header>
		<main>
			<mm_grid>
				<mm_col width="100">
					<mm_grid class="center">
						<mm_col width="100">
							<h5>默认块</h5>
							<mm_view class="ba">
								<div class="head">块头</div>
								<div class="body">
									<p>&nbsp;</p>内容主体<p>&nbsp;</p>
								</div>
								<div class="foot">块脚</div>
							</mm_view>

							<mm_view class="card b-n">
								<div class="head">块头</div>
								<div class="body">
									<p>&nbsp;</p>内容主体<p>&nbsp;</p>
								</div>
								<div class="foot">块脚</div>
							</mm_view>
						</mm_col>
						<mm_col width="100">
							<h5>带圆角块</h5>
							<mm_view class="ba b-a">
								<div class="head">块头</div>
								<div class="body">
									<p>&nbsp;</p>内容主体<p>&nbsp;</p>
								</div>
								<div class="foot">块脚</div>
							</mm_view>
							<mm_view class="card">
								<div class="head">块头</div>
								<div class="body">
									<p>&nbsp;</p>内容主体<p>&nbsp;</p>
								</div>
								<div class="foot">块脚</div>
							</mm_view>
						</mm_col>
					</mm_grid>
				</mm_col>
			</mm_grid>
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
