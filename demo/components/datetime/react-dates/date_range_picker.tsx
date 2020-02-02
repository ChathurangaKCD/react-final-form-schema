import moment from 'moment';
import React, { useCallback, useState } from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { Form } from 'react-bootstrap';
import { DateRangePickerProps } from '../../../../dist/interfaces/components.interfaces';
import { getErrorMessage } from './../../../wrappers/error_messages';
import { formatDateRange, parseDateRange } from '../date_utils';

const DATE_FORMAT = 'YYYY-MM-DD';

interface DateRange {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
}

ReactDateRangePicker.parse = parseDateRange;
ReactDateRangePicker.format = formatDateRange;

export function ReactDateRangePicker({
  label,
  input: { value, onChange, onBlur, onFocus, ...input },
  error,
}: DateRangePickerProps) {
  const [startDate, endDate] = value;
  const [focusedInput, setFocusedInput] = useState<
    'startDate' | 'endDate' | null
  >(null);
  const onChangeRange = useCallback(
    (val: DateRange) => {
      const { startDate: start, endDate: end } = val;
      onChange([start, end]);
    },
    [onChange]
  );
  return (
    <Form.Group controlId={input.name}>
      {label && <Form.Label className="float-left">{label}</Form.Label>}
      <DateRangePicker
        startDateId={input.name + 'startDate'}
        endDateId={input.name + 'endDate'}
        startDate={startDate}
        endDate={endDate}
        onDatesChange={onChangeRange}
        focusedInput={focusedInput}
        onFocusChange={setFocusedInput}
        isOutsideRange={() => false}
        small={true}
        // minDate={moment}
        // maxDate={moment}
      />
      {error && (
        <Form.Control.Feedback type="invalid">
          {getErrorMessage(error)}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
}
