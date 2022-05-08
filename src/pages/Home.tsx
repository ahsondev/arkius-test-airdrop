import React from 'react';
import styled from 'styled-components';
import BackendWallet from 'components/BackendWallet';
import ClientWallet from 'components/ClientWallet';

interface IHome {}

const Home = (props: IHome) => {
  return (
    <ViewComponent>
      <BackendWallet />
      <ClientWallet />
    </ViewComponent>
  )
}

export default Home;

const ViewComponent = styled.div`
  display: flex;
  gap: 40px;
  padding: 0 30px;
  & > div {
    flex: 1;
  }
`;
