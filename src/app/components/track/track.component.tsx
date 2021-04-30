import React, { ReactElement, useContext, useEffect, useState } from 'react';

import Arranger from 'app/components/arranger/arranger.component';
import PlayButton from 'app/components/play-button/play-button.component';
import styles from 'app/components/track/track.module.scss';
import { AppAudioContext } from 'app/context/audio.context';
import { PlayerEventsEnum } from 'app/enums/player-events.enum';
import { TrackSampleInterface } from 'app/interfaces';
import TrackModel from 'app/models/track/Track.model';

const Track = (): ReactElement => {
  const context = useContext(AppAudioContext);

  const [samples, setSamples] = useState<TrackSampleInterface[]>([]);
  const [track, setTrack] = useState<TrackModel>();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect((): void => {
    const trackInstance = new TrackModel(samples, context);
    trackInstance.addListener(PlayerEventsEnum.IS_PLAYING, ({ isPlaying }) =>
      setIsPlaying(isPlaying)
    );
    setTrack(trackInstance);
  }, [samples, context]);

  useEffect((): (() => void) => {
    return (): void => {
      track?.removeAllListeners();
    };
  }, [track]);

  return (
    <div className={styles.container}>
      <div className={styles.options}>
        <PlayButton onClick={() => track?.play()} isPlaying={isPlaying} />
      </div>
      <Arranger samples={samples} setSamples={setSamples} />
    </div>
  );
};

export default Track;
