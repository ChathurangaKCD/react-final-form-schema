import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import { CustomDateTimePicker } from './date_time_picker';
import { CustomDateTimeRangePicker } from './date_time_range_picker';

moment.locale('en');
momentLocalizer();

export const DateTimePickers = {
  DateTime: CustomDateTimePicker,
  DateTimeRange: CustomDateTimeRangePicker,
};
