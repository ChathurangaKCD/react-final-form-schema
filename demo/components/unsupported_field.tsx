import React from "react";
import { Alert, Col } from "react-bootstrap";

export function UnsupportedField({
  schema: { type },
  uiSchema: any,
  path
}: any) {
  return (
    <Col md={12}>
      <Alert variant="danger">
        Unsupported field @ {path} of type {type}
      </Alert>
    </Col>
  );
}
