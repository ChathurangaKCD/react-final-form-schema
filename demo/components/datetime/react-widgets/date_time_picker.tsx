import React, { useCallback, useMemo } from 'react';
import { Form } from 'react-bootstrap';
import { DateTimePicker } from 'react-widgets';
import { DateTimePickerProps } from '../../../../dist/interfaces/components.interfaces';
import { getErrorMessage } from './../../../wrappers/error_messages';
import moment from 'moment';

function useParsedDate(value: string | null) {
  return useMemo(() => {
    return !!value ? new Date(value) : null;
  }, [value]);
}

export function CustomDateTimePicker({
  label,
  min = null,
  max = null,
  input: { name, onChange, value, ...input },
  readOnly = false,
  required = false,
  error,
}: DateTimePickerProps) {
  const inComingValue = useParsedDate(value);
  const inComingMinValue = useParsedDate(min);
  const inComingMaxValue = useParsedDate(max);

  const onChangeValue = useCallback(
    (nextValue: Date | undefined) => {
      console.log('IS moment', moment.isMoment(nextValue), typeof nextValue);
      const next = nextValue ? nextValue.toISOString() : null;
      onChange(next);
    },
    [onChange]
  );
  //   const widgets = document.getElementsByClassName("rw-input");
  // for (let i=0; i<widgets.length; i++) {
  //   widgets[i].readOnly = true;
  // }
  const props: any = {
    value: inComingValue,
    onChange: onChangeValue,
    required,
    readOnly,
  };
  if (inComingMinValue) {
    props.min = inComingMinValue;
  }
  if (inComingMaxValue) {
    props.max = inComingMaxValue;
  }
  return (
    <Form.Group>
      {label && <Form.Label className="float-left">{label}</Form.Label>}
      <DateTimePicker
        {...props}
        {...input}
        // containerClassName={"col-md-4"}
      />
      {error && (
        <Form.Control.Feedback type="invalid">
          {getErrorMessage(error)}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
}
