
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
    
    // create new movement
    let movement: Movement = { 
      movementId: lastMovementIdAvailable,
      originUserId: loggedUser?.userId ?? null,
      destinationUserId: null,
      destinationAddress: btcAddress,
      btcAmount: btcAmount,
      date: new Date(),
      status: Status.Pending,
    }
    
    const duIndex = getUserIndexByAddress(btcAddress, users, loggedUser?.userId);
    if (duIndex) {
      console.log('hay duIndex')
      console.log(duIndex)

      // Update movements
      movement.destinationUserId = users[duIndex].userId;

      
      
      // update destination user balance
      users[duIndex].btcBalance = users[duIndex].btcBalance + btcAmount;
      
      // update origin user balance
      if (loggedUser) {
        loggedUser.btcBalance = loggedUser.btcBalance - btcAmount;
        users[loggedUser.userId].btcBalance = users[loggedUser.userId].btcBalance - btcAmount;

        movement.status = Status.Success;
        movements.push(movement);

        dispatch({type: UPDATE_USERS_SUCCESS, payload: {users, loggedUser}});
        dispatch({type: CREATE_MOVEMENT_SUCCESS, payload: movements});
      }
      else {
        movement.status = Status.Failed;
        movements.push(movement);

        dispatch({type: CREATE_MOVEMENT_FAIL, payload: {movements, error: 'Unexpected error'}});
        // fail(dispatch, {message: 'Unexpected error'}, 'sendBTC', CREATE_MOVEMENT_FAIL);
      }
    }
    else {
      movement.status = Status.Failed;
      movements.push(movement);

      dispatch({type: CREATE_MOVEMENT_FAIL, payload: {movements, error: 'Invalid or non-existent destination address'}});
      // fail(dispatch, {message: 'Non-existent destination address'}, 'sendBTC', CREATE_MOVEMENT_FAIL);
    }
  };
};

const getUserIndexByAddress = (btcAddress: string, users: UserData[], loggedUserId: number | undefined) => {
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    if (user.btcAddress == btcAddress && user.userId != loggedUserId) {   // I can't use my own address
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
