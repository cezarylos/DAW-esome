import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackContainerInterface } from 'app/interfaces/track-container.interface';

export const trackContainer = createSlice({
  name: 'trackContainer',
  initialState: {
    containers: [] as TrackContainerInterface[]
  },
  reducers: {
    addTrackContainer: (state, action: PayloadAction<TrackContainerInterface>): void => {
      state.containers = [...state.containers, action.payload];
    },
    removeTrackContainer: (state, action: PayloadAction<string>): void => {
      state.containers  = state.containers.filter(container => container.id !== action.payload);
    }
  }
})

export const { addTrackContainer, removeTrackContainer } = trackContainer.actions

export default trackContainer.reducer
