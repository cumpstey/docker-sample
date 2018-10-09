import IntlPolyfill from 'intl';
import 'intl/locale-data/jsonp/en-GB';
// import moment from 'moment';
// import config from '../configuration';
// import { isNull } from 'util';

// const { roles } = config;

Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;

export const checkDomain = (url) => {
  const newUrl = url.indexOf('//') === 0 ? (window.location.protocol + url) : url;

  return newUrl.toLowerCase().replace(/([a-z])?:\/\//, '$1').split('/')[0];
};

export const checkExternalUrl = (url) => {
  const hasProtocol = url && (url.indexOf(':') > -1 || url.indexOf('//') > -1);

  return hasProtocol && checkDomain(window.location.href) !== checkDomain(url);
};


export const reduceServerFormFields = fields => Object.keys(fields)
  .map(key => ({ [fields[key].serverId]: fields[key].value }))
  .reduce((prev, next) => ({ ...prev, ...next }), {});

  

// export const getUrlParams = () => {
//   if (window.location.search) {
//     return window.location.search
//       .substr(1)
//       .split('&')
//       .map(item => item.split('='))
//       .reduce((prev, next) => ({ ...prev, [next[0]]: next[1] }), {});
//   }

//   return {};
// };

// export const getDefaultParams = (tableId) => {
//   const storedParams = JSON.parse(sessionStorage.getItem(tableId)) || {};

//   return {
//     sort: storedParams.sort || config.tables[tableId].defaultSort,
//     order: storedParams.order || 'desc',
//   };
// };

// export const subtractYearsFromDate = date => years =>
//   new Date(new Date(date).setFullYear(new Date(date).getFullYear() - years));

// export const today = new Date(new Date().setHours(0, 0, 0, 0));

// export const addYear = increment => date =>
//   new Date(new Date(date).setFullYear(new Date(date).getFullYear() + increment));

// export const addOneYear = addYear(1);

// export const subtractYearsFromToday = subtractYearsFromDate(today);

// export const getStringifiedDate = (date, options = {}) =>
//   new Intl.DateTimeFormat('en-GB', options).format(date);

// export const getTodaysDate = options =>
//   new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'long', day: 'numeric', ...options }).format(today);

// export const getCurrentMonth = () =>
//   new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'long' }).format(today);

// export const toParamCase = string => string.replace(/([A-Z])/g, (m, w) => `-${w.toLowerCase()}`);

export const mapRawUserData = user => ({
  firstName: user.first_name,
  lastName: user.last_name,
  email: user.email,
  username: user.username,
  roles: user.roles, // TODO: ensure strings
});
