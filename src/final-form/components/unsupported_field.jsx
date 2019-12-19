import React from "react";
import { Alert, Col } from "react-bootstrap";

export function UnsupportedField({ schema, path }) {
  return (
    <Col md={12}>
      <Alert variant="danger">
        Unsupported field @ {path} of type {schema.type}
      </Alert>
    </Col>
  );
}
