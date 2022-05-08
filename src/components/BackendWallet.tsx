import { Grid } from '@mui/material';
import { getBackendAssets } from 'actions/assets';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Asset from './Asset';

interface IProps {
}

const BackendWallet = (props: IProps) => {
  const assets = useSelector<any, IAsset[]>(state => state.assets.backendAssets);
  const dispatch = useDispatch() as any;
  
  useEffect(() => {
    dispatch(getBackendAssets());
  }, [dispatch])

  return (
    <BackendWalletComponent>
      <h2>Backend wallet (Balance: {assets.length})</h2>
      <div className="asset-container">
        <Grid container spacing={2}>
          {assets.map(asset => (
            <Grid key={asset.image} item md={4}>
              <Asset data={asset} />
            </Grid>
          ))}
        </Grid>
      </div>
    </BackendWalletComponent>
  );
};

export default BackendWallet;

const BackendWalletComponent = styled.div<IProps>`
  display: flex;
  flex-direction: column;
`;
