import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import React from 'react';
import { IFormInput } from 'src/types';

const FormInput: React.FC<IFormInput> = (props) => {
  const { label, isInvalid, validationMessage, ...rest } = props;
  return (
    <FormControl>
      {label && <FormLabel> {label} </FormLabel>}
      <Input {...rest} />
      {isInvalid && <FormErrorMessage> {validationMessage} </FormErrorMessage>}
    </FormControl>
  );
};

export default FormInput;
