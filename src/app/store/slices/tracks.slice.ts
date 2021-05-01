import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SavedTrackInterface } from 'app/components/saved-track/saved-track.interface';
import { TrackContainerInterface } from 'app/interfaces';
import { saveTrack, getSavedTracks } from 'app/store/actions';
import { RootState } from 'app/store/store';

type SliceState = { containers: TrackContainerInterface[]; savedTracks: any[] };

export const tracks = createSlice({
  name: 'tracks',
  initialState: {
    containers: [] as TrackContainerInterface[],
    savedTracks: [] as SavedTrackInterface[]
  },
  reducers: {
    addTrackContainer: (state: SliceState, { payload }: PayloadAction<TrackContainerInterface>): void => {
      state.containers = [...state.containers, payload];
    },
    removeTrackContainer: (state: SliceState, { payload }: PayloadAction<string>): void => {
      state.containers = state.containers.filter(container => container.id !== payload);
    },
    removeSavedTrack: (state: SliceState, { payload }: PayloadAction<string>): void => {
      state.savedTracks = state.containers.filter(track => track.id !== payload);
    }
  },
  extraReducers: {
    [saveTrack.fulfilled.type]: (state: SliceState, { payload }: PayloadAction<SavedTrackInterface>): void => {
      state.savedTracks = [...state.savedTracks, payload];
    },
    [getSavedTracks.fulfilled.type]: (state: SliceState, { payload }: PayloadAction<SavedTrackInterface[]>): void => {
      state.savedTracks = payload;
    }
  }
});

export const { addTrackContainer, removeTrackContainer, removeSavedTrack } = tracks.actions;
export const selectContainers = (state: RootState) => state.tracks.containers;
export const selectSavedTracks = (state: RootState) => state.tracks.savedTracks;

export default tracks.reducer;
