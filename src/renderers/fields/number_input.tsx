import React from 'react';
import { Field } from 'react-final-form';
import { useWidget, useWrapper } from '../../form/schema_context';
import { NumberInputProps } from '../../interfaces/components.interfaces';
import { Schema } from '../../interfaces/form.interfaces';
import { RenderFnProps } from '../../interfaces/renderers.interfaces';
import { FieldWrapperProps } from '../../interfaces/wrappers.interfaces';
import { getFieldName } from '../../utils/schema_path_utils';
import { useGetValidators } from '../../utils/validators';

interface RenderNumberInputFnProps extends RenderFnProps {}

const numberValidators = ['minimum', 'maximum'];

export function RenderNumberInput({
  dataPath,
  schemaPath,
  uiPath,
  level,
  required,
  schema,
  uiSchema,
}: RenderNumberInputFnProps) {
  const validators = useGetValidators(schema, numberValidators, required);
  const NumberInputWidget = useWidget<NumberInputProps>({
    type: schema.type,
    widget: uiSchema && uiSchema['ui:widget'],
  });
  const FieldWrapper = useWrapper<FieldWrapperProps>('field');
  return (
    <FieldWrapper level={level} uiSchema={uiSchema}>
      <Field name={getFieldName(dataPath)} {...validators}>
        {({ input, meta }) => (
          <NumberInputWidget
            label={schema.title}
            input={input}
            schemaProps={parseNumberInputSchema(schema, required)}
            uiSchema={uiSchema}
            error={meta.touched && meta.error}
          />
        )}
      </Field>
    </FieldWrapper>
  );
}

const IFTE = (condition: any, val: any = condition, elseVal: any = undefined) =>
  !!condition ? val : elseVal;

function parseNumberInputSchema(schema: Schema, required: boolean) {
  const { multipleOf, maximum, minimum, type } = schema;
  const props = {
    // required,
    step: IFTE(
      type === 'integer',
      IFTE(multipleOf, multipleOf, 1),
      IFTE(multipleOf)
    ),
    min: IFTE(minimum),
    max: IFTE(maximum),
  };
  return props;
}
