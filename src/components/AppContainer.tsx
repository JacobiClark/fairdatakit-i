import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { IconFolderPlus } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import CustonNavBar from './CustomNavBar';

import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from '@mantine/core';

const drawerWidth = 240;

export default function AppContainer({ children }: AppContainerProps) {
  const theme = useMantineTheme();
  const [opened, setOpened] = React.useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          overflowY: 'auto',
          alignItems: 'center',
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<CustonNavBar />}
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{ display: 'flex', alignItems: 'center', height: '100%' }}
          >
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text>Application header</Text>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
