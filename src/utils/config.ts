const config = {
  appID: 'NFTy_Meta_Admin',
  apiUrl: (process.env.NODE_ENV === "development" ? 'http://localhost:4000/api' : '/api'),
  whitelabelId: process.env.REACT_APP_KEY || '',
  bytecode: "",
  rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
  baseUri: "https://braindance.mypinata.cloud/ipfs/QmVajyUuJxdpq8fFRb2MkX7SBpcAJ5BxRe4rihkiLucyW2/"
};

console.log("process env: ", process.env);

export const actionTypes = {
  VIEW_STATE_LOADING: 'VIEW_STATE_LOADING',
  GET_BACKEND_ASSETS: 'GET_BACKEND_ASSETS',
  GET_CLIENT_ASSETS: 'GET_CLIENT_ASSETS',
  SET_USER_ADDRESS: 'SET_USER_ADDRESS',
  RECEIVED_ASSET: 'RECEIVED_ASSET'
};

export default config;
