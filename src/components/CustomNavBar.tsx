import React from 'react';
import { Navbar } from '@mantine/core';
import MainLinks from './MainLinks';

function CustonNavBar() {
  return (
    <Navbar height={600} p="xs" width={{ base: 300 }}>
      <Navbar.Section grow mt="md">
        <MainLinks />
      </Navbar.Section>
      <Navbar.Section>{/* Footer with user */}</Navbar.Section>
    </Navbar>
  );
}

export default CustonNavBar;
