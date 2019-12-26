import arrayMutators from "final-form-arrays";
import React from "react";
import { Form, FormSpy } from "react-final-form";
import { SchemaRenderer } from "./renderers/schema_renderer";
import { SchemaContextProvider } from "./schema_context";
import { FormWrapper } from "./wrappers/component_wrappers";

export function SchemaForm({
  schema,
  uiSchema = null,
  initialValues = {},
  onSubmit,
  onValueChange
}) {
  return (
    <SchemaContextProvider schema={schema} uiSchema={uiSchema}>
      <Form
        onSubmit={onSubmit}
        initialValues={{ ...initialValues }}
        subscription={{ submitting: true, pristine: true }}
        mutators={{
          ...arrayMutators
        }}
        render={({ handleSubmit, form, submitting, pristine }) => {
          return (
            <FormWrapper onSubmit={handleSubmit}>
              <SchemaRenderer />
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
