import moment from 'moment';

const DATE_FORMAT = 'YYYY-MM-DD';

const getDateStr = val => {
  if (moment.isMoment(val)) {
    return (val as moment.Moment).format(DATE_FORMAT);
  }
  if (val !== null && typeof val === 'object') {
    // native date object
    return val.toISOString && val.toISOString().split('T')[0];
  }
  if (typeof val === 'string' && val.length > 0) {
    return val.split('T')[0];
  }
  return undefined;
};

const getDateTimeStr = val => {
  if (moment.isMoment(val)) {
    return (val as moment.Moment).toISOString();
  }
  if (val !== null && typeof val === 'object') {
    // native date object
    return val.toISOString && val.toISOString();
  }
  if (typeof val === 'string' && val.length > 0) {
    return val;
  }
  return undefined;
};

export function parseDateRange(value: any) {
  if (Array.isArray(value)) {
    const [start, end] = value;
    return [getDateStr(start), getDateStr(end)];
  }
  return undefined;
}

export function formatDateRange(value: any) {
  if (Array.isArray(value)) {
    const [start, end] = value;
    return [start ? moment(start) : null, end ? moment(end) : null];
  }
  return [null, null];
}

export function parseDate(value: any) {
  return getDateStr(value);
}

export function formatDate(value: any) {
  return value ? moment(value) : null;
}
