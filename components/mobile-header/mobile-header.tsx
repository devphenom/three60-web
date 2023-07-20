import { CloseIcon, HamburgerIcon, Search2Icon } from '@chakra-ui/icons';
import {
  Box,
  Container,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Image,
  ListItem,
  Stack,
  HStack,
  UnorderedList,
  useDisclosure,
} from '@chakra-ui/react';
import { NAV_ITEMS } from '@utils/navItems';
import { Logo, NavLink } from '@global';
import AuthHeader from '../auth-header/auth-header';

import GenericSearchDrawer from '../generic-search-drawer/generic-search-drawer';
import { MagnifyingGlass } from '@phosphor-icons/react';

type Props = {
  searchTerm: string;
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
};

const MobileHeader = ({ searchTerm, handleChange }: Props) => {
  const { onClose, isOpen, onOpen } = useDisclosure();

  const {
    onOpen: onSearchOpen,
    ...rest
  } = useDisclosure();

  return (
    <Container
      width="100%"
      p={4}
      boxShadow="0px 0px 4px rgba(0, 0, 0, 0.1);"
      bg="whiteAlpha.900"
    >
      <HStack justify="space-between" align="center">
        <Logo />
        <HStack>
          <IconButton
            variant="ghost"
            onClick={onSearchOpen}
            aria-label="search icon"
            icon={<MagnifyingGlass size={16} />}
          />
          <IconButton
            variant="ghost"
            onClick={onOpen}
            aria-label="hamburger icon"
            icon={<HamburgerIcon />}
          />
        </HStack>
      </HStack>

      <GenericSearchDrawer searchTerm={searchTerm} handleChange={handleChange} {...rest} />
      <Drawer onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent p={0}>
          <DrawerHeader>
            <Flex justify={'space-between'}>
              <Image src={'/icons/logo-sm.svg'} alt="three60 logo" />
              <IconButton
                onClick={onClose}
                aria-label="hamburger icon"
                icon={<CloseIcon />}
              />
            </Flex>
          </DrawerHeader>
          <DrawerBody p={0}>
            <Box>
              <UnorderedList
                styleType="none"
                display="flex"
                m={0}
                flexDir={'column'}
              >
                {NAV_ITEMS.map((item) => (
                  <ListItem
                    key={item.title}
                    fontSize="inherit"
                    fontWeight={'thin'}
                  >
                    <NavLink href={item.path} exact={item.exact}>
                      <Flex align={'center'} gap={3}>
                        <item.icon />
                        {item.title}
                      </Flex>
                    </NavLink>
                  </ListItem>
                ))}
              </UnorderedList>

              <AuthHeader />

              {/* <InputGroup px={4}>
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
              </InputGroup> */}
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Container>
  );
};

export default MobileHeader;
