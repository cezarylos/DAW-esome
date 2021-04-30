import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TrackContainerInterface } from 'app/interfaces';
import { RootState } from 'app/store/store';

type SliceState = { containers: TrackContainerInterface[]; savedTracks: any[] };

export const tracks = createSlice({
  name: 'tracks',
  initialState: {
    containers: [] as TrackContainerInterface[],
    savedTracks: [] as any[]
  },
  reducers: {
    addTrackContainer: (state: SliceState, { payload }: PayloadAction<TrackContainerInterface>): void => {
      state.containers = [...state.containers, payload];
    },
    removeTrackContainer: (state: SliceState, { payload }: PayloadAction<string>): void => {
      state.containers = state.containers.filter(container => container.id !== payload);
    },
    saveTrack: (state: SliceState, { payload }: PayloadAction<any>): void => {
      state.savedTracks = [...state.savedTracks, payload];
    },
    removeSavedTrack: (state: SliceState, { payload }: PayloadAction<any>): void => {
      state.savedTracks = state.containers.filter(track => track.id !== payload);
    }
  }
});

export const { addTrackContainer, removeTrackContainer, saveTrack, removeSavedTrack } = tracks.actions;
export const selectContainers = (state: RootState) => state.tracks.containers;
export const selectSavedTracks = (state: RootState) => state.tracks.savedTracks;

export default tracks.reducer;
