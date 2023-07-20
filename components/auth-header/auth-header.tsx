import { Show } from '@chakra-ui/react';
import MobileAuthHeader from '../mobile-auth-header/mobile-auth-header';
import DesktopAuthHeader from '../desktop-auth-header/desktop-auth-header';

const AuthHeader = () => {
  return (
    <>
      <Show below="md">
        <MobileAuthHeader />
      </Show>

      <Show above="md">
        <DesktopAuthHeader />
      </Show>
    </>
  );
};

export default AuthHeader;
