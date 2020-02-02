import arrayMutators from 'final-form-arrays';
import createDecorator from 'final-form-focus';
import React, { useState, useMemo } from 'react';
import { Form, FormSpy } from 'react-final-form';
import { SchemaFormProps } from '../interfaces/form.interfaces';
import { SchemaRenderer } from '../renderers/schema_renderer';
import { SchemaContextProvider } from './schema_context';
import { useSchemaValidator } from './schema_validator';
import { validateData } from './data_validator';
import { SchemaValidationError } from './schema_error';
const focusOnError = createDecorator();

export function SchemaForm({
  schema,
  uiSchema,
  initialValues = {},
  widgets,
  onSubmit,
  onValueChange,
  submitBtnText,
  resetBtnText,
  hideSubmit = false,
  hideReset = false,
}: SchemaFormProps) {
  const [formKey, setFormKey] = useState<number>(Date.now);
  const FormWrapper = widgets.wrapper.form;
  const SubmitBtn = widgets.buttons.submit;
  const ResetBtn = widgets.buttons.reset;
  const schemaValidator = useSchemaValidator(schema);
  if (schemaValidator.state === 'invalid')
    throw new SchemaValidationError(schema, schemaValidator.errors);
  else if (
    schemaValidator.state === 'validating' ||
    schemaValidator.schema === null
  )
    return null;
  return (
    <SchemaContextProvider
      schema={schemaValidator.schema}
      uiSchema={uiSchema}
      widgets={widgets}
    >
      <Form
        key={formKey}
        onSubmit={onSubmit}
        initialValues={{ ...initialValues }}
        subscription={{ submitting: true, pristine: true }}
        mutators={{
          ...arrayMutators,
        }}
        validate={values => {
          const er = validateData(schemaValidator.schema || {}, {
            allErrors: true,
            $data: true,
            jsonPointers: true,
          })(values);
          return er;
        }}
        decorators={[focusOnError]}
        render={({ handleSubmit, form, submitting, pristine }) => {
          return (
            <FormWrapper
              onSubmit={handleSubmit}
              submitBtn={
                hideSubmit ? null : (
                  <SubmitBtn
                    type="submit"
                    text={submitBtnText || 'Submit'}
                    submitting={submitting}
                    disabled={submitting || pristine}
                  />
                )
              }
              resetBtn={
                hideReset ? null : (
                  <ResetBtn
                    type="button"
                    text={resetBtnText || 'Reset'}
                    onClick={() => setFormKey(Date.now())}
                    submitting={submitting}
                    disabled={submitting || pristine}
                  />
                )
              }
            >
              <SchemaRenderer
                dataPath=""
                schemaPath=""
                uiPath=""
                level={0}
                required={false}
              />
              {onValueChange && (
                <FormSpy
                  subscription={{ values: true }}
                  onChange={onValueChange}
                />
              )}
            </FormWrapper>
          );
        }}
      />
    </SchemaContextProvider>
  );
}
