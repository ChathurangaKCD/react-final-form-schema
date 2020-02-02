import Ajv from 'ajv';
import RefParser from 'json-schema-ref-parser';
import { Schema } from 'interfaces/form.interfaces';
import { useState, useEffect, useReducer } from 'react';
import { defaultDefs } from './definitions';
const ajv = new Ajv({ allErrors: true, $data: true });

type SchameValidatorState = 'valid' | 'invalid' | 'validating';

interface ValidationAction {
  type: 'validated' | 'newschema';
  errors?: Ajv.ErrorObject[] | null | undefined;
  schema?: Schema | null;
  isValid?: boolean;
}
function validationReducer(_: any, action: ValidationAction) {
  switch (action.type) {
    case 'validated': {
      const { isValid, schema, errors } = action;
      if (isValid) return { schema, state: 'valid' };
      return { errors, state: 'invalid' };
    }
    case 'newschema': {
      return { state: 'validating' };
    }
  }
}
interface Valid {
  schema: Schema;
  state: 'valid';
}
interface Invalid {
  errors: Ajv.ErrorObject[];
  state: 'invalid';
}
interface Validating {
  state: 'validating';
}
type SchemaValidator = Valid | Invalid | Validating;
export function useSchemaValidator(schema: Schema) {
  const [state, dispatch] = useReducer(validationReducer, {
    state: 'validating',
  });
  useEffect(() => {
    (async function validate() {
      dispatch({ type: 'newschema' });
      const { definitions, ...formSchema } = await RefParser.dereference({
        ...schema,
        definitions: { ...schema.definitions, ...defaultDefs },
      });
      const isValid = ajv.validateSchema(formSchema);
      dispatch({
        type: 'validated',
        isValid,
        schema: formSchema,
        errors: ajv.errors,
      });
    })();
    return () => {
      // cleanup;
    };
  }, [schema]);
  return state as SchemaValidator;
}
