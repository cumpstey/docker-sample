import uuidv4 from 'uuid/v4';
import { getRoleFromToken } from '../selectors';
import * as types from '../types/app';
import * as impersonateRoleTypes from '../types/impersonateRole';
import * as currentUserTypes from '../types/currentUser';

const initialState = {
  role: null,
  messages: {},
};

const app = (state = initialState, action) => {
  switch (action.type) {
    
    case impersonateRoleTypes.SET: {
      const { role } = action.payload;

      return { ...state, role }
    }

    case currentUserTypes.USER_UNSET: {
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
