import { storage } from '../constants';
import { boolify, intify, stringify } from './xify';

export const isLoggedIn = () => Boolean(localStorage.getItem(storage.token));

export const getShortUserName = props =>
  props.user.firstName && `${props.user.firstName} ${props.user.lastName.substring(0, 1)}.`;

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
