import moment from 'moment';
import React, { useCallback, useState } from 'react';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { Form } from 'react-bootstrap';
import { DatePickerProps } from '../../../../dist/interfaces/components.interfaces';
import { getErrorMessage } from './../../../wrappers/error_messages';

type Date = moment.Moment | null;

const DATE_FORMAT = 'YYYY-MM-DD';

export function ReactDatePicker({
  label,
  input: { value, onChange, ...input },
  error,
}: DatePickerProps) {
  const [date, setDate] = useState<Date>(value ? moment(value) : null);

  const [isFocussed, setIsFocussed] = useState<boolean>(false);
  const onChangeDate = useCallback(
    (newVal: Date) => {
      setDate(newVal);
      const val = newVal === null ? null : newVal.format(DATE_FORMAT);
      onChange(val);
    },
    [onChange]
  );
  return (
    <Form.Group controlId={input.name}>
      {label && <Form.Label className="float-left">{label}</Form.Label>}
      <SingleDatePicker
        id={input.name}
        date={date}
        onDateChange={onChangeDate}
        focused={!!isFocussed}
        onFocusChange={({ focused }) => setIsFocussed(!!focused)}
        isOutsideRange={() => false}
        small={true}
      />
      {error && (
        <Form.Control.Feedback type="invalid">
          {getErrorMessage(error)}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
}
