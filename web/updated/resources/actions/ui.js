import * as types from '../types/ui';

// Keyboard

export const handleEscapeKey = () => ({
  type: types.KEYBOARD_ESCAPE,
});

// Mobile nav

export const openMobileNav = () => ({
  type: types.MOBILENAV_OPEN,
});

export const closeMobileNav = () => ({
  type: types.MOBILENAV_CLOSE,
});

// Dropdown menu

export const openDropdownMenu = dropdownMenuId => ({
  type: types.DROPDOWNMENU_OPEN,
  payload: { dropdownMenuId },
});

export const closeDropdownMenu = () => ({
  type: types.DROPDOWNMENU_CLOSE,
});

// Modal

export const showModal = modalId => ({
  type: types.MODAL_OPEN,
  payload: { modalId },
});

export const closeModal = () => ({
  type: types.MODAL_CLOSE,
});

// TODO: what's this for?
// Page loading

export const loadPage = () => (dispatch) => {
  dispatch({ type: 'LOAD_PAGE' });
};
