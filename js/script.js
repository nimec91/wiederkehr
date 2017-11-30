function TopMenu() {
	var openBtn = $('.top-menu-open'),
		menu = $('.top-menu');

	var init = function() {
		openBtn.on('click', showMenu);
		menu.find('.top-menu-close').on('click', hideMenu);
	};

	function showMenu() {
		menu.addClass('visible');
	}

	function hideMenu() {
		menu.removeClass('visible');
	}

	return {
		init: init
	};
}
var topNav = TopMenu();
topNav.init();