import { createSlice, PayloadAction, createAsyncThunk, SerializedError } from '@reduxjs/toolkit'

export interface account {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface accountState {
  account: account;
  loading: boolean;
  error: SerializedError | undefined;
}

const initialState: accountState = {
  account: {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  },
  loading: false,
  error: undefined,
}

// function to simulate ramdom seconds to wait after submit
// also simulate the success or failure
const awaiting: (values: account) => Promise<any> = async () => {
  const ramdomTimer: number = Math.random() * 5; 
  const ramdomResolve: number = Math.random() * 2; 

  if (ramdomResolve > 1) {
    return new Promise( (resolve, reject) => setTimeout(resolve, ramdomTimer * 1000) );
  }
  else {
    return new Promise( (resolve, reject) => setTimeout(reject, ramdomTimer * 1000) );
  }
}

export const asyncSaveAccount = createAsyncThunk(
  'asyncSaveAccount',
  async (values: account) => {
     const promise: any = await awaiting(values);
    return values;
  }
);

// redux toolkit form to manipulate app state usign Slice
export const accountSlice = createSlice({
  name: 'accountState',
  initialState,
  reducers: { // Sync actions
    saveAccount: (state, action: PayloadAction<accountState>) => {
      console.log('accountSlice >> saveAccount >> payload');
      console.log(action.payload);
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.account = action.payload.account;
      state.loading = false;
    },
  },
  extraReducers: (builder) => { // Async actions
    // Add reducers for additional action types here, and handle loading state as needed
    console.log('accountSlice >> extraReducers >> asyncSaveAccount >> payload');
    builder
      .addCase(asyncSaveAccount.pending, (state, action) => { //pending
        state.loading = true;
        state.error = undefined;
      })
      .addCase(asyncSaveAccount.fulfilled, (state, action) => { //success
        console.log(action.payload);
        state.account = action.payload;
        
        state.loading = false;
        state.error = undefined;
      })
      .addCase(asyncSaveAccount.rejected, (state, action) => { //rejected
        state.loading = false;
        state.error = action.error;        
      })
  },
})

// Action creators are generated for each case reducer function
export const {  saveAccount } = accountSlice.actions;

export default accountSlice.reducer;