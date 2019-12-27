import React from "react";
import { Field } from "react-final-form";
import { ReactDateRangePicker } from "../../components/datetime/react-dates/date_range_picker";
import { DateTimePickers } from "../../components/datetime/react-widgets";
import { getFieldName } from "../../utils/schema_path_utils";
import { FieldWrapper } from "../../wrappers/component_wrappers";
interface RenderDateInputFnProps extends RenderFnProps {}

export function renderDateRangeInput({
  dataPath,
  schemaPath,
  uiPath,
  level,
  schema,
  uiSchema
}: RenderDateInputFnProps) {
  return (
    <FieldWrapper level={level} isRow={true}>
      <Field name={getFieldName(dataPath)}>
        {({ input, meta }) => (
          <ReactDateRangePicker
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

export function renderDateTimeRangeInput({
  dataPath,
  schemaPath,
  uiPath,
  level,
  schema,
  uiSchema
}: RenderDateInputFnProps) {
  return (
    <FieldWrapper level={level} isRow={true}>
      <Field name={getFieldName(dataPath)}>
        {({ input, meta }) => (
          <DateTimePickers.DateTimeRange
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
