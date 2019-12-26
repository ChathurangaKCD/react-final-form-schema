import React from "react";
import { Field } from "react-final-form";
import { TextInput } from "../../components/input_field";
import { getFieldName } from "../../utils/schema_path_utils";
import { composeValidators, validators } from "../../utils/validators";
import { FieldWrapper } from "../../wrappers/component_wrappers";

export function renderTextInput({
  dataPath,
  schemaPath,
  uiPath,
  level,
  schema,
  uiSchema
}) {
  const validators = getValidators(schema);
  return (
    <FieldWrapper level={level} uiSchema={uiSchema}>
      <Field name={getFieldName(dataPath)} {...validators}>
        {({ input, meta }) => (
          <TextInput
            label={schema.title}
            error={meta.touched && meta.error}
            uiSchema={uiSchema}
            input={input}
            schemaProps={parseTextInputSchema(schema)}
          />
        )}
      </Field>
    </FieldWrapper>
  );
}

const IFTE = (condition, val = condition, elseVal = undefined) =>
  condition ? val : elseVal;

function parseTextInputSchema(schema) {
  const { minLength, maxLength } = schema;
  const props = {
    minlength: IFTE(minLength),
    maxlength: IFTE(maxLength)
  };
  return props;
}

const textValidators = ["minLength", "maxLength"];
function getValidators(schema) {
  const _validators = textValidators
    .map(
      key =>
        schema[key] !== undefined &&
        validators[key] !== undefined &&
        validators[key](schema[key])
    )
    .filter(validator => typeof validator === "function");
  const validate = composeValidators(..._validators);
  return { validate };
}
