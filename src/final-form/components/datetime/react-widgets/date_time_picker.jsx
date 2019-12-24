import React, { useMemo, useCallback } from "react";
import { Form } from "react-bootstrap";
import dateFnsLocalizer from "react-widgets-date-fns";
import { DateTimePicker, DatePicker } from "react-widgets";
import "./date_time_picker.scss";
dateFnsLocalizer();

function useParsedDate(value) {
  return useMemo(() => {
    return !!value ? new Date(value) : null;
  }, [value]);
}

export function CustomDateTimePicker({
  label,
  value,
  min = null,
  max = null,
  onChange,
  required,
  onBlur,
  readOnly = false,
  dateOnly = false
}) {
  const inComingValue = useParsedDate(value);
  const inComingMinValue = useParsedDate(min);
  const inComingMaxValue = useParsedDate(max);

  const onChangeValue = useCallback(
    nextValue => {
      const next = nextValue ? nextValue.getTime() : null;
      onChange(next);
    },
    [onChange]
  );
  //   const widgets = document.getElementsByClassName("rw-input");
  // for (let i=0; i<widgets.length; i++) {
  //   widgets[i].readOnly = true;
  // }
  const props = {
    value: inComingValue,
    onChange: onChangeValue,
    onBlur,
    required,
    readOnly
  };
  if (inComingMinValue) {
    props.min = inComingMinValue;
  }
  if (inComingMaxValue) {
    props.max = inComingMaxValue;
  }
  const Picker = dateOnly ? DatePicker : DateTimePicker;
  return (
    <Form.Group>
      {label && <Form.Label className="float-left">{label}</Form.Label>}
      <Picker
        {...props}
        // containerClassName={"col-md-4"}
      />
    </Form.Group>
  );
}
