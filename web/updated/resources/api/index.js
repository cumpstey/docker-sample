// import routes from './routes';
import request from './request';
import { storage } from '../constants';

const getToken = () => localStorage.getItem(storage.token);

const getHeaders = () => {
  const headers = { Authorization: `Bearer ${getToken()}` };
  return headers;
};

const root = '/api/v1'

// Authentication
export const login = data => request.post(`${root}/account/authenticate`, data, { headers: getHeaders() });
export const loginTwoFactor = data => request.post(`${root}/account/authenticate2fa`, data, { headers: getHeaders() });

// Registration
export const register = data => request.post(`${p.root}/account/register`, data, { headers: getHeaders() });
export const verifyEmail = data => request.put(`${p.root}/account/verify-email`, data, { headers: getHeaders() });

// Two factor authentication management
export const getTwoFactorAuthStatus = () => request.get(`${root}/account/2fa`, { headers: getHeaders() });
export const getTwoFactorAuthSetup = () => request.get(`${root}/account/2fa/enable`, { headers: getHeaders() });
export const enableTwoFactorAuth = data => request.put(`${root}/account/2fa/enable`, data, { headers: getHeaders() });
export const disableTwoFactorAuth = data => request.put(`${root}/account/2fa/disable`, data, { headers: getHeaders() });

// User profile
export const getMe = () => request.get(`${root}/account`, { headers: getHeaders() });

// Authorisation
export const impersonateRole = role => request.get(`${root}/account/impersonate-role?role=${role ? role : ''}`, { headers: getHeaders() });


// export const updateMe = data =>
//   request.post(routes.get('me'), data, { headers: getHeaders() });

// export const updateMyPassword = data =>
//   request.post(routes.get('myPassword'), data, { headers: getHeaders() });

// export const createPassword = (data, token) =>
//   request.put(routes.get('createPassword', { token }), data, { headers: getHeaders() });

// export const validatePasswordToken = token =>
//   request.get(routes.get('validatePasswordToken', { token }), { headers: getHeaders() });

// export const validatePasswordResetToken = token =>
//   request.get(routes.get('validatePasswordResetToken', { token }), { headers: getHeaders() });

// export const submitForgotPassword = data =>
//   request.put(routes.get('sendResetPassword'), data, { headers: getHeaders() });

// export const submitResetPassword = data =>
//   request.put(routes.get('resetPassword'), data, { headers: getHeaders() });
