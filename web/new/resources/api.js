import config from './configuration';
import request from './request';
import { storage } from './constants';

const { apiRoutes } = config;

const getToken = () => localStorage.getItem(storage.token);

const getHeaders = () => {
  const headers = { Authorization: `Bearer ${getToken()}` };
  return headers;
};

export const submitLogin = data =>
  request.post(apiRoutes.get('login'), data, { headers: getHeaders() });

export const getMe = () =>
  request.get(apiRoutes.get('me'), { headers: getHeaders() });

export const updateMe = data =>
  request.post(apiRoutes.get('me'), data, { headers: getHeaders() });

export const updateMyPassword = data =>
  request.post(apiRoutes.get('myPassword'), data, { headers: getHeaders() });

export const createPassword = (data, token) =>
  request.put(apiRoutes.get('createPassword', { token }), data, { headers: getHeaders() });

export const validatePasswordToken = token =>
  request.get(apiRoutes.get('validatePasswordToken', { token }), { headers: getHeaders() });

export const validatePasswordResetToken = token =>
  request.get(apiRoutes.get('validatePasswordResetToken', { token }), { headers: getHeaders() });

export const submitForgotPassword = data =>
  request.put(apiRoutes.get('sendResetPassword'), data, { headers: getHeaders() });

export const submitResetPassword = data =>
  request.put(apiRoutes.get('resetPassword'), data, { headers: getHeaders() });
