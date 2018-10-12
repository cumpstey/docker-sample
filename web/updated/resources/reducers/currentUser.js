import * as types from '../types/currentUser';

const initialState = {
  userIsLoading: false,
  userIsLoaded: false,
  twoFactorAuthIsLoading: false,
  twoFactorAuthIsLoaded: false,
  user: {
    firstName: null,
    lastName: null,
    email: null,
  },
  roles: [],
  twoFactorAuth: {
    enabled: false,
    recoveryCodesRemaining: 0,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {

    case types.USER_SET: {
      const { user, roles } = action.payload;
      const userIsLoaded = true;

      return { ...state, user, roles, userIsLoaded };
    }

    case types.USER_UNSET: {
      return { ...state, ...initialState };
    }

    case types.USER_FETCHING: {
      const userIsLoading = true;
      const userIsLoaded = false;

      return { ...state, userIsLoading, userIsLoaded };
    }

    case types.USER_FETCHED: {
      const userIsLoading = false;

      return { ...state, userIsLoading };
    }

    case types.TWOFACTORAUTH_SET: {
      const { twoFactorAuth } = action.payload;
      const twoFactorAuthIsLoaded = true;

      return { ...state, twoFactorAuth, twoFactorAuthIsLoaded };
    }

    case types.TWOFACTORAUTH_FETCHING: {
      const twoFactorAuthIsLoading = true;
      const twoFactorAuthIsLoaded = false;

      return { ...state, twoFactorAuthIsLoading, twoFactorAuthIsLoaded };
    }

    case types.TWOFACTORAUTH_FETCHED: {
      const twoFactorAuthIsLoading = false;

      return { ...state, twoFactorAuthIsLoading };
    }

    default:
      return state;
  }
};
