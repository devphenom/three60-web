import React, { CSSProperties } from 'react';
import { Flex, Center } from '@chakra-ui/react';

import {
  PankodIcon,
  GithubIcon,
  TwitterIcon,
  YoutubeIcon,
  LinkedinIcon,
} from '@icons';

export const Footer: React.FC = () => {
  const iconStyle: CSSProperties = {
    fontSize: 22,
    color: '#fff',
    marginRight: '0.25rem',
    marginLeft: '0.25rem',
  };
  return <Center bg="main.100" py={10}></Center>;
};
