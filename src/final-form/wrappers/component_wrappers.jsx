import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

export function FormWrapper({ children, ...otherProps }) {
  return <Form {...otherProps}>{children}</Form>;
}

export function ObjectWrapper({ title, level, children, ...wrapperProps }) {
  const titleComp =
    level === 0 && title ? null : (
      <Col md={12}>
        <Form.Label className="float-left">{title}</Form.Label>
      </Col>
    );
  return (
    <Col md={12} className="ml-2">
      <Row {...wrapperProps} className="border-left mb-2">
        {titleComp}
        {children}
      </Row>
    </Col>
  );
}

export function ObjectItemWrapper({ wrapperProps, level, children }) {
  return children;
}

export function ArrayWrapper({ title, level, children, ...wrapperProps }) {
  const titleComp =
    level === 0 && title ? null : (
      <Col md={12}>
        <Form.Label className="float-left">{title}</Form.Label>
      </Col>
    );
  return (
    <Col md={12} className="ml-2">
      <Row {...wrapperProps} className="border-left mb-2">
        {titleComp}
        {children}
      </Row>
    </Col>
  );
}

export function ArrayItemWrapper({ wrapperProps, level, children, buttons }) {
  return (
    <Col md={12} className="ml-2">
      <Row {...wrapperProps} className="border-left mb-2">
        {children}
        {buttons}
      </Row>
    </Col>
  );
}

export function ArrayItemRemoveBtn({ children, onClick }) {
  return (
    <Col md={2}>
      <Button
        className="align-middle"
        variant="danger"
        onClick={onClick}
        aria-label="Close"
      >
        {children}
        <span className="align-middle" aria-hidden="true">
          &times;
        </span>
      </Button>
    </Col>
  );
}

export function ArrayItemAddBtn({ children, onClick }) {
  return (
    <Col md={12}>
      <Button variant="info" onClick={onClick}>
        {children}
      </Button>
    </Col>
  );
}

export function FieldWrapper({ wrapperProps, level, children }) {
  return (
    <Col md={level === 1 ? 12 : 3} {...wrapperProps}>
      {children}
    </Col>
  );
}
