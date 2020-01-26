import React from 'react';
import { Form } from 'react-bootstrap';
import { TextInputProps } from '../../dist/interfaces/components.interfaces';
import { getErrorMessage } from './../wrappers/error_messages';

export function TextInput({
  label,
  error,
  uiSchema,
  input,
  schemaProps,
}: TextInputProps) {
  return (
    <Form.Group controlId={input.name}>
      {label && <Form.Label className="float-left">{label}</Form.Label>}
      <Form.Control {...input} {...schemaProps} isInvalid={!!error} />
      {error && (
        <Form.Control.Feedback type="invalid">
          {getErrorMessage(error)}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
}

export function TextAreaInput({
  label,
  error,
  uiSchema,
  input,
  schemaProps,
}: TextInputProps) {
  const formControlProps: any = {};
  if (uiSchema) {
    formControlProps.as = 'textarea';
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
        <Form.Control.Feedback type="invalid">
          {getErrorMessage(error)}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
}
