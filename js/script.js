$(document).ready(function () {
    function freezePage() {
        $('html, body').addClass('no-scroll');
    }

    function unfreezePage() {
        $('html, body').removeClass('no-scroll');
    }

    function TopMenu() {
        var openBtn = $('.top-menu-open'),
        menu = $('.top-menu');

        var init = function () {
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

    function Map(options, objects) {
        var map;

        var init = function() {
            map = new google.maps.Map(document.getElementById('map'), options);
            for (var i = 0; i < objects.length; i++ ) {
                initObject( objects[i] );
            }
        };

        function initObject(object) {
            var marker = new google.maps.Marker( {
                position: object.marker.position,
                map: map,
                icon: object.marker.icon
            } ),
            infoWindow = new SnazzyInfoWindow({
                content: object.window.content,
                marker: marker,
                maxWidth: 425,
                maxHeight: 555,
                closeWhenOthersOpen: true,
                edgeOffset: {
                    top: window.matchMedia('(min-width: 992px)').matches ? 100 : 35,
                    right: 20,
                    bottom: 20,
                    left: 20
                },
                callbacks: {
                    open: function() {
                        var wrapper = this.getWrapper();
                        $(wrapper).find('.my-info-window-slider').slick( {
                            dots: true,
                            draggable: false,
                            autoplay: true,
                            responsive: [
                            {
                                breakpoint: 992,
                                settings: {
                                    draggable: true,
                                    arrows: false
                                }
                            }
                            ]
                        } );
                    }
                }
            });

            object.marker.markerObject = marker;

            marker.addListener( 'mouseover', function () {
                marker.setIcon(object.marker.hoverIcon);
            } );
            marker.addListener( 'mouseout', function () {
                marker.setIcon(object.marker.icon);
            } );
        }

        return {
            init: init
        };
    }

    if ( $('#map').length ) {
        var mapObjects = [],
        mapOptions = {
            zoom: 4,
            center: new google.maps.LatLng(50.2616112, 28.6370312),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
            styles: [
            {
                "elementType": "labels",
                "stylers": [
                {
                    "visibility": "off"
                }
                ]
            },
            {
                "featureType": "landscape",
                "stylers": [
                {
                    "color": "#742425"
                }
                ]
            },
            {
                "featureType": "poi.park",
                "stylers": [
                {
                    "color": "#742425"
                }
                ]
            },
            {
                "featureType": "road",
                "stylers": [
                {
                    "visibility": "off"
                }
                ]
            },
            {
                "featureType": "water",
                "stylers": [
                {
                    "color": "#c8c8c8"
                },
                {
                    "visibility": "simplified"
                }
                ]
            }
            ]
        },
        mapFilters = {
            price: '',
            country: ''
        };

        mapObjects[0] = {
            marker: {
                position: new google.maps.LatLng(50.2616112, 28.6370312),
                icon: 'images/home-icon.png',
                hoverIcon: 'images/counter-icon.png',
                category: {
                    price: ['all-price', 'expensive'],
                    country: ['all-country', 'ukraine']
                }
            },
            window: {
                content: '<div class="my-info-window">' +
                '<div class="my-info-window-header">' +
                'Window Name' +
                '</div>' +
                '<div class="my-info-window-slider">' +
                '<div class="my-info-window-slide clearfix">' +
                '<div class="my-info-slide-item">' +
                '<div class="my-info-slide-item-img">' +
                '<img src="images/pop-up-1.jpg" alt="" width="135" height="145">' +
                '</div>' +
                '<div class="my-info-slide-text">' +
                '<span class="my-info-slide-item-title">Property 1</span><br/>' +
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac lacus sit amet lorem bibendum tristique id nec nunc. Vestibulum tempor purus<br/>' +
                '<a href="#" class="my-info-slide-item-link">Learn more</a>' +
                '</div>' +
                '</div>' +
                '<div class="my-info-slide-item">' +
                '<div class="my-info-slide-item-img">' +
                '<img src="images/pop-up-2.jpg" alt="" width="135" height="170">' +
                '</div>' +
                '<div class="my-info-slide-text">' +
                '<span class="my-info-slide-item-title">Property 2</span><br/>' +
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac lacus sit amet lorem bibendum tristique id nec nunc. Vestibulum tempor purus euismod mauris suscipit, quis fringilla odio convallis. Proin a orci nisl.<br/>' +
                '<a href="#" class="my-info-slide-item-link">Learn more</a>' +
                '</div>' +
                '</div>' +
                '<div class="my-info-slide-item">' +
                '<div class="my-info-slide-item-img">' +
                '<img src="images/pop-up-3.jpg" alt="" width="135" height="145">' +
                '</div>' +
                '<div class="my-info-slide-text">' +
                '<span class="my-info-slide-item-title">Property 3</span><br/>' +
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac lacus sit amet lorem bibendum tristique id nec nunc. Vestibulum tempor purus<br/>' +
                '<a href="#" class="my-info-slide-item-link">Learn more</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="my-info-window-slide clearfix">' +
                '<div class="my-info-slide-item">' +
                '<div class="my-info-slide-item-img">' +
                '<img src="images/pop-up-4.jpg" alt="" width="135" height="145">' +
                '</div>' +
                '<div class="my-info-slide-text">' +
                '<span class="my-info-slide-item-title">Property 1</span><br/>' +
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac lacus sit amet lorem bibendum tristique id nec nunc. Vestibulum tempor purus<br/>' +
                '<a href="#" class="my-info-slide-item-link">Learn more</a>' +
                '</div>' +
                '</div>' +
                '<div class="my-info-slide-item">' +
                '<div class="my-info-slide-item-img">' +
                '<img src="images/pop-up-5.jpg" alt="" width="135" height="170">' +
                '</div>' +
                '<div class="my-info-slide-text">' +
                '<span class="my-info-slide-item-title">Property 2</span><br/>' +
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac lacus sit amet lorem bibendum tristique id nec nunc. Vestibulum tempor purus euismod mauris suscipit, quis fringilla odio convallis. Proin a orci nisl.<br/>' +
                '<a href="#" class="my-info-slide-item-link">Learn more</a>' +
                '</div>' +
                '</div>' +
                '<div class="my-info-slide-item">' +
                '<div class="my-info-slide-item-img">' +
                '<img src="images/pop-up-6.jpg" alt="" width="135" height="145">' +
                '</div>' +
                '<div class="my-info-slide-text">' +
                '<span class="my-info-slide-item-title">Property 3</span><br/>' +
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac lacus sit amet lorem bibendum tristique id nec nunc. Vestibulum tempor purus<br/>' +
                '<a href="#" class="my-info-slide-item-link">Learn more</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="my-info-window-slide clearfix">' +
                '<div class="my-info-slide-item">' +
                '<div class="my-info-slide-item-img">' +
                '<img src="images/pop-up-1.jpg" alt="" width="135" height="145">' +
                '</div>' +
                '<div class="my-info-slide-text">' +
                '<span class="my-info-slide-item-title">Property 1</span><br/>' +
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac lacus sit amet lorem bibendum tristique id nec nunc. Vestibulum tempor purus<br/>' +
                '<a href="#" class="my-info-slide-item-link">Learn more</a>' +
                '</div>' +
                '</div>' +
                '<div class="my-info-slide-item">' +
                '<div class="my-info-slide-item-img">' +
                '<img src="images/pop-up-2.jpg" alt="" width="135" height="170">' +
                '</div>' +
                '<div class="my-info-slide-text">' +
                '<span class="my-info-slide-item-title">Property 2</span><br/>' +
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac lacus sit amet lorem bibendum tristique id nec nunc. Vestibulum tempor purus euismod mauris suscipit, quis fringilla odio convallis. Proin a orci nisl.<br/>' +
                '<a href="#" class="my-info-slide-item-link">Learn more</a>' +
                '</div>' +
                '</div>' +
                '<div class="my-info-slide-item">' +
                '<div class="my-info-slide-item-img">' +
                '<img src="images/pop-up-3.jpg" alt="" width="135" height="145">' +
                '</div>' +
                '<div class="my-info-slide-text">' +
                '<span class="my-info-slide-item-title">Property 3</span><br/>' +
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac lacus sit amet lorem bibendum tristique id nec nunc. Vestibulum tempor purus<br/>' +
                '<a href="#" class="my-info-slide-item-link">Learn more</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="my-info-window-slide clearfix">' +
                '<div class="my-info-slide-item">' +
                '<div class="my-info-slide-item-img">' +
                '<img src="images/pop-up-4.jpg" alt="" width="135" height="145">' +
                '</div>' +
                '<div class="my-info-slide-text">' +
                '<span class="my-info-slide-item-title">Property 1</span><br/>' +
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac lacus sit amet lorem bibendum tristique id nec nunc. Vestibulum tempor purus<br/>' +
                '<a href="#" class="my-info-slide-item-link">Learn more</a>' +
                '</div>' +
                '</div>' +
                '<div class="my-info-slide-item">' +
                '<div class="my-info-slide-item-img">' +
                '<img src="images/pop-up-5.jpg" alt="" width="135" height="170">' +
                '</div>' +
                '<div class="my-info-slide-text">' +
                '<span class="my-info-slide-item-title">Property 2</span><br/>' +
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac lacus sit amet lorem bibendum tristique id nec nunc. Vestibulum tempor purus euismod mauris suscipit, quis fringilla odio convallis. Proin a orci nisl.<br/>' +
                '<a href="#" class="my-info-slide-item-link">Learn more</a>' +
                '</div>' +
                '</div>' +
                '<div class="my-info-slide-item">' +
                '<div class="my-info-slide-item-img">' +
                '<img src="images/pop-up-6.jpg" alt="" width="135" height="145">' +
                '</div>' +
                '<div class="my-info-slide-text">' +
                '<span class="my-info-slide-item-title">Property 3</span><br/>' +
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac lacus sit amet lorem bibendum tristique id nec nunc. Vestibulum tempor purus<br/>' +
                '<a href="#" class="my-info-slide-item-link">Learn more</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>'
            }
        };

        mapObjects[1] = {
            marker: {
                position: new google.maps.LatLng(50.4021368, 30.2525084),
                icon: 'images/home-icon.png',
                hoverIcon: 'images/counter-icon.png',
                category: {
                    price: ['all-price', 'cheap'],
                    country: ['all-country', 'ukraine']
                }
            },
            window: {
                content: '<div class="my-info-window">' +
                '<div class="my-info-window-header">' +
                'Window Name' +
                '</div>' +
                '<div class="my-info-window-slider">' +
                '<div class="my-info-window-slide clearfix">' +
                '<div class="my-info-slide-item">' +
                '<div class="my-info-slide-item-img">' +
                '<img src="images/pop-up-1.jpg" alt="" width="135" height="145">' +
                '</div>' +
                '<div class="my-info-slide-text">' +
                '<span class="my-info-slide-item-title">Property 1</span><br/>' +
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac lacus sit amet lorem bibendum tristique id nec nunc. Vestibulum tempor purus<br/>' +
                '<a href="#" class="my-info-slide-item-link">Learn more</a>' +
                '</div>' +
                '</div>' +
                '<div class="my-info-slide-item">' +
                '<div class="my-info-slide-item-img">' +
                '<img src="images/pop-up-2.jpg" alt="" width="135" height="170">' +
                '</div>' +
                '<div class="my-info-slide-text">' +
                '<span class="my-info-slide-item-title">Property 2</span><br/>' +
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac lacus sit amet lorem bibendum tristique id nec nunc. Vestibulum tempor purus euismod mauris suscipit, quis fringilla odio convallis. Proin a orci nisl.<br/>' +
                '<a href="#" class="my-info-slide-item-link">Learn more</a>' +
                '</div>' +
                '</div>' +
                '<div class="my-info-slide-item">' +
                '<div class="my-info-slide-item-img">' +
                '<img src="images/pop-up-3.jpg" alt="" width="135" height="145">' +
                '</div>' +
                '<div class="my-info-slide-text">' +
                '<span class="my-info-slide-item-title">Property 3</span><br/>' +
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac lacus sit amet lorem bibendum tristique id nec nunc. Vestibulum tempor purus<br/>' +
                '<a href="#" class="my-info-slide-item-link">Learn more</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="my-info-window-slide clearfix">' +
                '<div class="my-info-slide-item">' +
                '<div class="my-info-slide-item-img">' +
                '<img src="images/pop-up-4.jpg" alt="" width="135" height="145">' +
                '</div>' +
                '<div class="my-info-slide-text">' +
                '<span class="my-info-slide-item-title">Property 1</span><br/>' +
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac lacus sit amet lorem bibendum tristique id nec nunc. Vestibulum tempor purus<br/>' +
                '<a href="#" class="my-info-slide-item-link">Learn more</a>' +
                '</div>' +
                '</div>' +
                '<div class="my-info-slide-item">' +
                '<div class="my-info-slide-item-img">' +
                '<img src="images/pop-up-5.jpg" alt="" width="135" height="170">' +
                '</div>' +
                '<div class="my-info-slide-text">' +
                '<span class="my-info-slide-item-title">Property 2</span><br/>' +
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac lacus sit amet lorem bibendum tristique id nec nunc. Vestibulum tempor purus euismod mauris suscipit, quis fringilla odio convallis. Proin a orci nisl.<br/>' +
                '<a href="#" class="my-info-slide-item-link">Learn more</a>' +
                '</div>' +
                '</div>' +
                '<div class="my-info-slide-item">' +
                '<div class="my-info-slide-item-img">' +
                '<img src="images/pop-up-6.jpg" alt="" width="135" height="145">' +
                '</div>' +
                '<div class="my-info-slide-text">' +
                '<span class="my-info-slide-item-title">Property 3</span><br/>' +
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac lacus sit amet lorem bibendum tristique id nec nunc. Vestibulum tempor purus<br/>' +
                '<a href="#" class="my-info-slide-item-link">Learn more</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="my-info-window-slide clearfix">' +
                '<div class="my-info-slide-item">' +
                '<div class="my-info-slide-item-img">' +
                '<img src="images/pop-up-1.jpg" alt="" width="135" height="145">' +
                '</div>' +
                '<div class="my-info-slide-text">' +
                '<span class="my-info-slide-item-title">Property 1</span><br/>' +
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac lacus sit amet lorem bibendum tristique id nec nunc. Vestibulum tempor purus<br/>' +
                '<a href="#" class="my-info-slide-item-link">Learn more</a>' +
                '</div>' +
                '</div>' +
                '<div class="my-info-slide-item">' +
                '<div class="my-info-slide-item-img">' +
                '<img src="images/pop-up-2.jpg" alt="" width="135" height="170">' +
                '</div>' +
                '<div class="my-info-slide-text">' +
                '<span class="my-info-slide-item-title">Property 2</span><br/>' +
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac lacus sit amet lorem bibendum tristique id nec nunc. Vestibulum tempor purus euismod mauris suscipit, quis fringilla odio convallis. Proin a orci nisl.<br/>' +
                '<a href="#" class="my-info-slide-item-link">Learn more</a>' +
                '</div>' +
                '</div>' +
                '<div class="my-info-slide-item">' +
                '<div class="my-info-slide-item-img">' +
                '<img src="images/pop-up-3.jpg" alt="" width="135" height="145">' +
                '</div>' +
                '<div class="my-info-slide-text">' +
                '<span class="my-info-slide-item-title">Property 3</span><br/>' +
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac lacus sit amet lorem bibendum tristique id nec nunc. Vestibulum tempor purus<br/>' +
                '<a href="#" class="my-info-slide-item-link">Learn more</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="my-info-window-slide clearfix">' +
                '<div class="my-info-slide-item">' +
                '<div class="my-info-slide-item-img">' +
                '<img src="images/pop-up-4.jpg" alt="" width="135" height="145">' +
                '</div>' +
                '<div class="my-info-slide-text">' +
                '<span class="my-info-slide-item-title">Property 1</span><br/>' +
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac lacus sit amet lorem bibendum tristique id nec nunc. Vestibulum tempor purus<br/>' +
                '<a href="#" class="my-info-slide-item-link">Learn more</a>' +
                '</div>' +
                '</div>' +
                '<div class="my-info-slide-item">' +
                '<div class="my-info-slide-item-img">' +
                '<img src="images/pop-up-5.jpg" alt="" width="135" height="170">' +
                '</div>' +
                '<div class="my-info-slide-text">' +
                '<span class="my-info-slide-item-title">Property 2</span><br/>' +
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac lacus sit amet lorem bibendum tristique id nec nunc. Vestibulum tempor purus euismod mauris suscipit, quis fringilla odio convallis. Proin a orci nisl.<br/>' +
                '<a href="#" class="my-info-slide-item-link">Learn more</a>' +
                '</div>' +
                '</div>' +
                '<div class="my-info-slide-item">' +
                '<div class="my-info-slide-item-img">' +
                '<img src="images/pop-up-6.jpg" alt="" width="135" height="145">' +
                '</div>' +
                '<div class="my-info-slide-text">' +
                '<span class="my-info-slide-item-title">Property 3</span><br/>' +
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac lacus sit amet lorem bibendum tristique id nec nunc. Vestibulum tempor purus<br/>' +
                '<a href="#" class="my-info-slide-item-link">Learn more</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>'
            }
        };

        mapObjects[2] = {
            marker: {
                position: new google.maps.LatLng(55.7498598, 37.3523163),
                icon: 'images/home-icon.png',
                hoverIcon: 'images/counter-icon.png',
                category: {
                    price: ['all-price', 'expensive'],
                    country: ['all-country', 'russia']
                }
            },
            window: {
                content: '<div class="my-info-window">' +
                '<div class="my-info-window-header">' +
                'Window Name' +
                '</div>' +
                '<div class="my-info-window-slider">' +
                '<div class="my-info-window-slide clearfix">' +
                '<div class="my-info-slide-item">' +
                '<div class="my-info-slide-item-img">' +
                '<img src="images/pop-up-1.jpg" alt="" width="135" height="145">' +
                '</div>' +
                '<div class="my-info-slide-text">' +
                '<span class="my-info-slide-item-title">Property 1</span><br/>' +
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac lacus sit amet lorem bibendum tristique id nec nunc. Vestibulum tempor purus<br/>' +
                '<a href="#" class="my-info-slide-item-link">Learn more</a>' +
                '</div>' +
                '</div>' +
                '<div class="my-info-slide-item">' +
                '<div class="my-info-slide-item-img">' +
                '<img src="images/pop-up-2.jpg" alt="" width="135" height="170">' +
                '</div>' +
                '<div class="my-info-slide-text">' +
                '<span class="my-info-slide-item-title">Property 2</span><br/>' +
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac lacus sit amet lorem bibendum tristique id nec nunc. Vestibulum tempor purus euismod mauris suscipit, quis fringilla odio convallis. Proin a orci nisl.<br/>' +
                '<a href="#" class="my-info-slide-item-link">Learn more</a>' +
                '</div>' +
                '</div>' +
                '<div class="my-info-slide-item">' +
                '<div class="my-info-slide-item-img">' +
                '<img src="images/pop-up-3.jpg" alt="" width="135" height="145">' +
                '</div>' +
                '<div class="my-info-slide-text">' +
                '<span class="my-info-slide-item-title">Property 3</span><br/>' +
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac lacus sit amet lorem bibendum tristique id nec nunc. Vestibulum tempor purus<br/>' +
                '<a href="#" class="my-info-slide-item-link">Learn more</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="my-info-window-slide clearfix">' +
                '<div class="my-info-slide-item">' +
                '<div class="my-info-slide-item-img">' +
                '<img src="images/pop-up-4.jpg" alt="" width="135" height="145">' +
                '</div>' +
                '<div class="my-info-slide-text">' +
                '<span class="my-info-slide-item-title">Property 1</span><br/>' +
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac lacus sit amet lorem bibendum tristique id nec nunc. Vestibulum tempor purus<br/>' +
                '<a href="#" class="my-info-slide-item-link">Learn more</a>' +
                '</div>' +
                '</div>' +
                '<div class="my-info-slide-item">' +
                '<div class="my-info-slide-item-img">' +
                '<img src="images/pop-up-5.jpg" alt="" width="135" height="170">' +
                '</div>' +
                '<div class="my-info-slide-text">' +
                '<span class="my-info-slide-item-title">Property 2</span><br/>' +
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac lacus sit amet lorem bibendum tristique id nec nunc. Vestibulum tempor purus euismod mauris suscipit, quis fringilla odio convallis. Proin a orci nisl.<br/>' +
                '<a href="#" class="my-info-slide-item-link">Learn more</a>' +
                '</div>' +
                '</div>' +
                '<div class="my-info-slide-item">' +
                '<div class="my-info-slide-item-img">' +
                '<img src="images/pop-up-6.jpg" alt="" width="135" height="145">' +
                '</div>' +
                '<div class="my-info-slide-text">' +
                '<span class="my-info-slide-item-title">Property 3</span><br/>' +
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac lacus sit amet lorem bibendum tristique id nec nunc. Vestibulum tempor purus<br/>' +
                '<a href="#" class="my-info-slide-item-link">Learn more</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="my-info-window-slide clearfix">' +
                '<div class="my-info-slide-item">' +
                '<div class="my-info-slide-item-img">' +
                '<img src="images/pop-up-1.jpg" alt="" width="135" height="145">' +
                '</div>' +
                '<div class="my-info-slide-text">' +
                '<span class="my-info-slide-item-title">Property 1</span><br/>' +
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac lacus sit amet lorem bibendum tristique id nec nunc. Vestibulum tempor purus<br/>' +
                '<a href="#" class="my-info-slide-item-link">Learn more</a>' +
                '</div>' +
                '</div>' +
                '<div class="my-info-slide-item">' +
                '<div class="my-info-slide-item-img">' +
                '<img src="images/pop-up-2.jpg" alt="" width="135" height="170">' +
                '</div>' +
                '<div class="my-info-slide-text">' +
                '<span class="my-info-slide-item-title">Property 2</span><br/>' +
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac lacus sit amet lorem bibendum tristique id nec nunc. Vestibulum tempor purus euismod mauris suscipit, quis fringilla odio convallis. Proin a orci nisl.<br/>' +
                '<a href="#" class="my-info-slide-item-link">Learn more</a>' +
                '</div>' +
                '</div>' +
                '<div class="my-info-slide-item">' +
                '<div class="my-info-slide-item-img">' +
                '<img src="images/pop-up-3.jpg" alt="" width="135" height="145">' +
                '</div>' +
                '<div class="my-info-slide-text">' +
                '<span class="my-info-slide-item-title">Property 3</span><br/>' +
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac lacus sit amet lorem bibendum tristique id nec nunc. Vestibulum tempor purus<br/>' +
                '<a href="#" class="my-info-slide-item-link">Learn more</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="my-info-window-slide clearfix">' +
                '<div class="my-info-slide-item">' +
                '<div class="my-info-slide-item-img">' +
                '<img src="images/pop-up-4.jpg" alt="" width="135" height="145">' +
                '</div>' +
                '<div class="my-info-slide-text">' +
                '<span class="my-info-slide-item-title">Property 1</span><br/>' +
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac lacus sit amet lorem bibendum tristique id nec nunc. Vestibulum tempor purus<br/>' +
                '<a href="#" class="my-info-slide-item-link">Learn more</a>' +
                '</div>' +
                '</div>' +
                '<div class="my-info-slide-item">' +
                '<div class="my-info-slide-item-img">' +
                '<img src="images/pop-up-5.jpg" alt="" width="135" height="170">' +
                '</div>' +
                '<div class="my-info-slide-text">' +
                '<span class="my-info-slide-item-title">Property 2</span><br/>' +
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac lacus sit amet lorem bibendum tristique id nec nunc. Vestibulum tempor purus euismod mauris suscipit, quis fringilla odio convallis. Proin a orci nisl.<br/>' +
                '<a href="#" class="my-info-slide-item-link">Learn more</a>' +
                '</div>' +
                '</div>' +
                '<div class="my-info-slide-item">' +
                '<div class="my-info-slide-item-img">' +
                '<img src="images/pop-up-6.jpg" alt="" width="135" height="145">' +
                '</div>' +
                '<div class="my-info-slide-text">' +
                '<span class="my-info-slide-item-title">Property 3</span><br/>' +
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac lacus sit amet lorem bibendum tristique id nec nunc. Vestibulum tempor purus<br/>' +
                '<a href="#" class="my-info-slide-item-link">Learn more</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>'
            }
        };
        var map = Map(mapOptions, mapObjects);
        map.init();
    }

    function filterMarkers () {
        for (var i = 0; i < mapObjects.length; i++ ) {
            var marker = mapObjects[i].marker,
                flag = true;


            for(var propertyName in mapFilters) {
                if (flag) {
                    if ( marker.category[propertyName].indexOf( mapFilters[propertyName] ) == -1) {
                        flag = false;
                    }
                }    
            }
            if (flag) {
                marker.markerObject.setVisible(true);
            }
            else {
                marker.markerObject.setVisible(false);
            }
         }
    }


 function MapDropdown(container) {
    var selectedOption = container.find('.selected-option'),
        options = container.find('.map-dropdown-list');

    var init = function() {
        var chekedInput = container.find('input[type=radio]:checked');
        if( chekedInput.length ){
            setSelectedOption( options.find('label').index( chekedInput.parent() ) );
        }
        else {
            container.find('input[type=radio]:first').prop('checked', true);
            setSelectedOption(0);
        }

        var val = chekedInput.val(),
            category = chekedInput.attr('name');
        if ( mapFilters[category] != val ) {
            mapFilters[category] = val;
        }

        filterMarkers();

        selectedOption.click( function () {
            if ( options.is('.opened') ) {
                closeOptions();
            }
            else {
                openOptions();
            }
        } );

        options.on('click', 'input', optionsClickHndlr );
    };

    function optionsClickHndlr(e) {
        var label = $(e.target).parent(),
        index = options.find('label').index(label);

        setSelectedOption(index);

        var val = $(this).val(),
            category = $(this).attr('name');
        if ( mapFilters[category] != val ) {
            mapFilters[category] = val;
        }

        filterMarkers();
        closeOptions();
    }

    function openOptions() {
        options.addClass('opened');
    }

    function closeOptions() {
        options.removeClass('opened');
    }

    function setSelectedOption(index) {
        selectedOption.text( options.find('label').eq(index).text() );
    }

    return {
        init: init
    };
}
    var mapDropdowns = [];
    $('.map-dropdown').each( function() {
        mapDropdowns.push( MapDropdown( $(this) ) );
    } );

    for (var i = 0; i < mapDropdowns.length; i++) {
        mapDropdowns[i].init();
    }
});
