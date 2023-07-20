import {
  extendTheme,
  theme as base,
  withDefaultVariant,
} from '@chakra-ui/react';

import styles from './styles';

import colors from './foundations/colors';

// import fontSizes from "./foundations/fontSizes";

/**
 * This file is generated for providing a custom theme to Chakra UI
 *
 * To learn more about custom themes
 * please visit https://chakra-ui.com/docs/getting-started#add-custom-theme-optional
 */

const components = {
  // Drawer variant to allow pointer events to the underlying content
  Drawer: {
    variants: {
      alwaysOpen: {
        overlay: {
          pointerEvents: 'none',
          background: 'transparent',
        },
        dialogContainer: {
          pointerEvents: 'none',
          background: 'transparent',
        },
        dialog: {
          pointerEvents: 'auto',
        },
      },
    },
  },
};

const overrides = {
  ...styles,
  colors,
  // fontSizes,
  components,
  fonts: {
    heading: `Rubik, ${base.fonts?.heading}`,
    body: `Rubik, ${base.fonts?.body}`,
  },
};

const theme = extendTheme(
  overrides,
  withDefaultVariant({
    variant: 'filled',
    components: ['Input', 'Select', 'Textarea'],
  }),
);

export default theme;
