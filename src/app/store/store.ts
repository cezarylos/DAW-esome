import { configureStore } from '@reduxjs/toolkit';

import { tracks } from 'app/store/slices/tracks.slice';

const store = configureStore({
  reducer: {
    tracks: tracks.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
