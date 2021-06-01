/* eslint-disable no-param-reassign */

import onChange from 'on-change';

const renderSideNav = ({ ui: { activeSection } }, { sideNav }) => {
  const sideNavClassMap = {
    start: 'light',
    about: 'dark',
    burgers: 'light',
    team: 'light',
    menu: 'light',
    reviews: 'light',
    order: 'light',
    map: 'dark',
  };

  sideNav.className = sideNavClassMap[activeSection];
};

const animateMenu = ([menuItem, ...restMenuItems]) => {
  if (!menuItem) return;
  menuItem.classList.toggle('nav-menu__item_overlay');
  setTimeout(animateMenu, 100, restMenuItems);
};

const renderOverlayMenu = (state, { header, menuBtn, menuItems }) => {
  const { isOpened } = state.ui.overlayMenu;

  fullpage_api.setAllowScrolling(!isOpened); /* eslint-disable-line no-undef */
  fullpage_api.setKeyboardScrolling(!isOpened); /* eslint-disable-line no-undef */

  header.classList.toggle('header_overlay');
  menuBtn.classList.toggle('humburger-menu-btn_clicked');

  setTimeout(animateMenu, 100, menuItems);
};

export default (state, elements) => {
  const statePathMapping = {
    'ui.activeSection': () => renderSideNav(state, elements),
    'ui.overlayMenu.isOpened': () => renderOverlayMenu(state, elements),
  };

  const watchedState = onChange(state, (path) => statePathMapping[path]?.());

  return watchedState;
};
