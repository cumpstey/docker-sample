export const FORM_ID = 'loginForm';

export default {
  fields: {
    email: {
      serverId: 'email',
      label: 'Email address',
      type: 'email',
    },
    password: {
      serverId: 'password',
      label: 'Password',
      type: 'password',
    },
  },
};
