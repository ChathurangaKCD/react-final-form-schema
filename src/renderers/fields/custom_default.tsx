import React from 'react';
import { Field } from 'react-final-form';
import { useCustomFieldWidget, useWrapper } from '../../form/schema_context';
import { InputFieldProps } from '../../interfaces/components.interfaces';
import { RenderFnProps } from '../../interfaces/renderers.interfaces';
import { FieldWrapperProps } from '../../interfaces/wrappers.interfaces';
import { getFieldName } from '../../utils/schema_path_utils';

interface RenderCustomFieldFnProps extends RenderFnProps {}

export function RenderCustomField({
  schema,
  uiSchema,
  dataPath,
  level,
}: RenderCustomFieldFnProps) {
  const Widget = useCustomFieldWidget<InputFieldProps>({
    fieldType: schema['ui:field'],
    widget: uiSchema && uiSchema['ui:widget'],
  });
  const FieldWrapper = useWrapper<FieldWrapperProps>('field');
  return (
    <FieldWrapper level={level} uiSchema={uiSchema}>
      <Field name={getFieldName(dataPath)}>
        {({ input, meta }) => (
          <Widget
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
