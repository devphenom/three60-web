import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
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
  UnorderedList,
  useDisclosure,
} from '@chakra-ui/react';
import { NAV_ITEMS } from '@utils/navItems';
import { NavLink } from '@global';

type Props = {};

const MobileHeader = (props: Props) => {
  const { onClose, isOpen, onOpen } = useDisclosure();
  return (
    <Container width="100%" p={3} boxShadow="0px 0px 4px rgba(0, 0, 0, 0.1);">
      <Flex justify={'space-between'}>
        <Image src={'/icons/logo-sm.svg'} alt="three60 logo" />
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
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Container>
  );
};

export default MobileHeader;

// 840 g3 ---- 170 --33

// 160+33
