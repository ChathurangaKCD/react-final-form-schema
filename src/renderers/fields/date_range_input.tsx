import React from 'react';
import { Field } from 'react-final-form';
import { useWidget, useWrapper } from '../../form/schema_context';
import {
  DateRangePickerProps,
  DateTimeRangePickerProps,
} from '../../interfaces/components.interfaces';
import { RenderFnProps } from '../../interfaces/renderers.interfaces';
import { FieldWrapperProps } from '../../interfaces/wrappers.interfaces';
import { getFieldName } from '../../utils/schema_path_utils';
import { useGetValidators } from '../../utils/validators';
interface RenderDateInputFnProps extends RenderFnProps {}

export function RenderDateRangeInput({
  dataPath,
  schemaPath,
  uiPath,
  level,
  required,
  schema,
  uiSchema,
}: RenderDateInputFnProps) {
  const DateRangePickerWidget = useWidget<DateRangePickerProps>({
    type: schema.type,
    widget: uiSchema && uiSchema.widget,
  });
  const FieldWrapper = useWrapper<FieldWrapperProps>('field');
  const validators = useGetValidators(schema, null, required);
  return (
    <FieldWrapper level={level}>
      <Field name={getFieldName(dataPath)} {...validators}>
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
  required,
  schema,
  uiSchema,
}: RenderDateInputFnProps) {
  const DateTimeRangePickerWidget = useWidget<DateTimeRangePickerProps>({
    type: schema.type,
    widget: uiSchema && uiSchema.widget,
  });
  const FieldWrapper = useWrapper<FieldWrapperProps>('field');
  const validators = useGetValidators(schema, null, required);
  return (
    <FieldWrapper level={level}>
      <Field name={getFieldName(dataPath)} {...validators}>
        {({ input, meta }) => (
          <DateTimeRangePickerWidget
            label={schema.title}
            dateOnly={schema.type === 'date'}
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
