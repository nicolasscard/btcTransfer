import {
  USER_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from './types';

export type UserState = {
  mail: string;
  password: string;
  userError: string;
  userLoading: boolean;
}

const initialState: UserState = {
  mail: '',
  password: '',
  userError: '',
  userLoading: false
};

const userReducer = (
  state: UserState = initialState,
  action: {type: string; payload: any},
) => {
  const {type} = action;

  switch (type) {
    case USER_LOADING:
      console.log('loading...')
      return {
        ...state,
        userLoading: true,
        userError: '',       
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        mail: action.payload.mail,
        password: action.payload.password,
        userLoading: false,
        userError: '',     
      };
    case LOGIN_FAIL:
      return {
        ...state,
        userLoading: false,
        userError: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
