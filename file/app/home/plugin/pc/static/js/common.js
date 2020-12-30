var mixin_page = {
	data() {
		return {
			message: "hello world！",
			nav_top_show: false
		}
	},
	methods: {
		set_lang(lang) {
			$.http.get("/api/sys/lang?type=" + lang, function(res) {
				window.location.href = window.location.href;
			})
		},
		set_color(color) {
			$.http.get("/api/sys/theme?color=" + color, function(res) {
				window.location.href = window.location.href;
			})
		}
	},
	mounted() {
		$('.mm_page').on('scroll', function(e) {
			if ($(this).scrollTop() >= document.body.clientHeight) {
				$('#scroll_top').removeClass('hide');
			} else {
				$('#scroll_top').addClass('hide');
			}
		});
		$('#scroll_top').click(function() {
			$('.mm_page').animate({
				scrollTop: 0
			}, 800);
		});

	}
};
