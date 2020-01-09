import React from 'react';
import { Field } from 'react-final-form';
import { useWidget, useWrapper } from '../../form/schema_context';
import {
  CheckBoxInputProps,
  InputFieldProps,
} from '../../interfaces/components.interfaces';
import { RenderFnProps } from '../../interfaces/renderers.interfaces';
import { FieldWrapperProps } from '../../interfaces/wrappers.interfaces';
import { getFieldName } from '../../utils/schema_path_utils';

interface RenderUnsupportedFieldFnProps extends RenderFnProps {}
export function RenderUnsupportedField(props: RenderUnsupportedFieldFnProps) {
  const { dataPath, schemaPath, uiPath, level, schema, uiSchema } = props;
  const UnsupportedField = useWidget<any>({ type: 'unsupported' });
  const FieldWrapper = useWrapper<FieldWrapperProps>('field');
  return (
    <FieldWrapper level={level}>
      <UnsupportedField {...props}></UnsupportedField>
    </FieldWrapper>
  );
}
