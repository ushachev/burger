import fullpage from 'fullpage.js';

import initView from './renderer.js';

export default () => {
  const state = {
    ui: {
      activeSection: null,
    },
  };

  const elements = {};

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
};
