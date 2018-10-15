import backgroundImage from '../assets/images/main.jpg';
import { icon } from '../constants';
import { FORM_ID as DISABLETWOFACTORAUTH_FORM_ID, default as disableTwoFactorAuthForm } from './forms/disableTwoFactorAuth';
import { FORM_ID as ENABLETWOFACTORAUTH_FORM_ID, default as enableTwoFactorAuthForm } from './forms/enableTwoFactorAuth';
import { FORM_ID as LOGIN_FORM_ID, default as loginForm } from './forms/login';
import { FORM_ID as LOGINTWOFACTOR_FORM_ID, default as loginTwoFactorForm } from './forms/loginTwoFactor';
import { FORM_ID as REGISTER_FORM_ID, default as registerForm } from './forms/register';
import { FORM_ID as VERIFYEMAIL_FORM_ID, default as verifyEmailForm } from './forms/verifyEmail';

export const rootUrl = process.browser ? window.app.apiUrl : '';

export const routes = {
  dashboard: '/',
  
  login: '/login',
  forgotPassword: '/forgot-password',

  register: '/register',
  verifyEmail: '/verify-email/:userId/:token',

  account: '/account',

  userManagement: '/admin/user-management',

  // logout: '/logout',
  // error: '/error',
  // resetPassword: '/password/reset/:token',
  // createPassword: '/sign-up/:token',
  // accountSettings: '/account/settings',
  // accountSystem: '/account/system',
  // adminUsers: '/admin/users',
};

export const forms = {
  [DISABLETWOFACTORAUTH_FORM_ID]: disableTwoFactorAuthForm,
  [ENABLETWOFACTORAUTH_FORM_ID]: enableTwoFactorAuthForm,
  [LOGIN_FORM_ID]: loginForm,
  [LOGINTWOFACTOR_FORM_ID]: loginTwoFactorForm,
  [REGISTER_FORM_ID]: registerForm,
  [VERIFYEMAIL_FORM_ID]: verifyEmailForm,
}

export default {
  routes,
  rootUrl,
  backgroundImageUrl: `/${backgroundImage}`,
  forms,
  // menus: { // TODO: this shouldn't be configured here!
  //   settings: {
  //     id: 'settings',
  //     icon: icon.person,
  //     name: 'Account settings',
  //     path: routes.account,
  //     description: 'Change your account details and password',
  //   },
  //   logout: {
  //     id: 'logout',
  //     icon: icon.logout,
  //     name: 'Log out',
  //     // path: routes.logout,
  //     description: 'Log out of this account',
  //   },
  //},
};
