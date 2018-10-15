import { stringify } from './xify';

export const reduceServerFormFields = (formConfig, fields) => Object.keys(formConfig)
  .map(key => ({ [formConfig[key].serverId]: fields[key] ? fields[key].value : null }))
  .reduce((prev, next) => ({ ...prev, ...next }), {});

export const mapRawTwoFactorAuthSetupData = data => ({
  sharedKey: stringify(data.sharedKey),
  authenticatorUrl: stringify(data.authenticatorUrl),
});

export const mapRawTwoFactorAuthRecoveryCodesData = data => Array.isArray(data.recoveryCodes)
    ? data.recoveryCodes.map(i => stringify(i))
    : [];
