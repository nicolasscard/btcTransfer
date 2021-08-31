import {
  RATES_LOADING,
  GET_BTC_PRICE_SUCCESS,
  GET_BTC_PRICE_FAIL,
  GET_USD_PRICE_SUCCESS,
  GET_USD_PRICE_FAIL,
  GET_FASTER_FEE_SUCCESS,
  GET_FASTER_FEE_FAIL,
} from './types';

export type RatesState = {
  BTCprice: number;
  USDprice: number;
  fasterFee: number;

  ratesLoading: boolean;
  ratesError: string;
  getBTCpriceSuccess: boolean;
  getUSDpriceSuccess: boolean;
  getFasterFeeSuccess: boolean;
  
}

const initialState: RatesState = {
  BTCprice: 0,
  USDprice: 0,
  fasterFee: 0,

  ratesError: '',
  ratesLoading: false,
  getBTCpriceSuccess: false,
  getUSDpriceSuccess: false,
  getFasterFeeSuccess: false,

};

const ratesReducer = (
  state: RatesState = initialState,
  action: {type: string; payload: any},
) => {
  const {type} = action;

  switch (type) {
    case RATES_LOADING:
      return {
        ...state,
        ratesLoading: true,
        ratesError: '',
        getBTCpriceSuccess: false,       
        getFasterFeeSuccess: false,       
      };
    case GET_BTC_PRICE_SUCCESS:
      return {
        ...state,
        BTCprice: action.payload,
        ratesLoading: false,
        ratesError: '',
        getBTCpriceSuccess: true,     
      };
    case GET_BTC_PRICE_FAIL:
      return {
        ...state,
        ratesLoading: false,
        ratesError: action.payload,
        getBTCpriceSuccess: false,  
      };
    case GET_USD_PRICE_SUCCESS:
      return {
        ...state,
        USDprice: action.payload,
        ratesLoading: false,
        ratesError: '',
        getUSDpriceSuccess: true,     
      };
    case GET_USD_PRICE_FAIL:
      return {
        ...state,
        ratesLoading: false,
        ratesError: action.payload,
        getUSDpriceSuccess: false,  
      };
    case GET_FASTER_FEE_SUCCESS:
      return {
        ...state,
        fasterFee: action.payload,
        ratesLoading: false,
        ratesError: '',
        getFasterFeeSuccess: true,     
      };
    case GET_FASTER_FEE_FAIL:
      return {
        ...state,
        ratesLoading: false,
        ratesError: action.payload,
        getFasterFeeSuccess: false,  
      };
    default:
      return state;
  }
};

export default ratesReducer;
