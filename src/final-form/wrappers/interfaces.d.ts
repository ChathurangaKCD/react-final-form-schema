export interface WrapperProps {
  children: JSX.Element;
}

export interface FormWrapperProps {
  children: JSX.Element[];
  onSubmit: (e: any) => void;
}

export interface ObjectWrapperProps extends WrapperProps {
  title: string;
  level: number;
  children: JSX.Element[] | JSX.Element;
}
export interface ObjectItemWrapperProps extends WrapperProps {
  level: number;
}
export interface FieldWrapperProps extends WrapperProps {
  isRow: boolean;
  level: number;
}
export interface ArrayWrapperProps extends WrapperProps {
  title: string;
  level: number;
  children: JSX.Element[] | JSX.Element;
}
export interface ArrayItemWrapperProps extends WrapperProps {
  level: number;
  isField?: boolean;
  buttons: React.ReactChild;
  children: JSX.Element[] | JSX.Element;
}
export interface ArrayItemRemoveBtnProps {
  children?: React.ReactChild;
  onClick: (e: React.SyntheticEvent) => void;
}
export interface ArrayItemAddBtnProps {
  children?: React.ReactChild;
  onClick: (e: React.SyntheticEvent) => void;
}
