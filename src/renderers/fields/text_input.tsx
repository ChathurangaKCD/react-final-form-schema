import React from "react";
import { Field } from "react-final-form";
import { TextInputProps } from "../../interfaces/components.interfaces";
import { Schema } from "../../interfaces/form.interfaces";
import { useWidget } from "../../form/schema_context";
import { getFieldName } from "../../utils/schema_path_utils";
import { getValidators } from "../../utils/validators";
import { FieldWrapper } from "../../wrappers/component_wrappers";
import { RenderFnProps } from "../../interfaces/renderers.interfaces";

interface RenderTextInputFnProps extends RenderFnProps {}

const textValidators = ["minLength", "maxLength"];

export function RenderTextInput({
  dataPath,
  schemaPath,
  uiPath,
  level,
  schema,
  uiSchema
}: RenderTextInputFnProps) {
  const validators = getValidators(schema, textValidators);
  const TextInputWidget = useWidget<TextInputProps>({
    type: schema.type,
    widget: uiSchema && uiSchema.widget
  });
  return (
    <FieldWrapper level={level} isRow={false}>
      <Field name={getFieldName(dataPath)} {...validators}>
        {({ input, meta }) => (
          <TextInputWidget
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
