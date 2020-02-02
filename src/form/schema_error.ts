export class SchemaValidationError extends Error {
  schema: any;
  errors: any;
  constructor(schema: any, errors: any) {
    super('Schema Error');
    this.schema = schema;
    this.errors = errors;
    console.error('Schema', schema);
    console.error('Schema Errors', errors);
  }
}
