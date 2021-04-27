import Arranger from 'app/components/arranger/arranger.component';
import { AudioTrackSampleComponentInterface } from 'app/components/audio-track-sample/audio-track-sample.component';
import styles from 'app/components/audio-track/audio-track.module.scss';
import PlayButton from 'app/components/play-button/play-button.component';
import { PlayerEventsEnum } from 'app/enums/player-events.enum';
import Track from 'app/models/track/Track.model';
import { RootState } from 'app/store/store';
import React, { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const AudioTrack = (): ReactElement => {
  const { context } = useSelector((state: RootState) => state.audioContext);

  const [samples, setSamples] = useState<AudioTrackSampleComponentInterface[]>([]);
  const [track, setTrack] = useState<Track>();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect((): void => {
    const trackInstance = new Track(samples, context);
    trackInstance.addListener(PlayerEventsEnum.IS_PLAYING, ({ isPlaying }) => setIsPlaying(isPlaying));
    setTrack(trackInstance);
  }, [samples, context]);

  return (
    <div className={styles.container}>
      <div className={styles.options}>
        <PlayButton onClick={() => track?.play()} isPlaying={isPlaying}/>
      </div>
      <Arranger samples={samples} setSamples={setSamples}/>
    </div>
  );
};

export default AudioTrack;
