import { ThemeOverride } from '@chakra-ui/react';

type GlobalStyles = Pick<ThemeOverride, 'styles'>;

export default {
  styles: {
    global: (props) => ({
      h1: {
        fontWeight: 500,
        marginBottom: '0.5em',
      },
      p: {
        marginBottom: '1em',
      },
      '*::placeholder': {
        color: 'blackAlpha.600',
      },
    }),
  },
} as GlobalStyles;
