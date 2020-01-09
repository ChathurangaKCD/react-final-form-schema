import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form, FormSpy } from 'react-final-form';
import { SchemaRenderer } from '../renderers/schema_renderer';
import { SchemaContextProvider } from './schema_context';
import { SchemaFormProps } from '../interfaces/form.interfaces';
import createDecorator from 'final-form-focus';

const focusOnError = createDecorator();

export function SchemaForm({
  schema,
  uiSchema = null,
  initialValues = {},
  widgets,
  onSubmit,
  onValueChange,
}: SchemaFormProps) {
  const FormWrapper = widgets.wrapper.form;
  const SubmitBtn = widgets.buttons.submit;
  const ResetBtn = widgets.buttons.reset;
  return (
    <SchemaContextProvider
      schema={schema}
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
