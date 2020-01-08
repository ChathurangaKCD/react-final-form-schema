import { Schema } from '../interfaces/form.interfaces';

export const required = (required: boolean) => (value: any) =>
  !required || value !== undefined || value !== null ? undefined : 'Required';

export const mustBeNumber = (value: any) =>
  isNaN(value) ? 'Must be a number' : undefined;

export const minimum = (min: number) => (value: any) =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;

export const maximum = (max: number) => (value: any) =>
  isNaN(value) || value <= max ? undefined : `Should be smaller than ${max}`;

export const minLength = (min: number) => (value: any) =>
  `${value}`.length >= min
    ? undefined
    : `Should be longer than ${min} charachters`;

export const maxLength = (max: number) => (value: any) =>
  `${value}`.length <= max
    ? undefined
    : `Should be shorter than ${max} charachters`;

export type validatorFn = (value: any) => string | undefined;

function reduceValidators(
  value: any
): (
  previousValue: string | undefined,
  currentValue: validatorFn
) => undefined | string {
  return (error, validator) => error || validator(value);
}

export const composeValidators = (...validators: validatorFn[]) => (
  value: any
) => validators.reduce(reduceValidators(value), undefined);

export const validators: { [x: string]: (arg0: any) => validatorFn } = {
  minLength,
  maxLength,
  maximum,
  minimum,
};

export function getValidators(schema: Schema, validatorStrs: string[]) {
  const _validators = validatorStrs
    .map(
      key =>
        schema[key] !== undefined &&
        validators[key] !== undefined &&
        validators[key](schema[key])
    )
    .filter(validator => typeof validator === 'function');
  const validate = composeValidators(...(_validators as validatorFn[]));
  return { validate };
}
