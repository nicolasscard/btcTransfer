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
      console.log('CREATE_MOVEMENT_SUCCESS')
      console.log(action.payload)
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
        movements: action.payload.movements,
        lastMovementIdAvailable: state.lastMovementIdAvailable + 1,
        movementError: action.payload.error,
        movementLoading: false,
        createMovementSuccess: true,  
      };
      case RESET:
        return {
          ...state,
          movementError: '',
          movementLoading: false,
          createMovementSuccess: false
        };
    default:
      return state;
  }
};

export default movementReducer;
