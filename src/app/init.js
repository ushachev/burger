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
      accordeon: {
        activeItemIndex: null,
        status: 'idle',
      },
      horizontalAccordeon: {
        activeItemIndex: null,
        status: 'idle',
      },
    },
  };

  const elements = {
    header: document.querySelector('.header'),
    nav: {
      toggler: document.querySelector('.toggler'),
      items: [...document.querySelectorAll('.main-nav__item')],
      links: [...document.querySelectorAll('.main-nav__link')],
    },
    slider: {
      prev: document.querySelector('.burgers__prev'),
      next: document.querySelector('.burgers__next'),
    },
    accordeon: {
      items: [...document.querySelectorAll('.accordeon__item')],
      togglers: [...document.querySelectorAll('.accordeon__item-title')],
      itemContents: [...document.querySelectorAll('.accordeon__content')],
    },
    horizontalAccordeon: {
      block: document.querySelector('.accordeon-hor'),
      items: [...document.querySelectorAll('.accordeon-hor__item')],
      togglers: [...document.querySelectorAll('.accordeon-hor__title')],
      itemContents: [...document.querySelectorAll('.accordeon-hor__container')],
      closeBtns: [...document.querySelectorAll('.accordeon-hor__btn-close')],
    },
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
      elements.slider.prev.addEventListener('click', () => slider.prev());
      elements.slider.next.addEventListener('click', () => slider.next());
    },
  });

  addListeners(elements, watchedState);
};
