import React from "react";
import { Form } from "react-bootstrap";

export function CheckBoxField({ label, error, path, ...otherProps }) {
  return (
    <Form.Group controlId={path}>
      {label && <Form.Label className="float-left">{label}</Form.Label>}
      <Form.Check type="checkbox" {...otherProps} />
      {/* <Form.Text className="text-muted">error</Form.Text> */}
    </Form.Group>
  );
}
