
import {Dispatch} from 'redux';
import {store} from '@reducers/store';
import {Movement, Status} from './model';

import {
  MOVEMENT_LOADING,
  CREATE_MOVEMENT_SUCCESS,
  CREATE_MOVEMENT_FAIL,
  RESET
} from './types';

import { UPDATE_USERS_SUCCESS } from '../user/types';

import { UserData } from '@reducers/user/model';


export const sendBTC = (btcAddress: string, btcAmount: number ) => {
  return (dispatch: Dispatch) => {
    dispatch({type: MOVEMENT_LOADING});
    
    let {lastMovementIdAvailable, movements} = store.getState().movement;
    let {loggedUser, users} = store.getState().user;
    
    const duIndex = getUserIndexByAddress(btcAddress, users);
    if (duIndex) {
      console.log('hay duIndex')
      console.log(duIndex)
      // Update movements
      const movement: Movement = { 
        movementId: lastMovementIdAvailable,
        originUserId: loggedUser ? loggedUser?.userId : 0,
        destinationUserId: users[duIndex].userId,
        destinationAddress: users[duIndex].btcAddress,
        btcAmount: btcAmount,
        date: new Date(),
        status: Status.Success,
      }
      movements.push(movement);
      
      // update destination user balance
      users[duIndex].btcBalance = users[duIndex].btcBalance + btcAmount;
      
      // update origin user balance
      if (loggedUser) {
        console.log('hay loggedUser')
        console.log(loggedUser)
        const ouIndex = getUserIndexById(loggedUser.userId, users);
        
        console.log('ouIndex')
        console.log(ouIndex)
        if (ouIndex != null) {
          console.log('hay ouIndex')
          console.log(ouIndex)
          users[ouIndex].btcBalance =  users[ouIndex].btcBalance - btcAmount;
          loggedUser.btcBalance = loggedUser.btcBalance - btcAmount;
          console.log('users')
          console.log(users)
          
          dispatch({type: UPDATE_USERS_SUCCESS, payload: {users, loggedUser}});
          dispatch({type: CREATE_MOVEMENT_SUCCESS, payload: movements});
        }
        else {
          fail(dispatch, {message: 'Unexpected error2'}, 'sendBTC', CREATE_MOVEMENT_FAIL);
        }
      }
      else {
        fail(dispatch, {message: 'Unexpected error'}, 'sendBTC', CREATE_MOVEMENT_FAIL);
      }
    }
    else {
      fail(dispatch, {message: 'Non-existent destination address'}, 'sendBTC', CREATE_MOVEMENT_FAIL);
    }
  };
};

const getUserIndexByAddress = (btcAddress: string, users: UserData[]) => {
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    if (user.btcAddress == btcAddress) {
      return i;
    }
  }
  return null;
}

const getUserIndexById = (userId: number, users: UserData[]) => {
  console.log('getUserIndexById')
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    console.log(user.userId)
    console.log(userId)
    console.log('---')
    if (user.userId == userId) {
      console.log('íguales')
      return i;
    }
  }
  return null;
}

export const movementReset = () => {
  return (dispatch: Dispatch) => {
    dispatch({type: RESET});
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
