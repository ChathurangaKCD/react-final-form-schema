import React from "react";
import { Field } from "react-final-form";
import { TextInput } from "../../components/input_field";
import { Schema } from "../../interfaces";
import { getFieldName } from "../../utils/schema_path_utils";
import { FieldWrapper } from "../../wrappers/component_wrappers";
import { getValidators } from "../../utils/validators";

interface RenderTextInputFnProps extends RenderFnProps {}

const textValidators = ["minLength", "maxLength"];

export function renderTextInput({
  dataPath,
  schemaPath,
  uiPath,
  level,
  schema,
  uiSchema
}: RenderTextInputFnProps) {
  const validators = getValidators(schema, textValidators);
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
    minLength: IFTE(minLength),
    maxLength: IFTE(maxLength)
  };
  return props;
}
