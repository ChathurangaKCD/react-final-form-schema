import React from "react";
import { Form } from "react-bootstrap";

const allowedInputWidgets = ["textarea"];
export function TextInput({ label, error, path, uiSchema, ...otherProps }) {
  const formControlProps = {};
  if (uiSchema && allowedInputWidgets.includes(uiSchema["ui:widget"])) {
    formControlProps.as = uiSchema["ui:widget"];
  }
  return (
    <Form.Group controlId={path}>
      {label && <Form.Label className="float-left">{label}</Form.Label>}
      <Form.Control {...otherProps} {...formControlProps} isInvalid={!!error} />
      {error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
}
