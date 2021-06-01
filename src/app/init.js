import fullpage from 'fullpage.js';
import keenSlider from 'keen-slider';

import initView from './renderer.js';
import addListeners from './controllers.js';

export default () => {
  const state = {
    ui: {
      activeSection: null,
      overlayMenu: {
        isOpened: false,
        status: 'idle',
      },
    },
  };

  const elements = {
    header: document.querySelector('.header'),
    menuBtn: document.querySelector('.toggler'),
    menuItems: [...document.querySelectorAll('.main-nav__item')],
    menuLinks: [...document.querySelectorAll('.main-nav__link')],
    sliderPrev: document.querySelector('.burgers__prev'),
    sliderNext: document.querySelector('.burgers__next'),
  };

  const watchedState = initView(state, elements);

  fullpage('#fullpage', {
    licenseKey: null,
    navigation: true,
    anchors: ['start', 'about', 'burgers', 'team', 'menu', 'reviews', 'order', 'map'],
    verticalCentered: false,

    onLeave(_origin, destination) {
      watchedState.ui.activeSection = destination.anchor;
    },
    afterRender() {
      elements.sideNav = document.querySelector('#fp-nav ul');
      watchedState.ui.activeSection = 'start';
    },
  });

  keenSlider('.slider__list', {
    loop: true,
    created(slider) {
      elements.sliderPrev.addEventListener('click', () => slider.prev());
      elements.sliderNext.addEventListener('click', () => slider.next());
    },
  });

  addListeners(elements, watchedState);
};
