import api from 'utils/api';
import config, { actionTypes } from 'utils/config';
import Web3 from 'web3';
import contractAbi from 'contracts/ATNFT.json';
import contractConfig from 'contracts/config.json';
import axios from 'axios';

const getOwnedTokens = (addr: string) => {
  return new Promise((resolve, reject) => {
    const web3 = new Web3(config.rpcUrl);
    const contract = new web3.eth.Contract(contractAbi as any, contractConfig.contractAddress);
    contract.methods.ownedTokens(addr).call().then(async (res: any) => {
      console.log(res);
      const assets = [] as IAsset[];
      for (let i = 0; i < res.length; i++) {
        try {
          const res1 = await axios.get(config.baseUri + String(res[i]));
          assets.push(res1.data as IAsset);
        } catch (ex) {
          console.log(ex);
        }
      }
      resolve(assets);
    }, (err: any) => {
      reject(err);
    }).catch((reason: any) => {
      reject(reason);
    });
  });
}

export const getBackendAssets = () => (dispatch: any) => {
  return new Promise((resolve, reject) => {
    getOwnedTokens(contractConfig.deployer).then((res: any) => {
      dispatch({
        type: actionTypes.GET_BACKEND_ASSETS,
        payload: res
      });
      resolve(res);
    }, (err: any) => {
      reject(err);
    });
  });
};

export const getClientAssets = (addr: string) => (dispatch: any) => {
  return new Promise((resolve, reject) => {
    getOwnedTokens(addr).then((res: any) => {
      dispatch({
        type: actionTypes.GET_CLIENT_ASSETS,
        payload: res
      });
      resolve(res);
    }, (err: any) => {
      reject(err);
    });
  });
};

export const requestAsset = (address: string, membership: number) => (dispatch: any) => {
  return new Promise((resolve, reject) => {
    api.post('/request-asset', {
      address,
      membership
    }).then((res: any) => {
      if (res.data.tokenId !== undefined)
      {
        dispatch({
          type: actionTypes.RECEIVED_ASSET,
          payload: res.data
        });
        resolve(res);
      } else if (res.data.msg) {
        alert(res.data.msg);
        reject(res);
      }
    }, (err: any) => {
      reject(err);
    }).catch((reason: any) => {
      reject(reason);
    });
  });
};

export const setCurrentWallet = (address: string) => ({
  type: actionTypes.SET_USER_ADDRESS,
  payload: address
});
