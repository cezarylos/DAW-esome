import { configureStore } from '@reduxjs/toolkit';

import { playbackController } from 'app/store/slices/playback-controller.slice';
import { tracks } from 'app/store/slices/tracks.slice';

const store = configureStore({
  reducer: {
    playbackController: playbackController.reducer,
    tracks: tracks.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
