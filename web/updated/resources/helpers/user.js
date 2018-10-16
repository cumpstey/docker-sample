import jwt from 'jsonwebtoken';
import { storage } from '../constants';
import { boolify, intify, stringify } from './xify';

export const isLoggedIn = () => Boolean(localStorage.getItem(storage.token));

export const getRoleFromToken = token => {
  token = token || localStorage.getItem(storage.token);

  try {
    const decoded = jwt.decode(token, { complete: true });
    const { role } = decoded.payload;

    return role;
  } catch {
    // If it's not a valid token, we don't need to deal with it here - it'll be caught elsewhere.
    return null;
  }
};

export const getShortUserName = props =>
  props.user.firstName && `${props.user.firstName} ${props.user.lastName.substring(0, 1)}.`;

export const mapRawUsersData = users => Array.isArray(users)
  ? users.map(user => {
    const mapped = mapRawUserData(user);
    mapped.roles = mapRawRolesData(user);
    return mapped;
  })
  : [];

export const mapRawUserData = user => ({
  firstName: stringify(user.firstName),
  lastName: stringify(user.lastName),
  email: stringify(user.email),
});

export const mapRawRolesData = user => Array.isArray(user.roles)
  ? user.roles.map(i => stringify(i))
  : [];

export const mapRawTwoFactorAuthData = data => ({
  enabled: boolify(data.is2faEnabled),
  recoveryCodesRemaining: intify(data.recoveryCodesLeft),
});
