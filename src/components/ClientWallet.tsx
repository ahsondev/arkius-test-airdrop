import { Button, Grid, TextField } from '@mui/material';
import { getBackendAssets, getClientAssets, requestAsset } from 'actions/assets';
import { setLoading } from 'actions/viewStates';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getStorageItem, setStorageItem } from 'utils/helper';
import Web3 from 'web3';
import Asset from './Asset';
import { NotificationManager } from './Notification';

interface IProps {
}

const ClientWallet = (props: IProps) => {
  const assets = useSelector<any, IAsset[]>(state => state.assets.clientAssets);
  const [wallet, setWallet] = useState<string>(getStorageItem("wallet", ""));
  const dispatch = useDispatch() as any;

  useEffect(() => {
    onSetWallet();
  }, []);

  const onSetWallet = async () => {
    if (!Web3.utils.isAddress(wallet)) {
      NotificationManager.warning("Please input valid address", "Invalid address");
      return;
    }

    dispatch(setLoading(true));
    try {
      setStorageItem("wallet", wallet);
      await dispatch(getClientAssets(wallet));
    } catch (e) {
      console.log(e);
    }
    dispatch(setLoading(false));
  }

  const onRequest = async (membership: number) => {
    if (!Web3.utils.isAddress(wallet)) {
      NotificationManager.warning("Please input valid address", "Invalid address");
      return;
    }

    dispatch(setLoading(true));
    try {
      await dispatch(requestAsset(wallet, membership));
      await dispatch(getBackendAssets());
      await dispatch(getClientAssets(wallet));
    } catch (e) {
      console.log(e);
    }
    dispatch(setLoading(false));
  }

  return (
    <ClientWalletComponent>
      <h2>Client wallet (Balance: {assets.length})</h2>
      <div className="wallet-input">
        <TextField label="Client wallet" value={wallet} size="small" onChange={(e: any) => setWallet(e.target.value)}/>
        <Button type="button" onClick={onSetWallet} variant='contained'>Set</Button>
      </div>
      <div className="membership-input">
        <Button type="button" onClick={(e: any) => onRequest(0)} variant='contained'>Membership 0</Button>
        <Button type="button" onClick={(e: any) => onRequest(1)} variant='contained'>Membership 1</Button>
        <Button type="button" onClick={(e: any) => onRequest(2)} variant='contained'>Membership 2</Button>
      </div>
      <div className="asset-container">
        <Grid container spacing={2}>
          {assets.map(asset => (
            <Grid key={asset.image} item md={4}>
              <Asset data={asset} />
            </Grid>
          ))}
        </Grid>
      </div>
    </ClientWalletComponent>
  );
};

export default ClientWallet;

const ClientWalletComponent = styled.div<IProps>`
  display: flex;
  flex-direction: column;

  .wallet-input, .membership-input {
    display: flex;
    button {
      margin: 0 0 0 10px;
      &:first-child {
        margin-left: 0;
      }
    }
  }

  .membership-input {
    margin: 10px 0 0 0;
  }

  .asset-container {
    margin: 20px 0 0 0;
  }
`;
