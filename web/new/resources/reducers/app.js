const initialState = {
  role: null,
  dropdownMenuId: null,
  isMobileNavVisible: false,
};

const app = (state = initialState, action) => {
  switch (action.type) {
    
    case 'SET_ROLE': {
      const { role } = action;

      return { ...state, role };
    }

    case 'OPEN_DROPDOWN_MENU': {
      const isMenuOpen = action.dropdownMenuId === state.dropdownMenuId;
      const dropdownMenuId = isMenuOpen ? null : action.dropdownMenuId;

      return { ...state, dropdownMenuId };
    }

    case 'OPEN_MOBILE_NAV': {
      const isMobileNavVisible = true;

      return { ...state, isMobileNavVisible };
    }

    case 'CLOSE_MOBILE_NAV': {
      const isMobileNavVisible = false;

      return { ...state, isMobileNavVisible };
    }

    case 'SHOW_MODAL':
    case 'CLOSE_DROPDOWN_MENU': {
      const dropdownMenuId = null;
      const isMobileNavVisible = false;

      return { ...state, isMobileNavVisible, dropdownMenuId };
    }

    case '@@router/LOCATION_CHANGE': {
      const dropdownMenuId = null;
      const isMobileNavVisible = false;

      return { ...state, isMobileNavVisible, dropdownMenuId };
    }

    default:
      return state;
  }
};

export default app;
