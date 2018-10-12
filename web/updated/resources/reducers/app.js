import * as types from '../types/app';
import uuidv4 from 'uuid/v4';

const initialState = {
  role: null,
  messages: {},
};

const app = (state = initialState, action) => {
  switch (action.type) {
    
    case 'SET_ROLE': {
      const { role } = action.payload;

      return { ...state, role };
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
