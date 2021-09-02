
import { users } from './model';
import { UserData } from './model';

import {
  USER_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  UPDATE_USERS_SUCCESS
} from './types';

export type UserState = {
  loggedUser: UserData | null;
  users: UserData[];

  userError: string;
  userLoading: boolean;
  userSuccess: boolean;
}

const initialState: UserState = {
  users: users,
  loggedUser: null,

  userError: '',
  userLoading: false,
  userSuccess: false
};

const userReducer = (
  state: UserState = initialState,
  action: {type: string; payload: any},
) => {
  const {type} = action;

  switch (type) {
    case USER_LOADING:
      return {
        ...state,
        userLoading: true,
        userError: '',
        userSuccess: false,       
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedUser: action.payload,
        userLoading: false,
        userError: '',
        userSuccess: true,     
      };
    case LOGIN_FAIL:
      return {
        ...state,
        userLoading: false,
        userError: action.payload,
        userSuccess: false,  
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggedUser: null,
        userLoading: false,
        userError: '',
        userSuccess: false,     
      };    
    case UPDATE_USERS_SUCCESS:
      return {
        ...state,
       users: action.payload.users, 
       loggedUser: action.payload.loggedUser, 
      };
    default:
      return state;
  }
};

export default userReducer;
