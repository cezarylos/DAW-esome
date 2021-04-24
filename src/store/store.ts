import { configureStore } from '@reduxjs/toolkit'
import { audioContext } from 'store/slices/audio-context.slice';
import { playbackController } from 'store/slices/playback-controller.slice';

const store =  configureStore({
  reducer: {
    audioContext: audioContext.reducer,
    playbackController: playbackController.reducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export default store;
