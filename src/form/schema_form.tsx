import arrayMutators from 'final-form-arrays';
import createDecorator from 'final-form-focus';
import React from 'react';
import { Form, FormSpy } from 'react-final-form';
import { SchemaFormProps } from '../interfaces/form.interfaces';
import { SchemaRenderer } from '../renderers/schema_renderer';
import { SchemaContextProvider } from './schema_context';
import { useSchemaValidator } from './schema_validator';
import { validateData } from './data_validator';

const focusOnError = createDecorator();

export function SchemaForm({
  schema,
  uiSchema,
  initialValues = {},
  widgets,
  onSubmit,
  onValueChange,
}: SchemaFormProps) {
  const FormWrapper = widgets.wrapper.form;
  const SubmitBtn = widgets.buttons.submit;
  const ResetBtn = widgets.buttons.reset;
  const schemaValidator = useSchemaValidator(schema);
  if (schemaValidator.state === 'invalid') return <h5>"Schema Error"</h5>;
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
        // validate={validateData(schemaValidator.schema || {}, {
        //   allErrors: true,
        //   $data: true,
        //   jsonPointers: true,
        // })}
        decorators={[focusOnError]}
        render={({ handleSubmit, form, submitting, pristine }) => {
          return (
            <FormWrapper
              onSubmit={handleSubmit}
              submitBtn={
                <SubmitBtn
                  type="submit"
                  text={'Submit'}
                  submitting={submitting}
                  disabled={submitting || pristine}
                />
              }
              resetBtn={
                <ResetBtn
                  type="button"
                  text={'Reset'}
                  onClick={form.reset}
                  submitting={submitting}
                  disabled={submitting || pristine}
                />
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
