import React from "react";
import { Field } from "react-final-form";
import { SelectFieldProps } from "../../interfaces/components.interfaces";
import { useWidget } from "../../form/schema_context";
import { getFieldName } from "../../utils/schema_path_utils";
import { FieldWrapper } from "../../wrappers/component_wrappers";
import { RenderFnProps } from "../../interfaces/renderers.interfaces";

interface RenderEnumSelectFnProps extends RenderFnProps {}
/**
 * Render select field for enums
 * * single value
 * * array
 */
export function RenderEnumSelect({
  schema,
  uiSchema,
  dataPath,
  level
}: RenderEnumSelectFnProps) {
  const isMultiple = schema.type === "array";
  const itemSchema = isMultiple ? schema.items : schema;
  const optionValues = itemSchema.enum;
  const optionLabels = itemSchema.enumNames;

  const SelectFieldWidget = useWidget<SelectFieldProps>({
    type: schema.type,
    widget: (uiSchema && uiSchema.widget) || "enum"
  });
  return (
    <FieldWrapper isRow={false} level={level}>
      <Field name={getFieldName(dataPath)}>
        {({ input, meta }) => (
          <SelectFieldWidget
            label={schema.title}
            input={input}
            optionValues={optionValues}
            optionLabels={optionLabels}
            multiple={isMultiple}
            uiSchema={uiSchema}
            error={meta.touched && meta.error}
          />
        )}
      </Field>
    </FieldWrapper>
  );
}
