import fullpage from 'fullpage.js';

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
    menuBtn: document.querySelector('.humburger-menu-btn'),
    menuItems: [...document.querySelectorAll('.nav-menu__item')],
    menuLinks: [...document.querySelectorAll('.nav-menu__link')],
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

  addListeners(elements, watchedState);
};
