/* eslint-disable no-param-reassign */

export default (elements, state) => {
  elements.menuBtn.addEventListener('click', () => {
    if (state.ui.overlayMenu.status === 'idle') {
      state.ui.overlayMenu.status = 'processing';
      state.ui.overlayMenu.isOpened = !state.ui.overlayMenu.isOpened;

      setTimeout(() => {
        state.ui.overlayMenu.status = 'idle';
      }, 1000);
    }
  });

  elements.menuLinks.forEach((menuLink) => menuLink.addEventListener('click', () => {
    state.ui.overlayMenu.isOpened = false;
  }));
};
