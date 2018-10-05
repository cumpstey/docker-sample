const initialState = {
  isLoading: false,
  isLoaded: false,
  user: {
    firstName: null,
    lastName: null,
    email: null,
  },
  roles: [],
};

export default (state = initialState, action) => {
  switch (action.type) {

    case 'SET_CURRENT_USER': {
      const { user, roles } = action;
      const isLoaded = true;

      return { ...state, user, roles, isLoaded };
    }

    case 'UNSET_CURRENT_USER': {
      return { ...state, ...initialState };
    }

    case 'FETCH_CURRENT_USER_START': {
      const isLoading = true;
      const isLoaded = false;

      return { ...state, isLoading, isLoaded };
    }

    case 'FETCH_CURRENT_USER_END': {
      const isLoading = false;

      return { ...state, isLoading };
    }

    default:
      return state;
  }
};
