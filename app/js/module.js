// const humbButton = document.querySelector(".humburger-menu-btn");
// const template = document.querySelector("#overlay-menu").innerHTML;
// const section = document.querySelector(".start");

// const overlayMenu = createMenu(template);

// // humbButton.addEventListener('click', function() {
// // 	overlayMenu.open();
// // 	this.classList.toggle('humburger-menu-btn_clicked');
// // });

// function createMenu(templateIn) {
// 	let tempBlock = document.createElement('div');

// 	tempBlock.innerHTML = templateIn;

// 	let closeElem = tempBlock.querySelector(".humburger-menu-btn");
// 	let menuElem = tempBlock.querySelector(".overlay-menu");

// 	tempBlock = null;

// 	menuElem.addEventListener('click', function(e) {
// 		let target = e.target;
// 		if (target.className === 'nav-menu__link') {
// 			closeElem.click();
// 		}
// 		if (target === menuElem) {
// 			closeElem.classList.toggle('humburger-menu-btn_clicked');
// 		}
// 	})

// 	closeElem.addEventListener('click', function() {
// 		section.removeChild(menuElem);
// 		humbButton.classList.toggle('humburger-menu-btn_clicked');
// 	})

// 	return {
// 		open() {
// 			section.appendChild(menuElem);
// 		}
// 	} 
// }
// ============================================

let overlay = (function(options) {
	let button = document.querySelector(options.button);
	let overlay = document.querySelector(options.overlay);
	let menuItems = overlay.querySelectorAll(".nav-menu__item");

	let counter = 0;

	let _menuAnimation = function() {
		menuItems[counter].classList.toggle("nav-menu__item_overlay");
		counter++;
		if (counter < menuItems.length) {
			setTimeout(_menuAnimation, 100);
		} else {
			counter = 0;
		}
		// (counter < menuItems.length) ? setTimeout(_menuAnimation, 100) : counter = 0;
	}

	let _toggleOverlay = function() {
		document.querySelector("body").classList.toggle("blocked");
		button.classList.toggle("humburger-menu-btn_clicked");
		overlay.classList.toggle("header_overlay");
		_menuAnimation();
	}

	let addListeners = function() {
		button.addEventListener('click', _toggleOverlay);
		overlay.addEventListener('click', function(e) {
			if (e.target.className === 'nav-menu__link' && 
				button.classList.contains("humburger-menu-btn_clicked")) {
				_toggleOverlay();
			}
		});
	}

	return {
		init: addListeners
	};
})({
	button: ".humburger-menu-btn",
	overlay: ".header"
})

overlay.init();

// ==============================

let accordeon = (function(options) {
	let accordBlock = document.querySelector(options.block);
	let isClicked = false;
	let isAnimOver = true;

	let _toggleAccordeon = function(elem) {
		if (isClicked) {
			let activeItem = accordBlock.querySelector("." + options.item);
			activeItem.classList.remove(options.item);
			activeItem.querySelector("." + options.content).style.height = 0;
		}
		elem.classList.toggle(options.item);
		let elemContent = elem.querySelector("." + options.content);
		elemContent.style.height = elemContent.scrollHeight + "px";
		isClicked = true;
	}

	let addListener = function() {
		accordBlock.addEventListener('click', function(e) {
			let itemClicked = e.target.parentElement;
			let isTrigger = (e.target.className === options.trigger);
			if (isTrigger && isAnimOver
				&& itemClicked.classList.contains(options.item)) {
					itemClicked.classList.remove(options.item);
					itemClicked.querySelector("." + options.content).style.height = 0;
					isClicked = false;
					isAnimOver = false;
					setTimeout(function() {isAnimOver = true;}, 600);
			} else if (isTrigger && isAnimOver) {
				_toggleAccordeon(itemClicked);
				isAnimOver = false;
				setTimeout(function() {isAnimOver = true;}, 600);
			}
		})
	}

	return {
		init: addListener
	};
})({
	block: ".accordeon",
	trigger: "accordeon__item-title",
	item: "accordeon__item_active",
	content: "accordeon__content"
})

accordeon.init();

// ======================================

let accordeonHor = (function(options) {
	let accordBlock = document.querySelector(options.block);
	let triggerWidth;
	let isClicked = false;
	let isPhone = window.innerWidth <= 480;
	if (isPhone) {
		accordBlock.style.left = accordBlock.getBoundingClientRect().left + 'px';
	}

	let _widthContent = function() {
		let itemQuantity = 3;
		if (isPhone) {itemQuantity = 1;}
		let computedWidth = window.innerWidth - itemQuantity * triggerWidth;

		return computedWidth > 540 ? 540 : computedWidth;
	}

	let _toggleAccordeon = function(elem) {
		let initialLeft = window.innerWidth - 3 * triggerWidth + 'px';
		if (isClicked) {
			let isOpenedItemClicked = elem.classList.contains(options.item);
			let activeItem = accordBlock.querySelector("." + options.item);
			activeItem.classList.toggle(options.item);
			activeItem.querySelector('.' + options.content).style.width = 0;
			isClicked = false;
			if (isOpenedItemClicked) {
				if (isPhone) {
					accordBlock.style.left = initialLeft;}
				return;
			}
		}
		elem.classList.toggle(options.item);
		let elemContent = elem.querySelector('.' + options.content);
		elemContent.style.width = _widthContent() + 'px';
		if (isPhone) {
			accordBlock.style.left = [].indexOf.call(accordBlock.children, elem) * 
			-(triggerWidth) + 'px';
		}
		isClicked = true;
	}

	let addListeners = function() {
		accordBlock.addEventListener('click', function(e) {
			let target = e.target.closest('.' + options.trigger);
			isPhone = window.innerWidth <= 480;
			triggerWidth = parseInt(getComputedStyle(accordBlock
				.querySelector('.' + options.trigger)).width);
			if (target) {
				_toggleAccordeon(target.parentElement);}
		})

		let crosses = accordBlock.querySelectorAll('.accordeon-hor__btn-close');
		for (let i = 0; i < crosses.length; i++) {
			crosses[i].addEventListener('click', function(e) {
			_toggleAccordeon(crosses[i].closest('.' + options.item))
		})
		}
		
	}

	return {init: addListeners};
})({
	block: ".accordeon-hor",
	trigger: "accordeon-hor__title",
	item: "accordeon-hor__item_active",
	content: "accordeon-hor__container"
})

accordeonHor.init();

// =====================================================

const moreButtons = document.querySelectorAll(".review__more-btn");
const templateRev = document.querySelector("#overlay-review").innerHTML;
const sectionRev = document.querySelector(".review");

const overlayReview = createReview(templateRev);

for (var i = 0; i < moreButtons.length; i++) {
	moreButtons[i].addEventListener('click', function(e) {
		let target = e.target.closest(".review__more-btn");
		if (target) {
			document.querySelector("body").classList.toggle("blocked");
			overlayReview.open(target.parentElement);
		}
	})
}

function createReview(templateIn) {
	let tempBlock = document.createElement('div');

	tempBlock.innerHTML = templateIn;

	let closeElem = tempBlock.querySelector(".overlay-review__btn-close");
	let overlayElem = tempBlock.querySelector(".overlay-review");
	let authorElem = tempBlock.querySelector(".overlay-review__title");
	let textElem = tempBlock.querySelector(".overlay-review__text");

	tempBlock = null;

	overlayElem.addEventListener('click', function(e) {
		if (e.target === overlayElem) {
			closeElem.click();
		}
	})

	closeElem.addEventListener('click', function() {
		document.querySelector("body").classList.toggle("blocked");
		sectionRev.removeChild(overlayElem);
	})

	return {
		open(item) {
			sectionRev.appendChild(overlayElem);
			authorElem.innerHTML = item.querySelector(".review__author").innerHTML;
			textElem.innerHTML = item.querySelector(".review__text").innerHTML;
		}
	}
}

// ==============================================

const owlBurger = $('.owl-carousel');

$(document).ready(function(){
	owlBurger.owlCarousel({
		loop: true,
		items: 1
	});
});

$('.burgers__prev').click(function() {
    owlBurger.trigger('prev.owl.carousel');
})

$('.burgers__next').click(function() {
    owlBurger.trigger('next.owl.carousel');
})

// =============================================

$(".main").onepage_scroll({
   sectionContainer: "section",     // sectionContainer accepts any kind of selector in case you don't want to use section
   easing: "ease",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
                                    // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
   animationTime: 1000,             // AnimationTime let you define how long each section takes to animate
   pagination: false,                // You can either show or hide the pagination. Toggle true for show, false for hide.
   updateURL: false,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
   beforeMove: function(index) {},  // This option accepts a callback function. The function will be called before the page moves.
   afterMove: function(index) {},   // This option accepts a callback function. The function will be called after the page moves.
   loop: false,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
   keyboard: true,                  // You can activate the keyboard controls
   responsiveFallback: false,        // You can fallback to normal page scroll by defining the width of the browser in which
                                    // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
                                    // the browser's width is less than 600, the fallback will kick in.
   direction: "vertical"            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".  
});