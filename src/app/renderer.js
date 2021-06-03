/* eslint-disable no-param-reassign */

import onChange from 'on-change';

const MAX_HORIZONTAL_ACCORDEON_CONTENT_WIDTH = 550;

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

const renderAccordeon = (state, { accordeon }, prevItemIndex) => {
  const { activeItemIndex } = state.ui.accordeon;

  if (prevItemIndex !== null) {
    accordeon.items[prevItemIndex].classList.remove('accordeon__item_active');
    accordeon.itemContents[prevItemIndex].style.height = '';
  }

  if (activeItemIndex !== null) {
    const itemContent = accordeon.itemContents[activeItemIndex];

    accordeon.items[activeItemIndex].classList.add('accordeon__item_active');
    itemContent.style.height = `${itemContent.scrollHeight}px`;
  }
};

const renderHorizontalAccordeon = (state, elements, prevItemIndex) => {
  const { activeItemIndex } = state.ui.horizontalAccordeon;
  const { togglers: [toggler], items, itemContents } = elements.horizontalAccordeon;

  if (prevItemIndex !== null) {
    items[prevItemIndex].classList.remove('accordeon-hor__item_active');
    itemContents[prevItemIndex].style.width = '';
  }

  if (activeItemIndex !== null) {
    const togglerWidth = parseInt(getComputedStyle(toggler).width, 10);
    const calculatedСontentWidth = window.innerWidth - items.length * togglerWidth;
    const contentWidth = calculatedСontentWidth > MAX_HORIZONTAL_ACCORDEON_CONTENT_WIDTH
      ? MAX_HORIZONTAL_ACCORDEON_CONTENT_WIDTH
      : calculatedСontentWidth;

    items[activeItemIndex].classList.add('accordeon-hor__item_active');
    itemContents[activeItemIndex].style.width = `${contentWidth}px`;
  }
};

export default (state, elements) => {
  const statePathMapping = {
    'ui.activeSection': () => renderSideNav(state, elements),
    'ui.overlayMenu.isOpened': () => renderOverlayMenu(state, elements),
    'ui.accordeon.activeItemIndex': (prevItemIndex) => (
      renderAccordeon(state, elements, prevItemIndex)
    ),
    'ui.horizontalAccordeon.activeItemIndex': (prevItemIndex) => (
      renderHorizontalAccordeon(state, elements, prevItemIndex)
    ),
  };

  const watchedState = onChange(
    state, (path, _value, previousValue) => statePathMapping[path]?.(previousValue),
  );

  return watchedState;
};
