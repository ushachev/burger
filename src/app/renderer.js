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

const animateNav = ([navItem, ...restNavItems]) => {
  if (!navItem) return;
  navItem.classList.toggle('main-nav__item_overlay');
  setTimeout(animateNav, 100, restNavItems);
};

const renderOverlayMenu = (state, { header, nav }) => {
  const { isOpened } = state.ui.overlayMenu;

  fullpage_api.setAllowScrolling(!isOpened); /* eslint-disable-line no-undef */
  fullpage_api.setKeyboardScrolling(!isOpened); /* eslint-disable-line no-undef */

  header.classList.toggle('header_overlay');
  nav.toggler.classList.toggle('toggler_clicked');

  setTimeout(animateNav, 100, nav.items);
};

const renderAccordeon = (state, { accordeon }) => {
  const { activeItemIndex } = state.ui.accordeon;

  accordeon.items.forEach((item) => {
    item.classList.remove('accordeon__item_active');
  });
  accordeon.itemContents.forEach((itemContent) => {
    itemContent.style.height = '';
  });

  if (activeItemIndex !== null) {
    const itemContent = accordeon.itemContents[activeItemIndex];

    accordeon.items[activeItemIndex].classList.add('accordeon__item_active');
    itemContent.style.height = `${itemContent.scrollHeight}px`;
  }
};

export default (state, elements) => {
  const statePathMapping = {
    'ui.activeSection': () => renderSideNav(state, elements),
    'ui.overlayMenu.isOpened': () => renderOverlayMenu(state, elements),
    'ui.accordeon.activeItemIndex': () => renderAccordeon(state, elements),
  };

  const watchedState = onChange(state, (path) => statePathMapping[path]?.());

  return watchedState;
};
