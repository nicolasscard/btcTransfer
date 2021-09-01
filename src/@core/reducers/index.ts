
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './user/reducer';
import ratesReducer from './rates/reducer';
import movementReducer from './movement/reducer';

const userPersistConfig = {
  key: 'userReducer',
  storage: AsyncStorage,
  whitelist: ['loggedUser', 'users'], // only persist all state here
  blacklist: [],
};

const ratesPersistConfig = {
  key: 'ratesReducer',
  storage: AsyncStorage,
  whitelist: [],
  
};

const movementPersistConfig = {
  key: 'movementReducer',
  storage: AsyncStorage,
  whitelist: ['movements'],
};

const formPersistConfig = {
  key: 'formReducer',
  storage: AsyncStorage,
  whitelist: [],
};

const rootReducer = combineReducers({
    // form: formReducer,
    form: persistReducer(formPersistConfig, formReducer),
    user: persistReducer(userPersistConfig, userReducer),
    rates: persistReducer(ratesPersistConfig, ratesReducer),
    movement: persistReducer(movementPersistConfig, movementReducer),
  });


export {rootReducer};
