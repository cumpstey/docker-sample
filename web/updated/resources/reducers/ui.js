import * as uiTypes from '../types/ui';
import * as routerTypes from '../types/router';

const modalInitialState = {
  modalId: null,
  modalCurrentTabIndex: 0,
  modalCurrentStepIndex: 0,
  origin: null,
  isNonCancellable: false,
};

const initialState = {
  dropdownMenuId: null,
  isMobileNavVisible: false,
  modal: modalInitialState,
};

const app = (state = initialState, action) => {
  switch (action.type) {

    case uiTypes.DROPDOWNMENU_OPEN: {
      const isMenuOpen = action.payload.dropdownMenuId === state.dropdownMenuId;
      const dropdownMenuId = isMenuOpen ? null : action.payload.dropdownMenuId;

      return { ...state, dropdownMenuId };
    }

    case uiTypes.MOBILENAV_OPEN: {
      const isMobileNavVisible = true;

      return { ...state, isMobileNavVisible };
    }

    case uiTypes.MOBILENAV_CLOSE: {
      const isMobileNavVisible = false;

      return { ...state, isMobileNavVisible };
    }

    case uiTypes.DROPDOWNMENU_CLOSE: {
      const dropdownMenuId = null;
      const isMobileNavVisible = false;

      return { ...state, isMobileNavVisible, dropdownMenuId };
    }


//
    case uiTypes.MODAL_OPEN: {
      const { modalId, origin, isNonCancellable } = action.payload;
      const dropdownMenuId = null;
      const isMobileNavVisible = false;

      return { ...state, isMobileNavVisible, dropdownMenuId, modal: { modalId, origin, isNonCancellable } };
    }

    case 'SET_MODAL_CURRENT_TAB_INDEX': {
      const { modalCurrentTabIndex } = action.payload;

      return { ...state, modal: { ...modalCurrentTabIndex } };
    }

    case 'SET_MODAL_CURRENT_STEP_INDEX': {
      const { modalCurrentStepIndex } = action.payload;

      return { ...state, modal: { ...modalCurrentStepIndex } };
    }

    case uiTypes.MODAL_CLOSE: {
      return { ...initialState, modal: { ...modalInitialState } };
    }
//



    case routerTypes.LOCATION_CHANGE: {
      return { ...state, ...initialState };
    }

    default:
      return state;
  }
};

export default app;
