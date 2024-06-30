import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
  id: number
}

const initialState: CounterState = {
  id: 0,
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    storeID: (state, action) => {
        state.id = action.payload
    }
  },
})

export const { storeID } = userSlice.actions

export default userSlice.reducer