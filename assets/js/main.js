/**
 * Template Name: Ninestars
 * Updated: Mar 10 2023 with Bootstrap v5.2.3
 * Template URL: https://bootstrapmade.com/ninestars-free-bootstrap-3-theme-for-creative/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function () {
	'use strict';

	/**
	 * Easy selector helper function
	 */
	const select = (el, all = false) => {
		el = el.trim();
		if (all) {
			return [...document.querySelectorAll(el)];
		} else {
			return document.querySelector(el);
		}
	};

	/**
	 * Easy event listener function
	 */
	const on = (type, el, listener, all = false) => {
		let selectEl = select(el, all);
		if (selectEl) {
			if (all) {
				selectEl.forEach((e) => e.addEventListener(type, listener));
			} else {
				selectEl.addEventListener(type, listener);
			}
		}
	};

	/**
	 * Easy on scroll event listener
	 */
	const onscroll = (el, listener) => {
		el.addEventListener('scroll', listener);
	};

	/**
	 * Navbar links active state on scroll
	 */
	let navbarlinks = select('#navbar .scrollto', true);
	const navbarlinksActive = () => {
		let position = window.scrollY + 200;
		navbarlinks.forEach((navbarlink) => {
			if (!navbarlink.hash) return;
			let section = select(navbarlink.hash);
			if (!section) return;
			if (
				position >= section.offsetTop &&
				position <= section.offsetTop + section.offsetHeight
			) {
				navbarlink.classList.add('active');
			} else {
				navbarlink.classList.remove('active');
			}
		});
	};
	window.addEventListener('load', navbarlinksActive);
	onscroll(document, navbarlinksActive);

	/**
	 * Scrolls to an element with header offset
	 */
	const scrollto = (el) => {
		let header = select('#header');
		let offset = header.offsetHeight;

		let elementPos = select(el).offsetTop;
		window.scrollTo({
			top: elementPos - offset,
			behavior: 'smooth',
		});
	};

	/**
	 * Back to top button
	 */
	let backtotop = select('.back-to-top');
	if (backtotop) {
		const toggleBacktotop = () => {
			if (window.scrollY > 100) {
				backtotop.classList.add('active');
			} else {
				backtotop.classList.remove('active');
			}
		};
		window.addEventListener('load', toggleBacktotop);
		onscroll(document, toggleBacktotop);
	}

	/**
	 * Mobile nav toggle
	 */
	on('click', '.mobile-nav-toggle', function (e) {
		select('#navbar').classList.toggle('navbar-mobile');
		this.classList.toggle('bi-list');
		this.classList.toggle('bi-x');
	});

	/**
	 * Mobile nav dropdowns activate
	 */
	on(
		'click',
		'.navbar .dropdown > a',
		function (e) {
			if (select('#navbar').classList.contains('navbar-mobile')) {
				e.preventDefault();
				this.nextElementSibling.classList.toggle('dropdown-active');
			}
		},
		true,
	);

	/**
	 * Scrool with ofset on links with a class name .scrollto
	 */
	on(
		'click',
		'.scrollto',
		function (e) {
			if (select(this.hash)) {
				e.preventDefault();

				let navbar = select('#navbar');
				if (navbar.classList.contains('navbar-mobile')) {
					navbar.classList.remove('navbar-mobile');
					let navbarToggle = select('.mobile-nav-toggle');
					navbarToggle.classList.toggle('bi-list');
					navbarToggle.classList.toggle('bi-x');
				}
				scrollto(this.hash);
			}
		},
		true,
	);

	/**
	 * Scroll with ofset on page load with hash links in the url
	 */
	window.addEventListener('load', () => {
		if (window.location.hash) {
			if (select(window.location.hash)) {
				scrollto(window.location.hash);
			}
		}
	});

	/**
	 * Porfolio isotope and filter
	 */
	window.addEventListener('load', () => {
		let portfolioContainer = select('.portfolio-container');
		if (portfolioContainer) {
			let portfolioIsotope = new Isotope(portfolioContainer, {
				itemSelector: '.portfolio-item',
				layoutMode: 'fitRows',
			});

			let portfolioFilters = select('#portfolio-flters li', true);

			on(
				'click',
				'#portfolio-flters li',
				function (e) {
					e.preventDefault();
					portfolioFilters.forEach(function (el) {
						el.classList.remove('filter-active');
					});
					this.classList.add('filter-active');

					portfolioIsotope.arrange({
						filter: this.getAttribute('data-filter'),
					});
					portfolioIsotope.on('arrangeComplete', function () {
						AOS.refresh();
					});
				},
				true,
			);
		}
	});

	/**
	 * Initiate portfolio lightbox
	 */
	const portfolioLightbox = GLightbox({
		selector: '.portfolio-lightbox',
	});

	/**
	 * Portfolio details slider
	 */
	new Swiper('.portfolio-details-slider', {
		speed: 400,
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
	});

	/**
	 * Clients Slider
	 */
	new Swiper('.clients-slider', {
		speed: 400,
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		slidesPerView: 'auto',
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
		breakpoints: {
			320: {
				slidesPerView: 2,
				spaceBetween: 40,
			},
			480: {
				slidesPerView: 3,
				spaceBetween: 60,
			},
			640: {
				slidesPerView: 4,
				spaceBetween: 80,
			},
			992: {
				slidesPerView: 6,
				spaceBetween: 120,
			},
		},
	});

	/**
	 * Animation on scroll
	 */
	window.addEventListener('load', () => {
		AOS.init({
			duration: 1000,
			easing: 'ease-in-out',
			once: true,
			mirror: false,
		});
	});
})();

var elBody = document.querySelector('body');
var elDarkBtn = document.querySelector('.dark__mode');
var elLightBtn = document.querySelector('.light__mode');

// elDarkBtn.addEventListener('click', function () {
// 	theme = true;
// 	elBody.classList.add('dark');
// 	elDarkBtn.classList.add('mode__active');
// 	elLightBtn.classList.remove('mode__active');
// 	console.log(theme);
//   document.body.style.backgroundColor = "#333";

// 	let bg = 'dark';

// 	window.localStorage.setItem('theme', bg);
// });

// elLightBtn.addEventListener('click', function () {
// 	theme = !theme;
// 	elBody.classList.remove('dark');
// 	elDarkBtn.classList.remove('mode__active');
// 	elLightBtn.classList.add('mode__active');

// 	console.log(theme);
// });

let theme = true;

elDarkBtn.addEventListener('click', () => {
	theme = true;

	let bg = 'dark';

	window.localStorage.setItem('theme', bg);
	darkFunc();
});

elLightBtn.addEventListener('click', () => {
	theme = false;

	let bg = 'light';
	window.localStorage.setItem('theme', bg);

	LightFunc();
});

let darkFunc = () => {
	console.log(window.localStorage.getItem(theme));
	if (window.localStorage.getItem('theme') === 'dark') {
		elBody.classList.add('dark');
		elDarkBtn.classList.add('mode__active');
		elLightBtn.classList.remove('mode__active');
		console.log(theme);
		document.body.style.backgroundColor = '#333';
	}
};

let LightFunc = () => {
	if (window.localStorage.getItem('theme') === 'light') {
		elBody.classList.remove('dark');
		elDarkBtn.classList.remove('mode__active');
		elLightBtn.classList.add('mode__active');
    document.body.style.backgroundColor = '#fff';
	}
};

darkFunc();
