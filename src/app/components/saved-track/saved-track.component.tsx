import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import PlayButton from 'app/components/play-button/play-button.component';
import RemoveButton from 'app/components/remove-button/remove-button.component';
import { SavedTrackInterface } from 'app/components/saved-track/saved-track.interface';
import styles from 'app/components/saved-track/saved-track.module.scss';
import { loadTrackSamples } from 'app/components/saved-track/saved.track.utils';
import { AppAudioContext } from 'app/context/audio.context';
import { PlayerEventsEnum } from 'app/enums/player-events.enum';
import { TrackSampleInterface } from 'app/interfaces';
import TrackModel from 'app/models/track/track.model';
import { removeSavedTrack } from 'app/store/actions';

const SavedTrack = ({ name, samples, id }: SavedTrackInterface): ReactElement => {
  const context = useContext(AppAudioContext);
  const dispatch = useDispatch();

  const [track, setTrack] = useState<TrackModel>();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect((): void => {
    const loadTrack = async (): Promise<void> => {
      const trackSamples = ((await loadTrackSamples(samples, context)) as TrackSampleInterface[]) || [];
      const trackInstance = new TrackModel(trackSamples, context);
      trackInstance.addListener(PlayerEventsEnum.IS_PLAYING, ({ isPlaying }) => setIsPlaying(isPlaying));
      setTrack(trackInstance);
    };
    loadTrack();
  }, [samples, context]);

  useEffect((): (() => void) => {
    return (): void => {
      track?.removeAllListeners();
    };
  }, [track]);

  const onTrackRemove = (): void => {
    dispatch(removeSavedTrack(id));
  };

  return (
    <div className={styles.container}>
      <PlayButton onClick={() => track?.play()} isPlaying={isPlaying} />
      <span className={styles.trackName}>{name}</span>
      <RemoveButton onClick={onTrackRemove} className={styles.removeButton} />
    </div>
  );
};

export default SavedTrack;
