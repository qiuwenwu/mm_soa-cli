<template>
	<table class="mm_tree">
		
	</table>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: function() {
					return [];
				}
			},
			father_id: {
				type: String,
				default: "father_id"
			}
		},
		data() {
			return {};
		},
		computed: {
			tree() {
				var tree = this.list.toTree();
				var list = [];
				for (var i = 0; i < tree.length; i++) {
					list.push();
				}
				return list;
			}
		}
	}
</script>

<style>

</style>
