import { createSlice } from '@reduxjs/toolkit'

export const audioContext = createSlice({
  name: 'audioContext',
  initialState: {
    context: new AudioContext()
  },
  reducers: {}
})

export default audioContext.reducer
