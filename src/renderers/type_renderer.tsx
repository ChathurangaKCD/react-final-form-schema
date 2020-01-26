import React from 'react';
import { useFormSchema } from '../form/schema_context';
import {
  RenderFnProps,
  TypeRendererProps,
} from '../interfaces/renderers.interfaces';
import { RenderBooleanInput } from './fields/boolean_input';
import { RenderEnumSelect } from './fields/enum_select';
import { RenderNumberInput } from './fields/number_input';
import { RenderTextInput } from './fields/text_input';
import { RenderUnsupportedField } from './fields/unsupported_field';

const defaultTypeRenderers = new Map<string, React.FC<RenderFnProps>>()
  .set('string', RenderTextInput)
  .set('string:enum', RenderEnumSelect)
  .set('number', RenderNumberInput)
  .set('integer', RenderNumberInput)
  .set('boolean', RenderBooleanInput);

/**
 * Render Fields
 * @param props
 */
export function TypeRenderer(props: TypeRendererProps) {
  const { dataPath, schemaPath, uiPath, level } = props;
  const { schema, uiSchema } = useFormSchema(schemaPath, uiPath);
  const renderData = { ...props, schema, uiSchema };

  let renderer = schema.type;
  if (renderer === 'string' && Array.isArray(schema.enum)) {
    renderer = 'string:enum';
  }
  const DefaultFieldRenderer = defaultTypeRenderers.get(renderer);
  if (DefaultFieldRenderer) {
    return <DefaultFieldRenderer {...renderData} />;
  }

  return <RenderUnsupportedField {...renderData} />;
}
