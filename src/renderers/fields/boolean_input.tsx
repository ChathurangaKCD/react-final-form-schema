import React from 'react';
import { Field } from 'react-final-form';
import { useWidget, useWrapper } from '../../form/schema_context';
import { CheckBoxInputProps } from '../../interfaces/components.interfaces';
import { RenderFnProps } from '../../interfaces/renderers.interfaces';
import { FieldWrapperProps } from '../../interfaces/wrappers.interfaces';
import { getFieldName } from '../../utils/schema_path_utils';

interface RenderBooleanInputFnProps extends RenderFnProps {}
export function RenderBooleanInput({
  dataPath,
  schemaPath,
  uiPath,
  level,
  schema,
  uiSchema,
}: RenderBooleanInputFnProps) {
  const CheckBoxWidget = useWidget<CheckBoxInputProps>({
    type: schema.type,
    widget: uiSchema && uiSchema['ui:widget'],
  });
  const FieldWrapper = useWrapper<FieldWrapperProps>('field');
  return (
    <FieldWrapper level={level} uiSchema={uiSchema}>
      <Field
        name={getFieldName(dataPath)}
        initialValue={schema.default || false}
        type="checkbox"
      >
        {({ input, meta }) => (
          <CheckBoxWidget
            label={schema.title}
            input={input}
            {...schema.fieldProps}
            error={meta.touched && meta.error}
            uiSchema={uiSchema}
          />
        )}
      </Field>
    </FieldWrapper>
  );
}
