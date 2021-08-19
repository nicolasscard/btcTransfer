import {configureStore} from '@reduxjs/toolkit';
import { reducer as formReducer } from 'redux-form';
import accountSlice from '@screens/CreateAccount/AccountSlice';

export const store = configureStore({
  reducer: {
    form: formReducer,
    account: accountSlice
  },
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch