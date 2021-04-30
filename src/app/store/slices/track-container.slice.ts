import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TrackContainerInterface } from 'app/interfaces';
import { RootState } from 'app/store/store';

type SliceState = { containers: TrackContainerInterface[] };

export const trackContainer = createSlice({
  name: 'trackContainer',
  initialState: {
    containers: [] as TrackContainerInterface[]
  },
  reducers: {
    addTrackContainer: (
      state: SliceState,
      { payload }: PayloadAction<TrackContainerInterface>
    ): void => {
      state.containers = [...state.containers, payload];
    },
    removeTrackContainer: (state: SliceState, { payload }: PayloadAction<string>): void => {
      state.containers = state.containers.filter(container => container.id !== payload);
    }
  }
});

export const { addTrackContainer, removeTrackContainer } = trackContainer.actions;
export const selectContainers = (state: RootState) => state.trackContainer.containers;

export default trackContainer.reducer;
