
import {Dispatch} from 'redux';
import {store} from '@reducers/store';

import {
  USER_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS
} from './types';

export const login = (user: { mail: string, password: string }) => {
  return (dispatch: Dispatch) => {
    dispatch({type: USER_LOADING});
    
    const loggedUser = getUserIndexByCredentials(user.mail, user.password);
    if (loggedUser) {
      dispatch({type: LOGIN_SUCCESS, payload: loggedUser});
    }
    else {
      fail(dispatch, {message: 'Incorrect usre or password.'}, 'login', LOGIN_FAIL);
    }
  };
};

export const logout = () => {
  return (dispatch: Dispatch) => {
    dispatch({type: LOGOUT_SUCCESS});
  };
};

const getUserIndexByCredentials = (mail: string, password: string) => {
  let {users} = store.getState().user;

  for (let i = 0; i < users.length; i++) {
    const element = users[i];
    if (mail == element.mail && password == element.password) {
      return element;
    }
  }
  return null;
}

export const fail = (dispatch: any, error: any, method: string, type: string) => {
  console.log('Error in ' + method + ': ', error);
  if (error.message.trim() != '') {
    dispatch({type, payload: error.message});
  } else {
    dispatch({type, payload: {error: 'Unexpected error'}});
  }
};
