import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import React from 'react';
import DatePicker from 'react-datepicker';

interface Props {
  label: string;
  name: string;
  value: Date;
  minDate?: Date;
  maxDate?: Date;
  onChange: (value: any) => void;
  dateFormat?: string;
  isInvalid?: boolean;
  showTimeSelect?: boolean;
  placeholder?: string;
  validationMessage?: any;
}

function FormDateTimeInput({
  label,
  name,
  value,
  minDate,
  maxDate,
  placeholder,
  showTimeSelect = true,
  isInvalid,
  validationMessage,
  dateFormat = 'MMMM dd, yyyy;  h:mm aa',
  //   dateFormat = 'dd/MM/yyyy h:mm aa',
  onChange,
  ...datepickerProps
}: Props) {
  return (
    <FormControl color="var(--form-label)" isInvalid={isInvalid}>
      {label && (
        <Box marginBottom={1} display="flex">
          <FormLabel fontWeight={'400'}>{label}</FormLabel>
        </Box>
      )}

      <HStack spacing={0} gap={0}>
        <DatePicker
          name={name}
          selected={value}
          minDate={minDate}
          maxDate={maxDate}
          showTimeSelect={showTimeSelect}
          timeIntervals={15}
          placeholderText={placeholder}
          dropdownMode="select"
          autoComplete="off"
          dateFormat={dateFormat}
          filterTime={(time) => {
            const currentDate = new Date();
            const selectedDate = new Date(time);
            return currentDate.getTime() < selectedDate.getTime();
          }}
          onChange={onChange}
          {...datepickerProps}
        />
      </HStack>

      {isInvalid && (
        <Flex marginTop={1} columnGap={1} color="#D14343">
          {/* <ErrorIcon /> */}
          <FormErrorMessage
            letterSpacing={0}
            color="#D14343"
            lineHeight="18px"
            fontSize="13px"
            fontWeight={300}
            marginBottom={0}
          >
            {validationMessage}
          </FormErrorMessage>
        </Flex>
      )}
    </FormControl>
  );
}

export default FormDateTimeInput;
