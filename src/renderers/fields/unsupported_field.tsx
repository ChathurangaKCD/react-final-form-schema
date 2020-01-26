import React from 'react';
import { useWidget, useWrapper } from '../../form/schema_context';
import { RenderFnProps } from '../../interfaces/renderers.interfaces';
import { FieldWrapperProps } from '../../interfaces/wrappers.interfaces';

interface RenderUnsupportedFieldFnProps extends RenderFnProps {}

export function RenderUnsupportedField(props: RenderUnsupportedFieldFnProps) {
  const { dataPath, schemaPath, uiPath, level, schema, uiSchema } = props;
  const UnsupportedField = useWidget<any>({ type: 'unsupported' });
  const FieldWrapper = useWrapper<FieldWrapperProps>('field');
  return (
    <FieldWrapper level={level} uiSchema={uiSchema}>
      <UnsupportedField {...props}></UnsupportedField>
    </FieldWrapper>
  );
}
