import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AppBar } from '@mui/material';

interface IHeader {}

const Header = (props: IHeader) => {
  return (
    <HeaderComponent>
      <AppBar position='static'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <Typography
              variant='h6'
              noWrap
              component='div'
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              <Link to="/">Arkius test app</Link>
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </HeaderComponent>
  );
};

export default Header;

const HeaderComponent = styled.div`
  a {
    text-decoration: none;
    color: #fff;
  }

  .connect {
    color: #fff;
  }
`;
