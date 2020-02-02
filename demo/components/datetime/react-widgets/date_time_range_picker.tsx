import React, { useCallback } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { CustomDateTimePicker } from './date_time_picker';
import { DateTimeRangePickerProps } from '../../../../dist/interfaces/components.interfaces';
import { getErrorMessage } from './../../../wrappers/error_messages';

export function CustomDateTimeRangePicker({
  label,
  input: { value, onChange, ...input },
  required,
  dateOnly,
  uiSchema,
  error,
}: DateTimeRangePickerProps) {
  const [startTimeStamp, endTimestamp] = value;
  const onChangeStart = useCallback(
    (val: Date | undefined) => {
      console.log(val);
      onChange([val, endTimestamp]);
    },
    [endTimestamp, onChange]
  );
  const onChangeEnd = useCallback(
    (val: Date | undefined) => {
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
          uiSchema={uiSchema}
          error={false}
          label="from"
        />
      </Col>
      <Col>
        <CustomDateTimePicker
          input={{ value: endTimestamp, onChange: onChangeEnd, ...input }}
          min={startTimeStamp}
          required={required}
          uiSchema={uiSchema}
          error={false}
          label="to"
        />
      </Col>
      {error && (
        <Form.Control.Feedback type="invalid">
          {getErrorMessage(error)}
        </Form.Control.Feedback>
      )}
    </Row>
  );
}
