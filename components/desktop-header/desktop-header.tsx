import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';
import React from 'react';
import { Logo, NavLink } from '@global';
import { NAV_ITEMS } from '@utils/navItems';
import { Search2Icon } from '@chakra-ui/icons';

type Props = {
  value: string;
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
};

const DesktopHeader = ({ value, handleChange }: Props) => {
  return (
    <Box width="full" px={3} pt={3} boxShadow="0px 0px 4px rgba(0, 0, 0, 0.1);">
      <Flex justify="space-between" align="center">
        <Flex gap={10}>
          <Logo full />

          <UnorderedList styleType="none" display="flex" m={0}>
            {NAV_ITEMS.map((item) => (
              <ListItem key={item.title} fontSize="inherit" fontWeight="thin">
                <NavLink href={item.path} exact={item.exact}>
                  <Flex align="center" gap={3}>
                    <item.icon />
                    {item.title}
                  </Flex>
                </NavLink>
              </ListItem>
            ))}
          </UnorderedList>
        </Flex>

        <InputGroup px={4} maxW="400px">
          <InputLeftAddon
            borderTopLeftRadius={'50px'}
            borderBottomLeftRadius="50px"
            color="blackAlpha.500"
            pointerEvents={'none'}
          >
            <Search2Icon />
          </InputLeftAddon>
          <Input
            name="search"
            value={value}
            onChange={handleChange}
            borderTopRightRadius="50px"
            borderBottomRightRadius="50px"
            placeholder="search terms"
          />
        </InputGroup>
      </Flex>
    </Box>
  );
};

export default DesktopHeader;
