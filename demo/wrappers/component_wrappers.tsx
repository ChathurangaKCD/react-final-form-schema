import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { IWrapper } from '../../dist/interfaces/';
import { RenderCount } from './render_count';

export function FormWrapper({
  children,
  submitBtn,
  resetBtn,
  onSubmit,
}: IWrapper.FormWrapperProps) {
  return (
    <Form onSubmit={onSubmit}>
      <RenderCount />
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
      <RenderCount />
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
}: IWrapper.ObjectItemWrapperProps) {
  return (
    <>
      <RenderCount />
      {children}
    </>
  );
}

export function ArrayWrapper({
  title,
  level,
  children,
  itemAddBtn,
}: IWrapper.ArrayWrapperProps) {
  const titleComp =
    level === 0 && title ? null : (
      <Col md={12}>
        <Form.Label className="float-left">{title}</Form.Label>
      </Col>
    );
  return (
    <Col md={12} className="ml-2">
      <RenderCount />
      <Form.Row className="border-left mb-2">
        {titleComp}
        {children}
        {itemAddBtn}
      </Form.Row>
    </Col>
  );
}

export function ArrayItemWrapper({
  isField = false,
  level,
  children,
  buttons,
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
      <RenderCount />

      <Form.Row className="border-left mb-2">
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

export function FieldWrapper({ level, children }: IWrapper.FieldWrapperProps) {
  return (
    <Col md={level === 1 ? 12 : 6}>
      <RenderCount />
      {children}
    </Col>
  );
}
