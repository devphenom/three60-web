import { Flex, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import React from 'react';
import { Button, NavLink } from '@global';
import { isAuth } from '@auth/services/auth-utils';
import { useAppDispatch } from '@redux/hooks';
import { logout } from '@auth/redux/auth-slice';

const MobileAuthHeader = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      {isAuth() ? (
        <>
          <Button
            width="100%"
            colorScheme="transparent"
            color="black"
            ml={5}
            justifyContent="flex-start"
            onClick={() => dispatch(logout())}
          >
            Logout
          </Button>
        </>
      ) : (
        <NavLink href="/signin">
          <Flex align={'center'} gap={3}>
            Sign In
          </Flex>
        </NavLink>
      )}
    </>
  );
};

export default MobileAuthHeader;
