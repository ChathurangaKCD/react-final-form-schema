import arrayMutators from 'final-form-arrays';
import React from 'react';
import { Form, FormSpy } from 'react-final-form';
import { SchemaRenderer } from '../renderers/schema_renderer';
import { SchemaContextProvider } from './schema_context';
import { SchemaFormProps } from '../interfaces/form.interfaces';

export function SchemaForm({
  schema,
  uiSchema = null,
  initialValues = {},
  widgets,
  onSubmit,
  onValueChange,
}: SchemaFormProps) {
  const FormWrapper = widgets.wrapper.form;
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
        render={({ handleSubmit, form, submitting, pristine }) => {
          return (
            <FormWrapper onSubmit={handleSubmit}>
              <SchemaRenderer dataPath="" schemaPath="" uiPath="" level={0} />
              <div className="buttons">
                <button type="submit" disabled={submitting || pristine}>
                  Submit
                </button>
                <button
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </button>
              </div>
              <FormSpy
                subscription={{ values: true }}
                onChange={onValueChange}
              ></FormSpy>
            </FormWrapper>
          );
        }}
      ></Form>
    </SchemaContextProvider>
  );
}
