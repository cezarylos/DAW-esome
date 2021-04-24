import React from 'react';
import { playSound } from 'utils/playback.utils';
import AudioSample from 'components/audio-sample/audio-sample.component';
import styles from 'App.module.scss';

const audioCtx = new AudioContext();
export const AppAudioContext = React.createContext<AudioContext>(audioCtx);

function App() {

  const onPlay = (start: number = 0) => (audioBuffer: AudioBuffer): void => {
    playSound({ context: audioCtx, audioBuffer, start });
  };

  return (
    <AppAudioContext.Provider value={audioCtx}>
      <div className={styles.App}>
        <AudioSample onPlay={onPlay()} sourceUrl={'samples/Bass.mp3'}/>
        <AudioSample onPlay={onPlay(20)} sourceUrl={'samples/Bass.mp3'}/>
      </div>
    </AppAudioContext.Provider>
  );
}

export default App;
