import routes from './routes';
import request from './request';
import { storage } from '../constants';

const getToken = () => localStorage.getItem(storage.token);

const getHeaders = () => {
  const headers = { Authorization: `Bearer ${getToken()}` };
  return headers;
};

export const submitLogin = data =>
  request.post(routes.get('login'), data, { headers: getHeaders() });
  
export const submitRegister = data =>
  request.post(routes.get('register'), data, { headers: getHeaders() });

export const getMe = () =>
  request.get(routes.get('me'), { headers: getHeaders() });

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
