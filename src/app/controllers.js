/* eslint-disable no-param-reassign */

export default (elements, state) => {
  elements.nav.toggler.addEventListener('click', () => {
    if (state.ui.overlayMenu.status === 'idle') {
      state.ui.overlayMenu.status = 'processing';
      state.ui.overlayMenu.isOpened = !state.ui.overlayMenu.isOpened;

      setTimeout(() => {
        state.ui.overlayMenu.status = 'idle';
      }, 1000);
    }
  });

  elements.nav.links.forEach((link) => link.addEventListener('click', () => {
    state.ui.overlayMenu.isOpened = false;
  }));

  elements.accordeon.togglers.forEach((toggler, i) => toggler.addEventListener('click', () => {
    if (state.ui.accordeon.status === 'idle') {
      state.ui.accordeon.status = 'processing';
      state.ui.accordeon.activeItemIndex = state.ui.accordeon.activeItemIndex === i ? null : i;

      setTimeout(() => {
        state.ui.accordeon.status = 'idle';
      }, 600);
    }
  }));

  elements.horizontalAccordeon.togglers.forEach((toggler, i) => toggler
    .addEventListener('click', () => {
      const { horizontalAccordeon } = state.ui;

      if (horizontalAccordeon.status === 'idle') {
        horizontalAccordeon.status = 'processing';
        horizontalAccordeon.activeItemIndex = horizontalAccordeon.activeItemIndex === i ? null : i;

        setTimeout(() => {
          horizontalAccordeon.status = 'idle';
        }, 600);
      }
    }));
};
