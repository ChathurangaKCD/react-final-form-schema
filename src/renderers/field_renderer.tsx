import React from 'react';
import { useFormSchema } from '../form/schema_context';
import {
  FieldRendererProps,
  RenderFnProps,
} from '../interfaces/renderers.interfaces';
import { RenderCustomField } from './fields/custom_default';
import { RenderDateInput, RenderDateTimeInput } from './fields/date_input';
import {
  RenderDateRangeInput,
  RenderDateTimeRangeInput,
} from './fields/date_range_input';

const defaultFieldRenderers = new Map<string, React.FC<RenderFnProps>>()
  .set('date', RenderDateInput)
  .set('datetime', RenderDateTimeInput)
  .set('daterange', RenderDateRangeInput)
  .set('datetimerange', RenderDateTimeRangeInput);

/**
 * Render Fields
 * @param props
 */
export function FieldRenderer(props: FieldRendererProps) {
  const { dataPath, schemaPath, uiPath, level } = props;
  const { schema, uiSchema } = useFormSchema(schemaPath, uiPath);
  const renderData = { ...props, schema, uiSchema };

  const DefaultFieldRenderer = defaultFieldRenderers.get(schema['ui:field']);
  if (DefaultFieldRenderer) {
    return <DefaultFieldRenderer {...renderData} />;
  } else {
    return <RenderCustomField {...renderData} />;
  }
}
