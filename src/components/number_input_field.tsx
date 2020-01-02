import React, { useCallback } from "react";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { NumberInputProps } from "../interfaces/components.interfaces";

export function NumberInput({
  label,
  error,
  uiSchema,
  input: { value: inComingValue, onChange: notifyChange, ...input },
  schemaProps
}: NumberInputProps) {
  const [value, setValue] = useState(inComingValue);
  const onChange = useCallback(
    e => {
      const nextVal = e.target.value;
      setValue(nextVal);
      // number <=> text '0.', '0.00'
      // eslint-disable-next-line
      if (inComingValue != nextVal) {
        notifyChange(Number(nextVal));
      }
    },
    [inComingValue, notifyChange]
  );
  return (
    <Form.Group controlId={input.name}>
      {label && <Form.Label className="float-left">{label}</Form.Label>}
      <Form.Control
        type="number"
        {...input}
        {...schemaProps}
        isInvalid={!!error}
        value={value}
        onChange={onChange}
      />
      {error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
}
