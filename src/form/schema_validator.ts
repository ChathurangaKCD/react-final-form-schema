import Ajv from 'ajv';
import RefParser from 'json-schema-ref-parser';
import { Schema } from 'interfaces/form.interfaces';
import { useState, useEffect } from 'react';
const ajv = new Ajv({ allErrors: true, $data: true });

type SchameValidatorState = 'valid' | 'invalid' | 'validating';

export function useSchemaValidator(schema: Schema) {
  const [state, setState] = useState<SchameValidatorState>('validating');
  const [validatedSchema, setSchema] = useState<Schema | null>(null);
  useEffect(() => {
    (async function validate() {
      const { definitions, ...formSchema } = await RefParser.dereference(
        schema
      );
      const valid = ajv.validateSchema(formSchema);
      setState(valid ? 'valid' : 'invalid');
      if (valid) {
        setSchema(formSchema);
      } else {
        console.log('Schema Errors:', ajv.errors);
      }
    })();
    return () => {
      // cleanup;
    };
  }, [schema]);
  return { state, schema: validatedSchema };
}
