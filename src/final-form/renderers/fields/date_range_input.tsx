import React from "react";
import { Field } from "react-final-form";
import {
  DateRangePickerProps,
  DateTimeRangePickerProps
} from "../../components/interfaces";
import { useWidget } from "../../schema_context";
import { getFieldName } from "../../utils/schema_path_utils";
import { FieldWrapper } from "../../wrappers/component_wrappers";
interface RenderDateInputFnProps extends RenderFnProps {}

export function RenderDateRangeInput({
  dataPath,
  schemaPath,
  uiPath,
  level,
  schema,
  uiSchema
}: RenderDateInputFnProps) {
  const DateRangePickerWidget = useWidget<DateRangePickerProps>({
    type: schema.type,
    widget: uiSchema && uiSchema.widget
  });
  return (
    <FieldWrapper level={level} isRow={true}>
      <Field name={getFieldName(dataPath)}>
        {({ input, meta }) => (
          <DateRangePickerWidget
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

export function RenderDateTimeRangeInput({
  dataPath,
  schemaPath,
  uiPath,
  level,
  schema,
  uiSchema
}: RenderDateInputFnProps) {
  const DateTimeRangePickerWidget = useWidget<DateTimeRangePickerProps>({
    type: schema.type,
    widget: uiSchema && uiSchema.widget
  });
  return (
    <FieldWrapper level={level} isRow={true}>
      <Field name={getFieldName(dataPath)}>
        {({ input, meta }) => (
          <DateTimeRangePickerWidget
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
