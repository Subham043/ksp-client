import { Group, ScrollArea, rem, UnstyledButton, Collapse, ThemeIcon, Box, Burger } from '@mantine/core';
import {
  // IconNotes,
  IconGauge,
  IconChevronRight,
  IconUserCircle,
  IconUsersMinus,
  IconFilePercent,
  IconBuildingBank,
  IconPrison,
  IconCloudDownload,
} from '@tabler/icons-react';
import classes from './sidebar.module.css';
import { FC, useState } from 'react';
import { page_routes } from '../../utils/page_routes';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png'
import powered from '../../assets/powered.png'
import { useUser } from '../../hooks/useUser';

interface SidebarProps {
  opened: boolean;
  toggle: () => void;
}

const mockdata = [
  { label: 'Dashboard', icon: IconGauge, link: page_routes.dashboard, role: ["user", "admin"] },
  { label: 'Users', icon: IconUserCircle, link: page_routes.users, role: ["admin"] },
  { label: 'Downloads', icon: IconCloudDownload, link: page_routes.installations, role: ["admin"] },
  { label: 'Criminals', icon: IconUsersMinus, link: page_routes.criminals.list, role: ["user", "admin"] },
  { label: 'Crimes', icon: IconFilePercent, link: page_routes.crimes.list, role: ["user", "admin"] },
  { label: 'Court Details', icon: IconBuildingBank, link: page_routes.court_details.list, role: ["user", "admin"] },
  { label: 'Jail / Punishment Details', icon: IconPrison, link: page_routes.punishment.list, role: ["user", "admin"] },
  // {
  //   label: 'Market news',
  //   icon: IconNotes,
  //   initiallyOpened: false,
  //   links: [
  //     { label: 'Overview', link: '/' },
  //     { label: 'Forecasts', link: '/' },
  //     { label: 'Outlook', link: '/' },
  //     { label: 'Real time', link: '/' },
  //   ],
  // },
];

function LinkContainer({ icon: Icon, label }: LinksGroupProps) {
  return (
    <Box style={{ display: 'flex', alignItems: 'center' }}>
      <ThemeIcon variant="light" size={30} className='mantine-ThemeIcon-container'>
        <Icon style={{ width: rem(18), height: rem(18) }} />
      </ThemeIcon>
      <Box ml="md">{label}</Box>
    </Box>
  )
}

interface LinksGroupProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  link?: string;
  links?: { label: string; link: string }[];
}

function LinksGroup({ icon: Icon, label, initiallyOpened, links, link }: LinksGroupProps) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (hasLinks ? links : []).map((link) => (
    <NavLink
      className={classes.link}
      to={link.link}
      key={link.label}
    >
      {link.label}
    </NavLink>
  ));

  return (
    hasLinks ? <>
      <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
        <Group justify="space-between" gap={0}>
          <LinkContainer icon={Icon} label={label} />
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? 'rotate(-90deg)' : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </> : <>
      <NavLink to={link ? link : '/'} className={classes.control}>
        <Group justify="space-between" gap={0}>
          <LinkContainer icon={Icon} label={label} />
        </Group>
      </NavLink>
    </>
  );
}

const Sidebar:FC<SidebarProps> = ({ opened, toggle }) => {
  const  {user} = useUser();
  const links = mockdata.filter((item) => item.role.includes(user!.role)).map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group className={classes.header_group}>
          <img src={logo} alt="" style={{ width: rem(100) }} />
          <Burger opened={opened} onClick={toggle} size="sm" className={classes.burger} />
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <div style={{textAlign: 'center'}}>
            <img src={powered} alt="" style={{ width: rem(100), margin: 'auto' }} />
            <h5 style={{ margin: '0px' }}>Powered by GANAKA LABS</h5>
            <p style={{ margin: '0px', fontSize: '13px', color: 'rgb(215 0 105)' }}>v1.0.1</p>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;