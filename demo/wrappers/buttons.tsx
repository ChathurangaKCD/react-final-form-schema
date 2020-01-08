import React from 'react';
import { IButtons } from './../../dist';
import { Button, Spinner } from 'react-bootstrap';

export function SubmitBtn(props: IButtons.SubmitBtnProps) {
  const { text, submitting, ...otherProps } = props;
  return (
    <Button {...otherProps}>
      {submitting && (
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      )}
      {text}
    </Button>
  );
}

export function ResetBtn(props: IButtons.ResetBtnProps) {
  const { text, submitting, ...otherProps } = props;
  return (
    <Button {...otherProps}>
      {submitting && (
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      )}
      {text}
    </Button>
  );
}
