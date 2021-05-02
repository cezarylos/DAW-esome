import { configureStore } from '@reduxjs/toolkit';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

import { tracks } from 'app/store/slices/tracks.slice';

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
});

const store = configureStore({
  middleware: customizedMiddleware,
  reducer: {
    tracks: tracks.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
