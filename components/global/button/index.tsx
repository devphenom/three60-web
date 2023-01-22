import React from 'react';
import {
  Button as BaseButton,
  ButtonProps,
  forwardRef,
} from '@chakra-ui/react';

type IButton = ButtonProps;

const BTN_LOOK_PROPS = {
  primary: {
    backgroundColor: 'brand.500',
    color: 'white',
    borderColor: 'brand.500',
    hoverColor: 'brand.100',
    hoverBrackgroundColor: 'brand.100',
    hoverBorderColor: 'brand.100',
  },
};

// const Btn = styled(BaseButton)`
//   border: 1px solid;
//   border-color: ${(props) => BTN_LOOK_PROPS[props.look].borderColor || ''};
// `;

export const Button: React.FC<IButton> = forwardRef((props, ref) => {
  return (
    <BaseButton
      ref={ref}
      {...props}
      borderRadius={props.borderRadius || '3px'}
      fontWeight="400"
      py={4}
    />
  );
});
