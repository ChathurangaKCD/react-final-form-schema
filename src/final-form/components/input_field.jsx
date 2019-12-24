import React from "react";
import { Form } from "react-bootstrap";

export function InputField({ label, error, path, ...otherProps }) {
  return (
    <Form.Group controlId={path}>
      {label && <Form.Label className="float-left">{label}</Form.Label>}
      <Form.Control {...otherProps} isInvalid={!!error} />
      {error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
}

export function TextAreaField(props) {
  return <InputField {...props} as="textarea" />;
}

export function NumberField(props) {
  // TODO number <=> text '0.', '0.00'
  return <InputField {...props} type="number" />;
}
