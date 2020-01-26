import { Schema } from '../interfaces/form.interfaces';
import { useMemo } from 'react';

// export const isRequired = (required: boolean) => (value: any) =>
//   !required || value !== undefined || value !== null ? undefined : 'Required';

const mustBeAString = (value: any) => {
  return typeof value !== 'string' || value.length === 0
    ? 'Required'
    : undefined;
};

const mustBeANumber = (value: any) =>
  isNaN(value) || typeof value !== 'number' ? 'Must be a number' : undefined;

const mustBeAnInteger = (value: any) =>
  !Number.isInteger(value) ? 'Must be an integer' : undefined;

const allowUndefinedAndNull = (validator: validatorFn, allow: boolean) => (
  value: any
) => {
  return allow && (value === undefined || value === null)
    ? undefined
    : validator(value);
};

const getDefaultValidators = (
  schemaType: string,
  required: boolean
): validatorFn[] => {
  switch (schemaType) {
    case 'number': {
      return [allowUndefinedAndNull(mustBeANumber, !required)];
    }
    case 'integer': {
      return [allowUndefinedAndNull(mustBeAnInteger, !required)];
    }
    case 'string': {
      return [allowUndefinedAndNull(mustBeAString, !required)];
    }
    default:
      return [];
  }
};

const minimum = (min: number) => (value: any) =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;

const maximum = (max: number) => (value: any) =>
  isNaN(value) || value <= max ? undefined : `Should be smaller than ${max}`;

const minLength = (min: number) => (value: any) =>
  `${value}`.length >= min
    ? undefined
    : `Should be longer than ${min} charachters`;

const maxLength = (max: number) => (value: any) =>
  `${value}`.length <= max
    ? undefined
    : `Should be shorter than ${max} charachters`;

type validatorFn = (value: any) => string | undefined;

function reduceValidators(
  value: any
): (
  previousValue: string | undefined,
  currentValue: validatorFn
) => undefined | string {
  return (error, validator) => error || validator(value);
}

const composeValidators = (...validators: validatorFn[]) => (value: any) =>
  validators.reduce(reduceValidators(value), undefined);

const validators: { [x: string]: (arg0: any) => validatorFn } = {
  minLength,
  maxLength,
  maximum,
  minimum,
};

function getValidators(
  schema: Schema,
  validatorStrs: string[] | null,
  required: boolean
) {
  const _validators = (validatorStrs || [])
    .map(
      key =>
        schema[key] !== undefined &&
        validators[key] !== undefined &&
        validators[key](schema[key])
    )
    .filter(validator => typeof validator === 'function');
  const validate = composeValidators(
    ...getDefaultValidators(schema.type, required),
    ...(_validators as validatorFn[])
  );
  return { validate: validate };
}

export function useGetValidators(
  schema: Schema,
  validatorStrs: string[] | null,
  required: boolean
) {
  return undefined;

  // const validators = useMemo(
  //   () => getValidators(schema, validatorStrs, required),
  //   [schema, validatorStrs, required]
  // );
  // return validators;
}
