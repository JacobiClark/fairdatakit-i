/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  IconGitPullRequest,
  IconAlertCircle,
  IconMessages,
  IconDatabase,
} from '@tabler/icons-react';
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  linkTo: string;
}

function MainLink({ icon, color, label, linkTo }: MainLinkProps) {
  return (
    <Link key={label} to={linkTo}>
      <UnstyledButton
        sx={(theme) => ({
          display: 'flex',
          gap: theme.spacing.xs,
          width: '100%',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color:
            theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
          },
        })}
      >
        <Group>
          <ThemeIcon color={color} variant="light">
            {icon}
          </ThemeIcon>

          <Text size="sm">{label}</Text>
        </Group>
      </UnstyledButton>
    </Link>
  );
}

const data = [
  {
    icon: <IconGitPullRequest size="1rem" />,
    color: 'blue',
    label: 'Pull Requests',
    linkTo: '/generate-test-dataset',
  },
  {
    icon: <IconAlertCircle size="1rem" />,
    color: 'teal',
    label: 'Open Issues',
    linkTo: '/curate',
  },
  {
    icon: <IconMessages size="1rem" />,
    color: 'violet',
    label: 'Discussions',
    linkTo: '/pull-requests',
  },
  {
    icon: <IconDatabase size="1rem" />,
    color: 'grape',
    label: 'Databases',
    linkTo: '/pull-requests',
  },
];

export default function MainLinks() {
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}
