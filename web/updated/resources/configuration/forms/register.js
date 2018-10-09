export const FORM_ID = 'registerForm';

export default {
  fields: {
    firstName: {
      serverId: 'firstName',
      label: 'First name',
      type: 'text',
    },
    lastName: {
      serverId: 'lastName',
      label: 'Last name',
      type: 'text',
    },
    email: {
      serverId: 'email',
      label: 'Email address',
      type: 'email',
    },
    password: {
      serverId: 'password',
      label: 'Password',
      type: 'password',
      description: 'Password should be 10 characters or more',
    },
  },
};
