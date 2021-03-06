import { storage } from '../constants';

export const isLoggedIn = () => Boolean(localStorage.getItem(storage.token));

export const getShortUserName = props =>
  props.user.firstName && `${props.user.firstName} ${props.user.lastName.substring(0, 1)}.`;

export const mapRawUserData = user => ({
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
});

export const mapRawRolesData = user => user.roles; // TODO: ensure strings

