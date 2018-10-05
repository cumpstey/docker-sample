import form from './form';

const initialState = {
  isLoading: false,
  serverMessage: null,
  serverMessageType: '',
  errors: {},
  // TODO: this really isn't the right place to store the field configuration!
  fields: {
    email: {
      id: 'email',
      serverId: 'email',
      label: 'Email address',
      value: '',
      type: 'email',
    },
    password: {
      id: 'password',
      serverId: 'password',
      label: 'Password',
      value: '',
      type: 'password',
    },
  },
};

export default (state = initialState, action) => {
  if (action.formId === 'loginForm') {
    return form(state, action);
  }

  if (action.type === '@@router/LOCATION_CHANGE') {
    return initialState;
  }

  return state;
};
