import React, { useCallback } from 'react';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import { IComponent } from '../../dist/';
import { getErrorMessage } from './../wrappers/error_messages';

function useControlledNumberInput(
  inComingValue: number,
  notifyChange: (nextVal: number) => void
) {
  // const [value, setValue] = useState<string | number>(inComingValue);
  // const onChange = useCallback(
  //   e => {
  //     const nextVal = e.target.value;
  //     setValue(nextVal);
  //     // number <=> text '0.', '0.00'
  //     // eslint-disable-next-line
  //     if (inComingValue != nextVal) {
  //       notifyChange(Number(nextVal));
  //     }
  //   },
  //   [inComingValue, notifyChange]
  // );
  // const strVal = value.toString();
  // return { value: strVal, onChange };
  return { value: inComingValue, onChange: notifyChange };
}

export function NumberInput({
  label,
  error,
  uiSchema,
  input: { value: inComingValue, onChange: notifyChange, ...input },
  schemaProps,
}: IComponent.NumberInputProps) {
  const { value, onChange } = useControlledNumberInput(
    inComingValue,
    notifyChange
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
        <Form.Control.Feedback type="invalid">
          {getErrorMessage(error)}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
}

export function NumberRangeInput({
  label,
  error,
  uiSchema,
  input: { value: inComingValue, onChange: notifyChange, ...input },
  schemaProps,
}: IComponent.NumberInputProps) {
  const { value, onChange } = useControlledNumberInput(
    inComingValue,
    notifyChange
  );
  return (
    <Form.Group controlId={input.name}>
      {label && <Form.Label className="float-left">{label}</Form.Label>}
      <Form.Control
        type="range"
        {...input}
        {...schemaProps}
        isInvalid={!!error}
        value={value}
        onChange={onChange}
      />
      {value}
      {error && (
        <Form.Control.Feedback type="invalid">
          {getErrorMessage(error)}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
}
