$(document).ready( function() {

	 function freezePage() {
        $('html, body').addClass('no-scroll');
    }
    
    function unfreezePage() {
        $('html, body').removeClass('no-scroll');
    }

	function TopMenu() {
		var openBtn = $('.top-menu-open'),
		menu = $('.top-menu');

		var init = function() {
			openBtn.on('click', showMenu);
			menu.find('.top-menu-close').on('click', hideMenu);
		};

		function showMenu() {
			menu.addClass('visible');
			freezePage();
		}

		function hideMenu() {
			menu.removeClass('visible');
			unfreezePage();
		}

		return {
			init: init
		};
	}

	var topNav = TopMenu();
	topNav.init();

	$('.slider').flickity( {
		cellAlign: 'left',
        contain: true,
        pageDots: false,
        arrowShape: { 
  			x0: 10,
  			x1: 60, y1: 50,
  			x2: 80, y2: 50,
  			x3: 30
		},
		draggable: false
	} );

	$('.nav-slider').flickity( {
		asNavFor: '.slider',
        cellAlign: 'left',
        pageDots: false,
        contain: true,
        groupCells: true,
        prevNextButtons: false
	} );
} );
