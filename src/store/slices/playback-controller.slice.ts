import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const playbackController = createSlice({
  name: 'audioController',
  initialState: {
    isMainTrackPlaying: false,
    isStoppedAllSounds: false
  },
  reducers: {
    setIsMainTrackPlaying: (state, action: PayloadAction<boolean>): void => {
      state.isMainTrackPlaying = action.payload;
    },
    setIsStoppedAllSound: (state): void => {
      state.isStoppedAllSounds = true;
    }
  }
})

export const { setIsMainTrackPlaying } = playbackController.actions

export default playbackController.reducer
