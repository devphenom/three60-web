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
  Input,
  InputGroup,
  InputLeftAddon,
  ListItem,
  UnorderedList,
  useDisclosure,
} from '@chakra-ui/react';
import { NAV_ITEMS } from '@utils/navItems';
import { Logo, NavLink } from '@global';

type Props = {
  value: string;
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
};

const MobileHeader = ({ value, handleChange }: Props) => {
  const { onClose, isOpen, onOpen } = useDisclosure();

  return (
    <Container
      width="100%"
      p={4}
      boxShadow="0px 0px 4px rgba(0, 0, 0, 0.1);"
      bg="whiteAlpha.900"
    >
      <Flex justify={'space-between'} align="center">
        <Logo />
        <IconButton
          onClick={onOpen}
          aria-label="hamburger icon"
          icon={<HamburgerIcon />}
        />
      </Flex>

      <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
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

              <InputGroup px={4}>
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
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Container>
  );
};

export default MobileHeader;
