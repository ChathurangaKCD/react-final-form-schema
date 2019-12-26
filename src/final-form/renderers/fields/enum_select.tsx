import React from "react";
import { Field } from "react-final-form";
import { getFieldName } from "../../utils/schema_path_utils";
import { FieldWrapper } from "../../wrappers/component_wrappers";
import { SelectField } from "../../components/select_field";

interface RenderEnumSelectFnProps extends RenderFnProps {}
/**
 * Render select field for enums
 * * single value
 * * array
 */
export function renderEnumSelect({
  schema,
  uiSchema,
  dataPath,
  level
}: RenderEnumSelectFnProps) {
  const isMultiple = schema.type === "array";
  const itemSchema = isMultiple ? schema.items : schema;
  const optionValues = itemSchema.enum;
  const optionLabels = itemSchema.enumNames;
  return (
    <FieldWrapper isRow={false} level={level}>
      <Field name={getFieldName(dataPath)}>
        {({ input, meta }) => (
          <SelectField
            label={schema.title}
            input={input}
            optionValues={optionValues}
            optionLabels={optionLabels}
            multiple={isMultiple}
            uiSchema={uiSchema}
            error={meta.touched && meta.error}
          ></SelectField>
        )}
      </Field>
    </FieldWrapper>
  );
}
