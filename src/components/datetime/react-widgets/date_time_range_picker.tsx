import React, { useCallback } from "react";
import { Row, Col } from "react-bootstrap";
import { CustomDateTimePicker } from "./date_time_picker";
import { DateTimeRangePickerProps } from "../../interfaces";

export function CustomDateTimeRangePicker({
  label,
  input: { value, onChange, ...input },
  required,
  dateOnly
}: DateTimeRangePickerProps) {
  const [startTimeStamp, endTimestamp] = value;
  const onChangeStart = useCallback(
    val => {
      onChange([val, endTimestamp]);
    },
    [endTimestamp, onChange]
  );
  const onChangeEnd = useCallback(
    val => {
      onChange([startTimeStamp, val]);
    },
    [startTimeStamp, onChange]
  );
  return (
    <Row>
      <Col>
        <CustomDateTimePicker
          input={{ value: startTimeStamp, onChange: onChangeStart, ...input }}
          max={endTimestamp}
          required={required}
          dateOnly={dateOnly}
          uiSchema={null}
          error={false}
          label="from"
        ></CustomDateTimePicker>
      </Col>
      <Col>
        <CustomDateTimePicker
          input={{ value: endTimestamp, onChange: onChangeEnd, ...input }}
          min={startTimeStamp}
          required={required}
          dateOnly={dateOnly}
          uiSchema={null}
          error={false}
          label="to"
        ></CustomDateTimePicker>
      </Col>
    </Row>
  );
}
