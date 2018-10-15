export const boolify = (i) => Boolean(i);

export const intify = (i) => {
  const value = Number(i);
  return Number.isInteger(value) ? value : NaN;
};

export const stringify = (i) => typeof i === "undefined" ? null : i === null ? null : String(i);
