import React from "react";
import { Field } from "react-final-form";
import { CheckBoxField } from "../../components/checkbox_field.";
import { getFieldName } from "../../utils/schema_path_utils";
import { FieldWrapper } from "../../wrappers/component_wrappers";

interface RenderBooleanInputFnProps extends RenderFnProps {}
export function renderBooleanInput({
  dataPath,
  schemaPath,
  uiPath,
  level,
  schema,
  uiSchema
}: RenderBooleanInputFnProps) {
  return (
    <FieldWrapper isRow={false} level={level}>
      <Field name={getFieldName(dataPath)}>
        {({ input, meta }) => (
          <CheckBoxField
            label={schema.title}
            input={input}
            {...schema.fieldProps}
            error={meta.touched && meta.error}
          />
        )}
      </Field>
    </FieldWrapper>
  );
}
