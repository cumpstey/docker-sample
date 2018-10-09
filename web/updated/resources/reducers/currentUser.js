import * as types from '../types/currentUser';

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

    case types.SET: {
      const { user, roles } = action.payload;
      const isLoaded = true;

      return { ...state, user, roles, isLoaded };
    }

    case types.UNSET: {
      return { ...state, ...initialState };
    }

    case types.FETCHING: {
      const isLoading = true;
      const isLoaded = false;

      return { ...state, isLoading, isLoaded };
    }

    case types.FETCHED: {
      const isLoading = false;

      return { ...state, isLoading };
    }

    default:
      return state;
  }
};
