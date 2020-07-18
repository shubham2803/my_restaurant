AOS.init({
	duration: 800,
	easing: 'slide'
});

(function ($) {

	"use strict";

	$(window).stellar({
		responsive: true,
		parallaxBackgrounds: true,
		parallaxElements: true,
		horizontalScrolling: false,
		hideDistantElements: false,
		scrollProperty: 'scroll'
	});


	// loader
	var loader = function () {
		setTimeout(function () {
			if ($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	var carousel = function () {
		$('.home-slider').owlCarousel({
			loop: true,
			autoplay: true,
			margin: 0,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			nav: true,
			dots: false,
			autoplayHoverPause: false,
			items: 1,
			navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
			responsive: {
				0: {
					items: 1,
					nav: false,
					dots: true
				},
				600: {
					items: 1,
					nav: false,
					dots: true
				},
				1000: {
					items: 1,
					nav: true
				}
			}
		});

		$('.carousel').owlCarousel({
			center: true,
			loop: true,
			items: 1,
			margin: 30,
			stagePadding: 0,
			nav: true,
			navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 2
				},
				1000: {
					items: 3
				}
			}
		});

		$('.carousel1').owlCarousel({
			loop: false,
			items: 1,
			margin: 30,
			stagePadding: 10,
			nav: true,
			navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 2
				},
				1000: {
					items: 3
				}
			}
		});

		$('.carousel-engine').owlCarousel({
			loop: false,
			items: 1,
			margin: 30,
			stagePadding: 0,
			nav: false,
			navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 2
				},
				1000: {
					items: 4
				}
			}
		});
	};
	carousel();

	// scroll
	var scrollWindow = function () {
		$(window).scroll(function () {
			var $w = $(this),
				st = $w.scrollTop(),
				navbar = $('.ftco_navbar'),
				sd = $('.js-scroll-wrap');

			if (st > 150) {
				if (!navbar.hasClass('scrolled')) {
					navbar.addClass('scrolled');
				}
			}
			if (st < 150) {
				if (navbar.hasClass('scrolled')) {
					navbar.removeClass('scrolled sleep');
				}
			}
			if (st > 350) {
				if (!navbar.hasClass('awake')) {
					navbar.addClass('awake');
				}

				if (sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if (st < 350) {
				if (navbar.hasClass('awake')) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if (sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();

	var isMobile = {
		Android: function () {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function () {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function () {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function () {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function () {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function () {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	var mobileMenuOutsideClick = function () {

		$(document).click(function (e) {
			var container = $("#colorlib-offcanvas, .js-colorlib-nav-toggle");
			if (!container.is(e.target) && container.has(e.target).length === 0) {

				if ($('body').hasClass('offcanvas')) {

					$('body').removeClass('offcanvas');
					$('.js-colorlib-nav-toggle').removeClass('active');

				}


			}
		});

	};
	mobileMenuOutsideClick();


	var offcanvasMenu = function () {

		$('#page').prepend('<div id="colorlib-offcanvas" />');
		$('#page').prepend('<a href="#" class="js-colorlib-nav-toggle colorlib-nav-toggle colorlib-nav-white"><i></i></a>');
		var clone1 = $('.menu-1 > ul').clone();
		$('#colorlib-offcanvas').append(clone1);
		var clone2 = $('.menu-2 > ul').clone();
		$('#colorlib-offcanvas').append(clone2);

		$('#colorlib-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
		$('#colorlib-offcanvas')
			.find('li')
			.removeClass('has-dropdown');

		// Hover dropdown menu on mobile
		$('.offcanvas-has-dropdown').mouseenter(function () {
			var $this = $(this);

			$this
				.addClass('active')
				.find('ul')
				.slideDown(500, 'easeOutExpo');
		}).mouseleave(function () {

			var $this = $(this);
			$this
				.removeClass('active')
				.find('ul')
				.slideUp(500, 'easeOutExpo');
		});


		$(window).resize(function () {

			if ($('body').hasClass('offcanvas')) {

				$('body').removeClass('offcanvas');
				$('.js-colorlib-nav-toggle').removeClass('active');

			}
		});
	};
	offcanvasMenu();


	var burgerMenu = function () {

		$('body').on('click', '.js-colorlib-nav-toggle', function (event) {
			var $this = $(this);


			if ($('body').hasClass('overflow offcanvas')) {
				$('body').removeClass('overflow offcanvas');
			} else {
				$('body').addClass('overflow offcanvas');
			}
			$this.toggleClass('active');
			event.preventDefault();

		});
	};
	burgerMenu();

	var counter = function () {

		$('#section-counter').waypoint(function (direction) {

			if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number').each(function () {
					var $this = $(this),
						num = $this.data('number');
					console.log(num);
					$this.animateNumber(
						{
							number: num,
							numberStep: comma_separator_number_step
						}, 7000
					);
				});

			}

		}, { offset: '95%' });

	}
	counter();

	var contentWayPoint = function () {
		var i = 0;
		$('.ftco-animate').waypoint(function (direction) {

			if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {

				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function () {

					$('body .ftco-animate.item-animate').each(function (k) {
						var el = $(this);
						setTimeout(function () {
							var effect = el.data('animate-effect');
							if (effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if (effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if (effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						}, k * 50, 'easeInOutExpo');
					});

				}, 100);

			}

		}, { offset: '95%' });
	};
	contentWayPoint();


	// navigation
	var OnePageNav = function () {
		$(".smoothscroll[href^='#'], #ftco-nav ul li a[href^='#']").on('click', function (e) {
			e.preventDefault();

			var hash = this.hash,
				navToggler = $('.navbar-toggler');
			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 700, 'easeInOutExpo', function () {
				window.location.hash = hash;
			});


			if (navToggler.is(':visible')) {
				navToggler.click();
			}
		});
		$('body').on('activate.bs.scrollspy', function () {
			console.log('nice');
		})
	};
	OnePageNav();


	// magnific popup
	$('.image-popup').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		fixedContentPos: true,
		mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			verticalFit: true
		},
		zoom: {
			enabled: true,
			duration: 300 // don't foget to change the duration also in CSS
		}
	});

	$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,

		fixedContentPos: false
	});


	$('#book_date').datepicker({
		'format': 'm/d/yyyy',
		'autoclose': true
	});
	$('#book_time').timepicker();



})(jQuery);



/* MENU LIST DISPLAY */

const addQuantity1 = document.querySelectorAll('.add-quantity-1');
const addQuantity2 = document.querySelectorAll('.add-quantity-2');


/* const leftSidebar = document.getElementById('left-sidebar');
leftSidebar.textContent = "sidebar";
 */

const menu = document.querySelector('#menu-list-container');
const rightSidebar = document.querySelector('#right-sidebar');

const orderItem = document.querySelector('.order-item');
const showQuantity = document.querySelectorAll('.show-quantity');

const dishName = document.querySelector('.dish-name');
const dishCost = document.querySelector('.dish-cost');

// checkOut.style.display = 'inline';

let addToCart = document.querySelectorAll('.add-to-cart');
const page = document.querySelector('html');

let orderedDishes, orderTotal, totalText, totalCost;
let newDish, newDishName, newDishCost, checkOut;

window.onload = function (response) {
	$.ajax({
		type: "GET",
		url: "../order/add-item/" + 0,
		dataType: 'json',
		success: function(data) { 
			callajax(data);
			} 
	});
}


for (let i = 0; i < addToCart.length; i++) {
	addToCart[i].onclick = function (response) {
		$.ajax({
			type: "GET",
			url: "../order/add-item/" + addToCart[i].value,
			dataType: 'json',
			success: function(data) {
				callajax(data); 
			}
		});
	}
}


function callajax (data) {
	
	for (let k=0; k < addQuantity1.length; k ++) {
		addQuantity1[k].style.display = 'inline';
		addQuantity2[k].style.display = 'none';
	};

	orderedDishes = data;
	rightSidebar.style.display = 'flex';
	rightSidebar.textContent = '';

	if (orderedDishes.length > 1){
		checkOut = document.createElement('button');
		checkOut.setAttribute('id', 'check-out');
		checkOut.setAttribute('value', 'checkout');
		
		let checkOutLink = document.createElement('a');
		checkOutLink.setAttribute('id', "check-out-link");
		checkOutLink.setAttribute('href', "#");
		checkOutLink.textContent = "CHECKOUT";
		checkOut.appendChild(checkOutLink);
		checkOutLink.href = "../checkout/";

		rightSidebar.appendChild(checkOut);
	};

	for (j = 0; j < orderedDishes.length-1; j++) {


		newDish = document.createElement('div');
		newDish.setAttribute("class", "order-item");

		newDishName = document.createElement('div');
		newDishName.setAttribute("class", "dish-name");
		newDishName.textContent = orderedDishes[j].quantity + ' x ' + orderedDishes[j].dishName;

		newDishCost = document.createElement('div');
		newDishCost.setAttribute("class", "dish-cost");
		newDishCost.textContent = orderedDishes[j].dishTotal;


		newDish.appendChild(newDishName);
		newDish.appendChild(newDishCost);
		rightSidebar.appendChild(newDish);
		if (j % 2 == 0) {
			newDish.style.background = 'tomato';
		}

		document.getElementById(`dish-0-${orderedDishes[j].dishId}`).style.display = 'none';
		document.getElementById(`show-quantity-${orderedDishes[j].dishId}`).textContent = orderedDishes[j].quantity ;
		document.getElementById(`dish-1-${orderedDishes[j].dishId}`).style.display = 'inline';
		
	}

	if 	(orderedDishes[ orderedDishes.length - 1 ] !=0 ) {
		orderTotal = document.createElement('div');
		orderTotal.setAttribute('id', 'order-total');
		
		totalText = document.createElement('div');
		totalText.setAttribute('class', 'total-text');
		totalText.textContent = "TOTAL"
		
		totalCost = document.createElement('div');
		totalCost.setAttribute('class', 'total-cost');
		totalCost.textContent  = orderedDishes[ orderedDishes.length - 1 ].orderTotal;
		
		orderTotal.appendChild(totalText);
		orderTotal.appendChild(totalCost);

		rightSidebar.appendChild(orderTotal);
	}
}