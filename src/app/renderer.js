/* eslint-disable no-param-reassign */

import onChange from 'on-change';

const MAX_HORIZONTAL_ACCORDEON_CONTENT_WIDTH = 550;

const disableFullpageScroll = (isDisabled, sideNav) => {
  global.fullpage_api.setAllowScrolling(!isDisabled);
  global.fullpage_api.setKeyboardScrolling(!isDisabled);
  global.fullpage_api.setLockAnchors(isDisabled);

  if (isDisabled) {
    sideNav.classList.add('disabled');
  } else {
    sideNav.classList.remove('disabled');
  }
};

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

const renderOverlayMenu = (state, { header, nav, sideNav }) => {
  const { isOpened } = state.ui.overlayMenu;

  disableFullpageScroll(isOpened, sideNav);

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
  const {
    block, togglers: [toggler], items, itemContents,
  } = elements.horizontalAccordeon;

  if (prevItemIndex !== null) {
    items[prevItemIndex].classList.remove('accordeon-hor__item_active');
    itemContents[prevItemIndex].style.width = '';
    block.style.transform = 'translateX(0)';
  }

  if (activeItemIndex !== null) {
    const togglerWidth = parseInt(getComputedStyle(toggler).width, 10);
    const isPhone = window.innerWidth <= 480;
    const visibleItemCount = isPhone ? 1 : items.length;
    const calculatedСontentWidth = window.innerWidth - visibleItemCount * togglerWidth;

    const blockOffset = isPhone
      ? togglerWidth * (items.length - (activeItemIndex + 1))
      : 0;
    const contentWidth = calculatedСontentWidth > MAX_HORIZONTAL_ACCORDEON_CONTENT_WIDTH
      ? MAX_HORIZONTAL_ACCORDEON_CONTENT_WIDTH
      : calculatedСontentWidth;

    items[activeItemIndex].classList.add('accordeon-hor__item_active');
    itemContents[activeItemIndex].style.width = `${contentWidth}px`;
    block.style.transform = `translateX(${blockOffset}px)`;
  }
};

const renderReviewModal = (state, { review, sideNav }) => {
  const { activeItemIndex } = state.ui.review;

  disableFullpageScroll(activeItemIndex !== null, sideNav);

  if (activeItemIndex === null) {
    review.section.querySelector('.overlay-review').remove();
    return;
  }

  const reviewItem = review.moreBtns[activeItemIndex].parentElement;

  const modal = review.template.content.firstElementChild.cloneNode(true);
  const modalTitle = modal.querySelector('.overlay-review__title');
  const modalText = modal.querySelector('.overlay-review__text');
  const modalCloseBtn = modal.querySelector('.overlay-review__btn-close');

  modalCloseBtn.addEventListener('click', () => {
    state.ui.review.activeItemIndex = null;
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      state.ui.review.activeItemIndex = null;
    }
  });

  modalTitle.textContent = reviewItem.querySelector('.review__author').textContent;
  modalText.textContent = reviewItem.querySelector('.review__text').textContent;

  review.section.append(modal);
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
    'ui.review.activeItemIndex': (_pV, watchedState) => renderReviewModal(watchedState, elements),
  };

  const watchedState = onChange(
    state, (path, _value, previousValue) => statePathMapping[path]?.(previousValue, watchedState),
  );

  return watchedState;
};
