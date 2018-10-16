import * as types from '../types/users';

const initialState = {
  isLoading: false,
  isLoaded: false,
  data: [],
  meta: {
    page: 1,
    pageSize: 10,
    totalCount: 0,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {

    case types.SET: {
      const { data, meta } = action.payload;
      const isLoaded = true;

      return { ...state, data, meta, isLoaded };
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
