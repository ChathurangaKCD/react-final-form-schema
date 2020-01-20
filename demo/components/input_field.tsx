import React from 'react';
import { Form } from 'react-bootstrap';
import { TextInputProps } from '../../dist/interfaces/components.interfaces';

const allowedInputWidgets = ['textarea'];

export function TextInput({
  label,
  error,
  uiSchema,
  input,
  schemaProps,
}: TextInputProps) {
  const formControlProps: any = {};
  if (uiSchema && allowedInputWidgets.includes(uiSchema['ui:widget'])) {
    formControlProps.as = uiSchema['ui:widget'];
    formControlProps.rows = uiSchema['ui:rows'];
  }
  return (
    <Form.Group controlId={input.name}>
      {label && <Form.Label className="float-left">{label}</Form.Label>}
      <Form.Control
        {...input}
        {...formControlProps}
        {...schemaProps}
        isInvalid={!!error}
      />
      {error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
}
