import * as layoutTypes from '../types/ui';
import * as routerTypes from '../types/router';

const modalInitialState = {
  modalId: null,
  modalCurrentTabIndex: 0,
  modalCurrentStepIndex: 0,
  origin: null,
  isNonCancellable: false,
};

export default (state = initialState, action) => {
  switch (action.type) {

    case layoutTypes.MODAL_OPEN: {
      const modalId = action.modalId;
      const origin = action.origin;
      const isNonCancellable = action.isNonCancellable;

      return { ...state, modalId, origin, isNonCancellable };
    }

    case 'SET_MODAL_CURRENT_TAB_INDEX': {
      const modalCurrentTabIndex = action.modalCurrentTabIndex;

      return { ...state, modalCurrentTabIndex };
    }

    case 'SET_MODAL_CURRENT_STEP_INDEX': {
      const modalCurrentStepIndex = action.modalCurrentStepIndex;

      return { ...state, modalCurrentStepIndex };
    }

    case layoutTypes.MODAL_CLOSE:
    case routerTypes.LOCATION_CHANGE: {
      return { ...initialState };
    }

    default:
      return state;
  }
};
