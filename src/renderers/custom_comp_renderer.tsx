import React from 'react';
import { RenderUnsupportedField } from './fields/unsupported_field';

export function CustomCompRenderer(props: any) {
  return <RenderUnsupportedField {...props} />;
}
