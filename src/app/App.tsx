import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import styles from 'app/App.module.scss';
import Player from 'app/models/player/Player.model';
import Navbar from 'app/views/navbar/navbar.component';

import { RootState } from 'app/store/store';
import { loadAudioBufferUtil } from 'app/utils/load-audio-buffer.util';

const App = (): ReactElement => {

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
    <div className={styles.App} onClick={go}>
      <Navbar/>
    </div>
  );
}

export default App;
