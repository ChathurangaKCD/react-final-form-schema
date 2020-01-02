import React from "react";
import { Form } from "react-bootstrap";
import { CheckBoxInputProps } from "../interfaces/components.interfaces";

export function CheckBoxField({
  label,
  error,
  input: { name, type, ...input }
}: CheckBoxInputProps) {
  return (
    <Form.Group controlId={name}>
      {label && <Form.Label className="float-left">{label}</Form.Label>}
      <Form.Check {...input} />
    </Form.Group>
  );
}
