export const checkDomain = (url) => {
  const newUrl = url.indexOf('//') === 0 ? (window.location.protocol + url) : url;

  return newUrl.toLowerCase().replace(/([a-z])?:\/\//, '$1').split('/')[0];
};

export const checkExternalUrl = (url) => {
  const hasProtocol = url && (url.indexOf(':') > -1 || url.indexOf('//') > -1);

  return hasProtocol && checkDomain(window.location.href) !== checkDomain(url);
};
