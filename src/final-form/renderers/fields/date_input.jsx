import React from "react";
import { Field } from "react-final-form";
import { DateTimePickers } from "../../components/datetime/react-widgets";
import { getFieldName } from "../../utils/schema_path_utils";
import { FieldWrapper } from "../../wrappers/component_wrappers";

export function renderDateInput({
  dataPath,
  schemaPath,
  uiPath,
  level,
  schema,
  uiSchema
}) {
  return (
    <FieldWrapper level={level} type="datetime">
      <Field name={getFieldName(dataPath)}>
        {({ input, meta }) => (
          <DateTimePickers.DateTime
            label={schema.title}
            dateOnly={schema.type === "date"}
            {...input}
            {...schema.fieldProps}
            error={meta.touched && meta.error}
          />
        )}
      </Field>
    </FieldWrapper>
  );
}
