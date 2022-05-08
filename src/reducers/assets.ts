import { actionTypes } from 'utils/config';

const initialState = {
  backendAssets: [] as IAsset[],
  clientAssets: [] as IAsset[],
  currentAddress: ""
};

const reducer = (state = initialState, action: IAction) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_BACKEND_ASSETS: {
      state = { ...state, backendAssets: payload };
      break;
    }

    case actionTypes.GET_CLIENT_ASSETS: {
      state = { ...state, clientAssets: payload };
      break;
    }

    case actionTypes.SET_USER_ADDRESS: {
      state = { ...state, currentAddress: payload };
      break;
    }

    default:
      break;
  }

  return state;
};

export default reducer;
