import React, { useCallback } from "react";
import { Row, Col } from "react-bootstrap";
import { CustomDateTimePicker } from "./date_time_picker";

export function CustomDateTimeRangePicker({
  label,
  value,
  onChange,
  dateOnly
}) {
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
          value={startTimeStamp}
          onChange={onChangeStart}
          max={endTimestamp}
        ></CustomDateTimePicker>
      </Col>
      <Col>
        <CustomDateTimePicker
          value={endTimestamp}
          onChange={onChangeEnd}
          min={startTimeStamp}
        ></CustomDateTimePicker>
      </Col>
    </Row>
  );
}
