
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {rootReducer} from './index';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'form'],
  blacklist: ['user', 'form'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export {store, persistor};
