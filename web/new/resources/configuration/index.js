import bg from '../assets/images/bg.jpg';
import apiRoutes from './apiRoutes';
import { icon } from '../constants';

const rootUrl = process.browser ? window.app.apiUrl : '';

const routes = {
  home: '/',
  login: '/login',
  logout: '/logout',
  error: '/error',
  resetPassword: '/password/reset/:token',
  forgotPassword: '/forgot-password',
  createPassword: '/sign-up/:token',
  dashboard: '/dashboard',
  accountSettings: '/account/settings',
  accountSystem: '/account/system',
  adminUsers: '/admin/users',
};

export default {
  routes,
  apiRoutes,
  rootUrl,
  backgroundImageUrl: bg,
  menus: {
    settings: {
      id: 'settings',
      icon: icon.person,
      name: 'Account settings',
      path: routes.accountSettings,
      description: 'Change your account details and password',
    },
    system: {
      id: 'system',
      icon: icon.info,
      name: 'System information',
      path: routes.accountSystem,
      description: 'View system information',
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
