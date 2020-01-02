import React from "react";
import { Field } from "react-final-form";
import { getFieldName } from "../../utils/schema_path_utils";
import { FieldWrapper } from "../../wrappers/component_wrappers";
import { useWidget } from "../../form/schema_context";
import { CheckBoxInputProps } from "../../interfaces/components.interfaces";
import { RenderFnProps } from "../../interfaces/renderers.interfaces";

interface RenderBooleanInputFnProps extends RenderFnProps {}
export function RenderBooleanInput({
  dataPath,
  schemaPath,
  uiPath,
  level,
  schema,
  uiSchema
}: RenderBooleanInputFnProps) {
  const CheckBoxWidget = useWidget<CheckBoxInputProps>({
    type: schema.type,
    widget: uiSchema && uiSchema.widget
  });
  return (
    <FieldWrapper isRow={false} level={level}>
      <Field name={getFieldName(dataPath)}>
        {({ input, meta }) => (
          <CheckBoxWidget
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
