import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form, Row, Col } from "react-bootstrap";
// import "./date_picker.scss";

export function DateTimeRangePicker({
  label,
  value: [startTimeStamp, endTimestamp] = [],
  onChange,
  required
}) {
  const [startDate, setStartDate] = useState(
    startTimeStamp ? new Date(startTimeStamp) : null
  );
  const [endDate, setEndDate] = useState(
    endTimestamp ? new Date(endTimestamp) : null
  );
  function submitValue() {
    onChange([
      startDate ? startDate.getTime() : null,
      endDate ? endDate.getTime() : null
    ]);
  }
  useEffect(submitValue, [startDate, endDate]);
  const fieldProps = { required };
  return (
    <Row>
      <Col md={2}>
        <Form.Label>{label}</Form.Label>
      </Col>
      <Col md={4}>
        <Form.Group>
          <Form.Label>from</Form.Label>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            maxDate={endDate}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="yyyy/MM/dd h:mm aa"
            {...fieldProps}
          />
        </Form.Group>
      </Col>
      <Col md={4}>
        <Form.Group>
          <Form.Label>to</Form.Label>
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            selectsEnd
            endDate={endDate}
            minDate={startDate}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="yyyy/MM/dd h:mm aa"
            {...fieldProps}
          />
        </Form.Group>
      </Col>
    </Row>
  );
}
