import arrayMutators from "final-form-arrays";
import React from "react";
import { Form, FormSpy } from "react-final-form";
import { renderSchema } from "./render_fields";
import { FormWrapper } from "./wrappers/component_wrappers";

export function SchemaForm({ schema, initialValues = {}, onSubmit }) {
  return (
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
            {renderSchema(schema)}
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
            <FormSpy subscription={{ values: true }}>
              {({ values }) => <pre>{JSON.stringify(values, 0, 2)}</pre>}
            </FormSpy>
          </FormWrapper>
        );
      }}
    ></Form>
  );
}
