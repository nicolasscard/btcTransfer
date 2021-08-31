import {
  MOVEMENT_LOADING,
  CREATE_MOVEMENT_SUCCESS,
  CREATE_MOVEMENT_FAIL,
  RESET
} from './types';

import { Movement } from './model';

export type MovementState = {
  movements: Movement[];
  lastMovementIdAvailable: number;

  movementError: string;
  movementLoading: boolean;
  createMovementSuccess: boolean;
}

const initialState: MovementState = {
  movements: [],
  lastMovementIdAvailable: 0,

  movementError: '',
  movementLoading: false,
  createMovementSuccess: false
};

const movementReducer = (
  state: MovementState = initialState,
  action: {type: string; payload: any},
) => {
  const {type} = action;

  switch (type) {
    case MOVEMENT_LOADING:
      console.log('redux >> loading');
      return {
        ...state,
        movementLoading: true,
        movementError: '',
        createMovementSuccess: false,       
      };
    case CREATE_MOVEMENT_SUCCESS:
      return {
        ...state,
        movements: action.payload,
        lastMovementIdAvailable: state.lastMovementIdAvailable + 1,
        movementLoading: false,
        movementError: '',
        createMovementSuccess: true,     
      };
    case CREATE_MOVEMENT_FAIL:
      return {
        ...state,
        movementLoading: false,
        movementError: action.payload,
        createMovementSuccess: false,  
      };
      case RESET:
        return {
          ...initialState
        };
    default:
      return state;
  }
};

export default movementReducer;
