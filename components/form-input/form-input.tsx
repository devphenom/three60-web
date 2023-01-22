import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import React, { ChangeEventHandler } from 'react';

interface IFormInput {
  label?: string;
  isInvalid?: boolean;
  validationMessage?: any;
  mb?: number | string;
  id?: string;
  name: string;
  placeholder?: string;
  value: any;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type?: string;
  borderTopRightRadius?: string;
  borderBottomRightRadius?: string;
}

const StylednInput = styled(Input)`
  box-shadow: none;
  border-radius: 3px;
  border-top-left-radius: ${(props) => props.borderTopLeftRadius || '3px'};
  border-top-right-radius: ${(props) => props.borderTopRightRadius || '3px'};
  border-bottom-right-radius: ${(props) =>
    props.borderBottomRightRadius || '3px'};
  border-bottom-left-radius: ${(props) =>
    props.borderBottomLeftRadius || '3px'};
  border: 1px solid var(--brand-100);
  color: #000;
  // background-color: #fff;
  font-size: 0.875rem;
  transition: 0.5s ease all;

  &:focus {
    box-shadow: none !important;
    border-color: var(--brand-500);
  }
`;

const FormInput: React.FC<IFormInput> = (props) => {
  const { label, isInvalid, validationMessage, mb, ...rest } = props;
  return (
    <FormControl mb={mb || 4} color="var(--form-label)" isInvalid={isInvalid}>
      {label && <FormLabel fontWeight="400"> {label} </FormLabel>}
      <StylednInput {...rest} w="full" />
      {isInvalid && (
        <FormErrorMessage fontWeight={300}>
          {' '}
          {validationMessage}{' '}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default FormInput;
