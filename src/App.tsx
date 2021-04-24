import styles from 'App.module.scss';
import AudioSample from 'components/audio-sample/audio-sample.component';
import Player from 'models/player/Player.model';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { loadAudioBufferUtil } from 'utils/load-audio-buffer.util';

function App() {

  const { context } = useSelector((state: RootState) => state.audioContext);

  const go = async (): Promise<void> => {
    const sources = [
      'samples/Bass.mp3',
      'samples/Drums.mp3',
      'samples/Guitar.mp3',
      'samples/Hammond.mp3',
      'samples/Vocals.mp3'
    ];
    const audioBuffers = await Promise.all(sources.map(async sourceUrl => {
      return await loadAudioBufferUtil({ context, sourceUrl });
    }));
    audioBuffers.forEach((buffer, idx) => {
      const player = new Player(context, buffer);
      player.play();
    });
  };

  return (
    <div className={styles.App}>
      <button onClick={go}>GO</button>
      <AudioSample sourceUrl={'samples/Bass.mp3'}/>
      <AudioSample sourceUrl={'samples/Guitar.mp3'}/>
      <AudioSample sourceUrl={'samples/Vocals.mp3'}/>
    </div>
  );
}

export default App;
