export const defaultDefs = {
  daterange: {
    type: 'array',
    items: [{ $ref: '#/definitions/date' }, { $ref: '#/definitions/date' }],
    'ui:field': 'daterange',
    minItems: 2,
    maxItems: 2,
  },
  datetimerange: {
    type: 'array',
    items: [
      { $ref: '#/definitions/datetime' },
      {
        $ref: '#/definitions/datetime',
        formatMinimum: {
          $data: '1/0',
        },
      },
    ],
    'ui:field': 'datetimerange',
    minItems: 2,
    maxItems: 2,
  },
  date: { type: 'string', format: 'date', 'ui:field': 'date' },
  datetime: {
    type: 'string',
    format: 'date-time',
    'ui:field': 'datetime',
  },
};
