import { configureStore } from '@reduxjs/toolkit'
import { playbackController } from 'app/store/slices/playback-controller.slice';
import { trackContainer } from 'app/store/slices/track-container.slice';

const store =  configureStore({
  reducer: {
    playbackController: playbackController.reducer,
    trackContainer: trackContainer.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export default store;
