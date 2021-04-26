import { TIMELINE_SCALE } from 'app/consts/timeline-scale';
import Player from 'app/models/player/Player.model';
import { RootState } from 'app/store/store';
import React, { ReactElement, useState } from 'react';

import Arranger from 'app/components/arranger/arranger.component';
import { AudioTrackSampleComponentInterface } from 'app/components/audio-track-sample/audio-track-sample.component';
import styles from 'app/components/audio-track/audio-track.module.scss';
import PlayButton from 'app/components/play-button/play-button.component';
import { useSelector } from 'react-redux';

const AudioTrack = (): ReactElement => {
  const { context } = useSelector((state: RootState) => state.audioContext);

  const [samples, setSamples] = useState<AudioTrackSampleComponentInterface[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = (): void => {
    setIsPlaying(true);
    samples.forEach(({ audioBuffer, offsetX }) => {
      const player = new Player(audioBuffer, context);
      player.play((offsetX || 0) / TIMELINE_SCALE);
      player.on('ended', () => console.log(123));
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.options}>
        <PlayButton onClick={() => play()} isPlaying={isPlaying}/>
      </div>
      <Arranger samples={samples} setSamples={setSamples}/>
    </div>
  );
};

export default AudioTrack;
