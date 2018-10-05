export const reduceServerFormFields = fields => Object.keys(fields)
  .map(key => ({ [fields[key].serverId]: fields[key].value }))
  .reduce((prev, next) => ({ ...prev, ...next }), {});
