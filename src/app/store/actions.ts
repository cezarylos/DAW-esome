import { createAsyncThunk } from '@reduxjs/toolkit';

import { SavedTrackInterface } from 'app/components/saved-track/saved-track.interface';
import { StorageService } from 'app/services/storage.service';

export const saveTrack = createAsyncThunk(
  'tracks/saveTrack',
  (track: SavedTrackInterface): SavedTrackInterface => {
    const storageService = StorageService.getInstance();
    storageService.saveTrack(track);
    return track;
  }
);

export const getSavedTracks = createAsyncThunk('tracks/getSavedTracks', (): SavedTrackInterface[] => {
  const storageService = StorageService.getInstance();
  return storageService.getTracks() as SavedTrackInterface[];
});

export const removeSavedTrack = createAsyncThunk('tracks/removeSavedTrack', (trackId: string):
  | SavedTrackInterface[]
  | void => {
  const storageService = StorageService.getInstance();
  const tracks = storageService.getTracks();
  if (!tracks) {
    return;
  }
  const updatedTracks = tracks.filter((track: SavedTrackInterface) => track.id !== trackId);
  storageService.setTracks(updatedTracks);
  return updatedTracks;
});
