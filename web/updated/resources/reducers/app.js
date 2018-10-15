import jwt from 'jsonwebtoken';
import uuidv4 from 'uuid/v4';
import * as types from '../types/app';
import * as authenticationTypes from '../types/authentication';
import * as currentUserTypes from '../types/currentUser';

const initialState = {
  role: null,
  messages: {},
};

const app = (state = initialState, action) => {
  switch (action.type) {
    
    case authenticationTypes.SET_TOKEN: {
      const { token } = action.payload;

      try {
        const decoded = jwt.decode(token, { complete: true });
        const { role } = decoded.payload;

        return { ...state, role }
      } catch {
        // If it's not a valid token, we don't need to deal with it here - it'll be caught elsewhere.
        const role = null;

        return { ...state, role }
      }
    }

    case currentUserTypes.UNSET: {
      const role = null;

      return { ...state, role }
    }
    
    case types.MESSAGE_SHOW: {
      const { text, type } = action.payload;
      const id = uuidv4();

      return { ...state, messages: { ...state.messages, [id]: { text, type } } };
    }
    
    case types.MESSAGE_HIDE: {
      const { id } = action.payload;
      const {[id]: key, ...messages} = state.messages;

      return { ...state, messages };
    }

    default:
      return state;
  }
};

export default app;
