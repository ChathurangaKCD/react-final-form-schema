import React from "react";
import { Field } from "react-final-form";
import { TextInput } from "../../components/input_field";
import { getFieldName } from "../../utils/schema_path_utils";
import { composeValidators, validators } from "../../utils/validators";
import { FieldWrapper } from "../../wrappers/component_wrappers";
import { Schema } from "../../interfaces";

interface RenderTextInputFnProps extends RenderFnProps {}
export function renderTextInput({
  dataPath,
  schemaPath,
  uiPath,
  level,
  schema,
  uiSchema
}: RenderTextInputFnProps) {
  const validators = getValidators(schema);
  return (
    <FieldWrapper level={level} isRow={false}>
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

const IFTE = (condition: any, val: any = condition, elseVal: any = undefined) =>
  !!condition ? val : elseVal;

function parseTextInputSchema(schema: Schema) {
  const { minLength, maxLength } = schema;
  const props = {
    minlength: IFTE(minLength),
    maxlength: IFTE(maxLength)
  };
  return props;
}

const textValidators = ["minLength", "maxLength"] as const;

function getValidators(schema: Schema) {
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
