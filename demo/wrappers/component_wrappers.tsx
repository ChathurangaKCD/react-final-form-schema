import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { IWrapper } from '../../dist/';

export function FormWrapper({
  children,
  submitBtn,
  resetBtn,
  ...otherProps
}: IWrapper.FormWrapperProps) {
  return (
    <Form {...otherProps}>
      {children}
      {submitBtn}
      {resetBtn}
    </Form>
  );
}

export function ObjectWrapper({
  title,
  level,
  children,
}: IWrapper.ObjectWrapperProps) {
  const titleComp =
    level === 0 && title ? null : (
      <Col md={12}>
        <Form.Label className="float-left">{title}</Form.Label>
      </Col>
    );
  return (
    <Col md={12} className="ml-2">
      <Form.Row className="border-left mb-2">
        {titleComp}
        {children}
      </Form.Row>
    </Col>
  );
}

export function ObjectItemWrapper({
  level,
  children,
  ...wrapperProps
}: IWrapper.ObjectItemWrapperProps) {
  return <>{children}</>;
}

export function ArrayWrapper({
  title,
  level,
  children,
  ...wrapperProps
}: IWrapper.ArrayWrapperProps) {
  const titleComp =
    level === 0 && title ? null : (
      <Col md={12}>
        <Form.Label className="float-left">{title}</Form.Label>
      </Col>
    );
  return (
    <Col md={12} className="ml-2">
      <Form.Row {...wrapperProps} className="border-left mb-2">
        {titleComp}
        {children}
      </Form.Row>
    </Col>
  );
}

export function ArrayItemWrapper({
  isField = false,
  level,
  children,
  buttons,
  ...wrapperProps
}: IWrapper.ArrayItemWrapperProps) {
  const wrappedChildren = isField ? (
    children
  ) : (
    <Col md={10}>
      <Row>{children}</Row>
    </Col>
  );
  return (
    <Col md={12} className="ml-2">
      <Form.Row {...wrapperProps} className="border-left mb-2">
        {wrappedChildren}
        {buttons}
      </Form.Row>
    </Col>
  );
}

export function ArrayItemRemoveBtn({
  children,
  onClick,
}: IWrapper.ArrayItemRemoveBtnProps) {
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

export function ArrayItemAddBtn({
  children,
  onClick,
}: IWrapper.ArrayItemAddBtnProps) {
  return (
    <Col md={12}>
      <Button variant="info" onClick={onClick}>
        {children}
      </Button>
    </Col>
  );
}

export function FieldWrapper({
  isRow,
  level,
  children,
  ...wrapperProps
}: IWrapper.FieldWrapperProps) {
  return (
    <Col md={level === 1 || isRow ? 12 : 6} {...wrapperProps}>
      {children}
    </Col>
  );
}