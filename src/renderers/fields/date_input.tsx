import React from 'react';
import { Field } from 'react-final-form';
import { useWidget, useWrapper } from '../../form/schema_context';
import {
  DatePickerProps,
  DateTimePickerProps,
} from '../../interfaces/components.interfaces';
import { RenderFnProps } from '../../interfaces/renderers.interfaces';
import { FieldWrapperProps } from '../../interfaces/wrappers.interfaces';
import { getFieldName } from '../../utils/schema_path_utils';
import { useGetValidators } from '../../utils/validators';
interface RenderDateInputFnProps extends RenderFnProps {}

export function RenderDateInput({
  dataPath,
  schemaPath,
  uiPath,
  level,
  required,
  schema,
  uiSchema,
}: RenderDateInputFnProps) {
  const DatePickerWidget = useWidget<DatePickerProps>({
    type: schema['ui:field'],
    widget: uiSchema && uiSchema['ui:widget'],
  });
  const FieldWrapper = useWrapper<FieldWrapperProps>('field');
  const validators = useGetValidators(schema, null, required);
  return (
    <FieldWrapper level={level} uiSchema={uiSchema}>
      <Field
        name={getFieldName(dataPath)}
        {...validators}
        parse={DatePickerWidget.parse}
        format={DatePickerWidget.format}
      >
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
  required,
  schema,
  uiSchema,
}: RenderDateInputFnProps) {
  const DateTimePickerWidget = useWidget<DateTimePickerProps>({
    type: schema['ui:field'],
    widget: uiSchema && uiSchema['ui:widget'],
  });
  const FieldWrapper = useWrapper<FieldWrapperProps>('field');
  const validators = useGetValidators(schema, null, required);
  return (
    <FieldWrapper level={level} uiSchema={uiSchema}>
      <Field
        name={getFieldName(dataPath)}
        {...validators}
        parse={DateTimePickerWidget.parse}
        format={DateTimePickerWidget.format}
      >
        {({ input, meta }) => (
          <DateTimePickerWidget
            label={schema.title}
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
