import React from "react";
import { Field } from "react-final-form";
import {
  DatePickerProps,
  DateTimePickerProps
} from "../../components/interfaces";
import { useWidget } from "../../schema_context";
import { getFieldName } from "../../utils/schema_path_utils";
import { FieldWrapper } from "../../wrappers/component_wrappers";
interface RenderDateInputFnProps extends RenderFnProps {}

export function RenderDateInput({
  dataPath,
  schemaPath,
  uiPath,
  level,
  schema,
  uiSchema
}: RenderDateInputFnProps) {
  const DatePickerWidget = useWidget<DatePickerProps>({
    type: schema.type,
    widget: uiSchema && uiSchema.widget
  });
  return (
    <FieldWrapper level={level} isRow={true}>
      <Field name={getFieldName(dataPath)}>
        {({ input, meta }) => (
          <DatePickerWidget
            label={schema.title}
            input={input}
            uiSchema={uiSchema}
            error={meta.touched && meta.error}
          />
        )}
      </Field>
    </FieldWrapper>
  );
}
export function RenderDateTimeInput({
  dataPath,
  schemaPath,
  uiPath,
  level,
  schema,
  uiSchema
}: RenderDateInputFnProps) {
  const DateTimePickerWidget = useWidget<DateTimePickerProps>({
    type: schema.type,
    widget: uiSchema && uiSchema.widget
  });
  return (
    <FieldWrapper level={level} isRow={true}>
      <Field name={getFieldName(dataPath)}>
        {({ input, meta }) => (
          <DateTimePickerWidget
            label={schema.title}
            dateOnly={schema.type === "date"}
            input={input}
            uiSchema={uiSchema}
            required={false}
            error={meta.touched && meta.error}
          />
        )}
      </Field>
    </FieldWrapper>
  );
}
