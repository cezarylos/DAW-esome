import Arranger from 'app/components/arranger/arranger.component';
import styles from 'app/components/audio-track/audio-track.module.scss';
import PlayButton from 'app/components/play-button/play-button.component';
import { AppAudioContext } from 'app/context/audio.context';
import { PlayerEventsEnum } from 'app/enums/player-events.enum';
import { AudioTrackSampleInterface } from 'app/interfaces';
import Track from 'app/models/track/Track.model';
import React, { ReactElement, useContext, useEffect, useState } from 'react';

const AudioTrack = (): ReactElement => {
  const context = useContext(AppAudioContext);

  const [samples, setSamples] = useState<AudioTrackSampleInterface[]>([]);
  const [track, setTrack] = useState<Track>();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect((): void => {
    const trackInstance = new Track(samples, context);
    trackInstance.addListener(PlayerEventsEnum.IS_PLAYING, ({ isPlaying }) => setIsPlaying(isPlaying));
    setTrack(trackInstance);
  }, [samples, context]);

  useEffect((): () => void => {
    return (): void => {
      track?.removeAllListeners();
    }
  }, [track]);

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
