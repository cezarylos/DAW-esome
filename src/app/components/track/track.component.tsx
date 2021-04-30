import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';

import Arranger from 'app/components/arranger/arranger.component';
import PlayButton from 'app/components/play-button/play-button.component';
import styles from 'app/components/track/track.module.scss';
import { AppAudioContext } from 'app/context/audio.context';
import { PlayerEventsEnum } from 'app/enums/player-events.enum';
import { TrackSampleInterface } from 'app/interfaces';
import TrackModel from 'app/models/track/Track.model';
import { selectSavedTracks } from 'app/store/slices/tracks.slice';
import { saveTrack } from 'app/store/slices/tracks.slice';

const Track = (): ReactElement => {
  const context = useContext(AppAudioContext);
  const savedTracks = useSelector(selectSavedTracks);
  const dispatch = useDispatch();

  const [samples, setSamples] = useState<TrackSampleInterface[]>([]);
  const [track, setTrack] = useState<TrackModel>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackName, setTrackName] = useState('');

  useEffect((): void => {
    const trackInstance = new TrackModel(samples, context);
    trackInstance.addListener(PlayerEventsEnum.IS_PLAYING, ({ isPlaying }) => setIsPlaying(isPlaying));
    setTrack(trackInstance);
  }, [samples, context]);

  useEffect((): (() => void) => {
    return (): void => {
      track?.removeAllListeners();
    };
  }, [track]);

  const onTrackSave = (): void => {
    if (!samples.length) {
      return;
    }
    const samplesToSave = samples.map(({ start, sourceUrl }) => {
      return { start, sourceUrl };
    });
    const trackToSave = {
      name: trackName || `TRACK_${savedTracks.length + 1}`,
      samples: samplesToSave,
      id: v4()
    };
    dispatch(saveTrack(trackToSave));
  };

  return (
    <div className={styles.container}>
      <div className={styles.options}>
        <input
          onChange={event => setTrackName(event.target.value)}
          value={trackName}
          placeholder={'Track Name'}
          className={styles.trackName}
        />
        <button disabled={!samples.length} onClick={onTrackSave} className={styles.saveButton}>
          <span>Save</span>
        </button>
        <PlayButton className={styles.playButton} onClick={() => track?.play()} isPlaying={isPlaying} />
      </div>
      <Arranger samples={samples} setSamples={setSamples} />
    </div>
  );
};

export default Track;
