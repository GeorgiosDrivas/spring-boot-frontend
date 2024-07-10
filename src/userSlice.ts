import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  id: number;
  data: {
    firstName?: string;
    lastName?: string;
    title?: string;
    location?: string;
    [key: string]: any;
  };
}

const initialState: UserState = {
  id: 0,
  data: {}
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    storeID: (state, action: PayloadAction<number>) => {
        state.id = action.payload;
    },
    storeData: (state, action: PayloadAction<object>) => {
      state.data = action.payload;
    }
  },
})

export const { storeID, storeData } = userSlice.actions;

export default userSlice.reducer;