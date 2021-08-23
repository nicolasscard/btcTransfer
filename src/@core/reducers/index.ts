
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './user/reducer';

const userPersistConfig = {
    key: 'userReducer',
    storage: AsyncStorage,
    whitelist: [], // only persist all state here
    // blacklist: [
    //   // don't persist all state here
    //   'mail',
    //   'password',
    //   'userLoading',
    //   'userError'
    // ],
  };

  const formPersistConfig = {
    key: 'formReducer',
    storage: AsyncStorage,
    whitelist: [], // only persist all state here
    // blacklist: [
    //   // don't persist all state here
    //   'touched',
    //   'error',
    //   'warning',
    //   'values',
    //   ''
    //   // 'password',
    // ],
  };

const rootReducer = combineReducers({
    // form: formReducer,
    form: persistReducer(formPersistConfig, formReducer),
    user: persistReducer(userPersistConfig, userReducer)
  });


export {rootReducer};
