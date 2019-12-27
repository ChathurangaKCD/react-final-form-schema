import moment from "moment";
import React, { useCallback, useState } from "react";
import { SingleDatePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePickerProps } from "./../../interfaces";
import { Form } from "react-bootstrap";

type Date = moment.Moment | null;

export function ReactDatePicker({
  label,
  input: { value, onChange, ...input }
}: DateRangePickerProps) {
  const [date, setDate] = useState<Date>(value ? moment(value) : null);

  const [isFocussed, setIsFocussed] = useState<boolean>(false);
  const onChangeDate = useCallback(
    (newVal: Date) => {
      setDate(newVal);
      const val = newVal === null ? null : newVal.valueOf();
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
    </Form.Group>
  );
}
