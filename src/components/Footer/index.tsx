import { Container, rem } from '@mantine/core';
import classes from './footer.module.css';
import { FC } from 'react';
import logo from '../../assets/logo.png'

const Footer:FC = () => {

  return (
    <div className={classes.footer}>
      <Container className={classes.inner} size='98%'>
        <img src={logo} alt="" style={{ width: rem(50) }} />
      </Container>
    </div>
  );
}

export default Footer;