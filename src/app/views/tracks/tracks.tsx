import React, { ReactElement, useRef, useState } from 'react';
import { v4 } from 'uuid';

import ActionButton from 'app/components/action-button/action-button.component';
import PlaybackController from 'app/components/playback-controller/playback-controller.component';
import Track from 'app/components/track/track.component';
import styles from 'app/views/tracks/tracks.module.scss';

const Tracks = (): ReactElement => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [tracks, setTracks] = useState([v4()]);

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

  return (
    <div className={styles.container}>
      <PlaybackController />
      <div ref={ref} className={styles.tracks}>
        {tracks.map(trackId => (
          <Track key={trackId} onTrackRemove={onTrackRemove(trackId)} />
        ))}
      </div>
      <ActionButton label={'Add Track'} onClick={onAddTrack} className={styles.addTrackButton} />
    </div>
  );
};
export default Tracks;
