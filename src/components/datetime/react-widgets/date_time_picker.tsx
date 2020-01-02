import React, { useCallback, useMemo } from "react";
import { Form } from "react-bootstrap";
import { DatePicker, DateTimePicker } from "react-widgets";
import dateFnsLocalizer from "react-widgets-date-fns";
import { DateTimePickerProps } from "../../interfaces";
import "./date_time_picker.scss";
dateFnsLocalizer();

function useParsedDate(value: number | null) {
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
  dateOnly = false,
  required = false
}: DateTimePickerProps) {
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
  const props: any = {
    value: inComingValue,
    onChange: onChangeValue,
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
        {...input}
        // containerClassName={"col-md-4"}
      />
    </Form.Group>
  );
}
