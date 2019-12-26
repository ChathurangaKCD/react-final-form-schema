export const required = value =>
  value === undefined || value === null ? undefined : "Required";

export const mustBeNumber = value =>
  isNaN(value) ? "Must be a number" : undefined;

export const minimum = min => value =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;

export const maximum = max => value =>
  isNaN(value) || value >= max ? undefined : `Should be smaller than ${max}`;

export const minLength = min => value =>
  `${value}`.length >= min
    ? undefined
    : `Should be longer than ${min} charachters`;

export const maxLength = max => value =>
  `${value}`.length <= max
    ? undefined
    : `Should be shorter than ${max} charachters`;

export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);

export const validators = {
  minLength,
  maxLength,
  maximum,
  minimum
};
