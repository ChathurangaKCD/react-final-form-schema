import Ajv from 'ajv';
import { Schema } from 'interfaces/form.interfaces';
import set from 'lodash.set';
const ajv = new Ajv({ allErrors: true, $data: true, verbose: true });

export function validateData(schema: Schema, options = {}) {
  return (values: any) => {
    const errors = {};
    const validate = ajv.compile(schema);
    const valid = validate(values);

    if (!valid) {
      Array.isArray(validate.errors) &&
        validate.errors.forEach(_error => {
          const errorElements = (_error.params as any).errors
            ? (_error.params as any).errors
            : [_error];

          errorElements.forEach((error: any) => {
            const rootPath = error.dataPath;
            const property = error.params.missingProperty
              ? `/${error.params.missingProperty}`
              : '';
            let fullPath = `${rootPath}${property}`
              .replace(/\//g, '.')
              .substring(1);

            if (error.parentSchema && error.parentSchema.type === 'array') {
              fullPath += '._error';
            }

            const message = _error;

            set(errors, fullPath, message);
          });
        });
    }
    const print = {};
    Object.keys(errors).forEach(key => {
      print[key] = JSON.stringify(errors[key], null, 2);
    });
    console.table(print);
    console.log(errors);
    return errors;
  };
}
