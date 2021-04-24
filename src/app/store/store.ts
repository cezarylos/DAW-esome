import { configureStore } from '@reduxjs/toolkit'
import { audioContext } from 'app/store/slices/audio-context.slice';
import { playbackController } from 'app/store/slices/playback-controller.slice';

const store =  configureStore({
  reducer: {
    audioContext: audioContext.reducer,
    playbackController: playbackController.reducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export default store;
