import backgroundImage from '../assets/images/main.jpg';
import { icon } from '../constants';
import { FORM_ID as LOGIN_FORM_ID, default as loginForm } from './forms/login';
import { FORM_ID as REGISTER_FORM_ID, default as registerForm } from './forms/register';

export const rootUrl = process.browser ? window.app.apiUrl : '';

export const routes = {
  dashboard: '/',
  login: '/login',
  register: '/register',
  verifyEmail: '/verify-email/:token',
  // logout: '/logout',
  // error: '/error',
  // resetPassword: '/password/reset/:token',
  forgotPassword: '/forgot-password',
  // createPassword: '/sign-up/:token',
  // accountSettings: '/account/settings',
  // accountSystem: '/account/system',
  // adminUsers: '/admin/users',
};

export const forms = {
  [LOGIN_FORM_ID]: loginForm,
  [REGISTER_FORM_ID]: registerForm,
}

export default {
  routes,
  rootUrl,
  backgroundImageUrl: backgroundImage,
  forms,
  menus: {
    settings: {
      id: 'settings',
      icon: icon.person,
      name: 'Account settings',
      path: routes.accountSettings,
      description: 'Change your account details and password',
    },
    logout: {
      id: 'logout',
      icon: icon.logout,
      name: 'Log out',
      path: routes.logout,
      description: 'Log out of this account',
    },
  },
};
