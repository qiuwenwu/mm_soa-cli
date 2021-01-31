<template>
	<main id="error_403">
		<div class="box">
			<h1>403</h1>
			<div class="center">
				<h5>没有访问权限</h5>
				<p><a href="http://mm.elins.cn">http://mm.elins.cn</a></p>
			</div>
		</div>
		<div class="border"></div>
		<div class="border br2"></div>
	</main>
</template>

<script>
</script>

<style>
	#error_403 h1 {
		font-size: 10rem;
		line-height: 1;
	}

	#error_403 .box {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		margin-top: -4rem;
		z-index: 2;
	}

	#error_403 .center {
		border-top: 1px solid #e1e4e8;
		padding-top: 0.5rem;
	}

	#error_403 .border {
		opacity: 0.75;
		width: 25rem;
		height: 25rem;
		border: 3px solid #c5d9f5;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -4rem;
		transform: translate(-50%, -50%) rotate(165deg);
		background: rgba(255, 255, 255, .5);
	}

	#error_403 .br2 {
		border-color: #f5cbc5;
		transform: translate(-50%, -50%) rotate(210deg);
		background: rgba(255, 255, 255, .5);
	}
</style>
