
import {Dispatch} from 'redux';
import { useDispatch, useSelector, connect, ConnectedProps } from 'react-redux';
import {
  USER_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from './types';

import { UserState } from './reducer';

//Call ProfileManager to get confirm user data
export const login = (user: UserState) => {
  console.log('Login Action>> login >> user');
  console.log(user);
  return (dispatch: Dispatch) => {
    dispatch({type: USER_LOADING});

    if (false) {
      dispatch({type: LOGIN_SUCCESS, payload: user});
    }
    else {
      fail(dispatch, {message: 'Hubo un error inesperado'}, 'login', LOGIN_FAIL);
    }
    // profileManager.getUserData(
    //   (response: any) => {
    //     if (response.success) {
    //       dispatch({type: GET_CONFIRM_DATA_SUCCESS, payload: response.data});
    //     } else {
    //       fail(
    //         dispatch,
    //         {message: response.message},
    //         'getUserData',
    //         GET_CONFIRM_DATA_FAIL,
    //       );
    //     }
    //   },
    //   (error) => {
    //     fail(dispatch, error, 'getUserData', GET_CONFIRM_DATA_FAIL);
    //   },
    // );
  };
};

export const fail = (
  dispatch: any,
  error: any,
  method: string,
  type: string,
) => {
  console.log('Error in ' + method + ': ', error);
  if (error.message.trim() != '') {
    dispatch({type, payload: error.message});
  } else {
    dispatch({type, payload: {error: 'Unexpected error'}});
  }
};
