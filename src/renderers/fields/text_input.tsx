import React from 'react';
import { Field } from 'react-final-form';
import { useWidget, useWrapper } from '../../form/schema_context';
import { TextInputProps } from '../../interfaces/components.interfaces';
import { Schema } from '../../interfaces/form.interfaces';
import { RenderFnProps } from '../../interfaces/renderers.interfaces';
import { FieldWrapperProps } from '../../interfaces/wrappers.interfaces';
import { getFieldName } from '../../utils/schema_path_utils';
import { useGetValidators } from '../../utils/validators';

interface RenderTextInputFnProps extends RenderFnProps {}

const textValidators = ['minLength', 'maxLength'];

export function RenderTextInput({
  dataPath,
  schemaPath,
  uiPath,
  level,
  required,
  schema,
  uiSchema,
}: RenderTextInputFnProps) {
  const validators = useGetValidators(schema, textValidators, required);
  const TextInputWidget = useWidget<TextInputProps>({
    type: schema.type,
    widget: uiSchema && uiSchema.widget,
  });
  const FieldWrapper = useWrapper<FieldWrapperProps>('field');
  return (
    <FieldWrapper level={level}>
      <Field
        name={getFieldName(dataPath)}
        {...validators}
        initialValue={schema.default || ''}
      >
        {({ input, meta }) => (
          <TextInputWidget
            label={schema.title}
            error={meta.touched && meta.error}
            uiSchema={uiSchema}
            input={input}
            schemaProps={parseTextInputSchema(schema, required)}
          />
        )}
      </Field>
    </FieldWrapper>
  );
}

const IFTE = (condition: any, val: any = condition, elseVal: any = undefined) =>
  !!condition ? val : elseVal;

function parseTextInputSchema(schema: Schema, required: boolean) {
  const { minLength, maxLength } = schema;
  const props = {
    required,
    minLength: IFTE(minLength),
    maxLength: IFTE(maxLength),
  };
  return props;
}
