import { CloseIcon } from '@chakra-ui/icons';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react';
import { MagnifyingGlass } from '@phosphor-icons/react';
import React, { useState } from 'react';

type Props = {};

const GenericSearchDrawer = (props: any) => {
  const { onClose, isOpen, searchTerm, handleChange } = props;

  return (
    <Drawer
      placement="top"
      onClose={onClose}
      isOpen={isOpen}
      closeOnOverlayClick={false}
      blockScrollOnMount={false}
      variant="alwaysOpen"
      trapFocus={false}
    >
      <DrawerOverlay />
      <DrawerContent p={0}>
        <DrawerBody>
          <HStack alignItems="center" justifyContent="center" minHeight="100px">
            <InputGroup borderRadius="50px" overflow="hidden" borderColor="red">
              <InputLeftAddon bg="#F6F7FB" pointerEvents={'none'} mr={2}>
                <MagnifyingGlass />
              </InputLeftAddon>
              <Input
                name="search"
                variant="unstyled"
                value={searchTerm}
                onChange={handleChange}
                placeholder="Enter todo title or description..."
              />
            </InputGroup>
            <IconButton
              onClick={onClose}
              aria-label="hamburger icon"
              icon={<CloseIcon />}
              size="sm"
            />
          </HStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default GenericSearchDrawer;
