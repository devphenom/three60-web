export interface IFormInput {
  label?: string;
  isInvalid?: boolean;
  validationMessage?: any;
  mb?: number | string;
  id?: string;
  name: string;
  placeholder?: string;
  value: any;
  onChange: Function;
  type?: string;
}
