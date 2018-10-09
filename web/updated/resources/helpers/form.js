export const reduceServerFormFields = (formConfig, fields) => Object.keys(formConfig)
  .map(key => ({ [formConfig[key].serverId]: fields[key] ? fields[key].value : null }))
  .reduce((prev, next) => ({ ...prev, ...next }), {});
