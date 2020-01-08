interface FormBtnProps {
  submitting: boolean;
  // pristine: boolean;
  disabled: boolean;
  text: string;
}
export interface SubmitBtnProps extends FormBtnProps {
  type: 'submit';
}

export interface ResetBtnProps extends FormBtnProps {
  type: 'button';
  onClick: (e: React.SyntheticEvent) => void;
}
