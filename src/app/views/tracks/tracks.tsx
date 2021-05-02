import React, { ReactElement, useCallback, useRef, useState } from 'react';
import { v4 } from 'uuid';

import ActionButton from 'app/components/action-button/action-button.component';
import PlayButton from 'app/components/play-button/play-button.component';
import Track from 'app/components/track/track.component';
import TrackModel from 'app/models/track/track.model';
import styles from 'app/views/tracks/tracks.module.scss';

const Tracks = (): ReactElement => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [tracks, setTracks] = useState([v4()]);
  const [trackInstances, setTrackInstances] = useState<TrackModel[]>([]);

  const onAddTrack = (): void => {
    setTracks([...tracks, v4()]);
    const element = ref.current;
    if (!element) {
      return;
    }
    const scrollToBottom = (): void => {
      element.scroll({
        top: element.scrollHeight,
        behavior: 'smooth'
      });
    };
    setTimeout(scrollToBottom);
  };

  const onTrackRemove = (id: string): (() => void) => (): void => {
    const updatedTracks = tracks.filter(trackId => trackId !== id);
    setTracks(updatedTracks);
  };

  const getTrackInstance = useCallback(
    (trackInstance: TrackModel): void => {
      setTrackInstances([...trackInstances, trackInstance]);
    },
    [tracks]
  );

  const play = (): void => {
    trackInstances.forEach(track => track.play());
  };

  return (
    <div className={styles.container}>
      {/*<PlayButton onClick={play}/>*/}
      <div ref={ref} className={styles.tracks}>
        {tracks.map(trackId => (
          <Track key={trackId} onTrackRemove={onTrackRemove(trackId)} getTrackInstance={getTrackInstance} />
        ))}
      </div>
      <ActionButton label={'Add Track'} onClick={onAddTrack} className={styles.addTrackButton} />
    </div>
  );
};
export default Tracks;
