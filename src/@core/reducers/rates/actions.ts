
import {Dispatch} from 'redux';
import {
  RATES_LOADING,
  GET_BTC_PRICE_SUCCESS,
  GET_BTC_PRICE_FAIL,
  GET_USD_PRICE_SUCCESS,
  GET_USD_PRICE_FAIL,
  GET_FASTER_FEE_SUCCESS,
  GET_FASTER_FEE_FAIL,
} from './types';

const ratesUrl = 'https://ripio.com/api/v1/rates/';
const feesUrl = 'https://bitcoinfees.earn.com/api/v1/fees/recommended';
const usdCotizationsUrl = 'https://api.bluelytics.com.ar/v2/latest';

export const getBTCprice = () => {
  return (dispatch: Dispatch) => {
    dispatch({type: RATES_LOADING});

    fetch(ratesUrl)
      .then(response => response.json()).then((data) => {
        if (data) {
          dispatch({ type: GET_BTC_PRICE_SUCCESS, payload: data.rates.USD_BUY });
        }
        else {
          fail(dispatch, {message: 'Unexpected error'}, 'getBTCprice', GET_BTC_PRICE_FAIL);
        };
      })
      .catch((err) => {
        fail(dispatch, {message: err.message}, 'getBTCprice', GET_BTC_PRICE_FAIL);
      });
  };
};

export const getFasterFee = () => {
  return (dispatch: Dispatch) => {
    dispatch({type: RATES_LOADING});

    const fee = getRandomFee();
    dispatch({ type: GET_FASTER_FEE_SUCCESS, payload: fee });
    // fetch(feesUrl)
    //   .then(response => response.json()).then((data) => {
    //     if (data) {
    //       dispatch({ type: GET_FASTER_FEE_SUCCESS, payload: data.fastestFee });
    //     }
    //     else {
    //       fail(dispatch, {message: 'Unexpected error'}, 'getFasterFee', GET_FASTER_FEE_FAIL);
    //     };
    //   })
    //   .catch((err) => {
    //     fail(dispatch, {message: err.message}, 'getFasterFee', GET_FASTER_FEE_FAIL);
    //   });
  };
};

const getRandomFee= () => {
  return (Math.trunc(Math.random() * 10) * 0.00001) + 0.0001;
}

export const getUSDprice = () => {
  return (dispatch: Dispatch) => {
    dispatch({type: RATES_LOADING});

    fetch(usdCotizationsUrl)
      .then(response => response.json()).then((data) => {
        if (data) {
          dispatch({ type: GET_USD_PRICE_SUCCESS, payload: data.blue.value_avg });
        }
        else {
          fail(dispatch, {message: 'Unexpected error'}, 'getUSDprice', GET_USD_PRICE_FAIL);
        };
      })
      .catch((err) => {
        fail(dispatch, {message: err.message}, 'getUSDprice', GET_USD_PRICE_FAIL);
      });
  };
};



export const fail = (dispatch: any, error: any, method: string, type: string) => {
  console.log('Error in ' + method + ': ', error);
  if (error.message.trim() != '') {
    dispatch({type, payload: error.message});
  } else {
    dispatch({type, payload: {error: 'Unexpected error'}});
  }
};
