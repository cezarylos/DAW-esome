import classNames from 'classnames';
import React, { ReactElement, useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';

import ActionButton from 'app/components/action-button/action-button.component';
import Arranger from 'app/components/arranger/arranger.component';
import PlayButton from 'app/components/play-button/play-button.component';
import RemoveButton from 'app/components/remove-button/remove-button.component';
import { SavedTrackInterface } from 'app/components/saved-track/saved-track.interface';
import { TrackPropsInterface } from 'app/components/track/track.interface';
import styles from 'app/components/track/track.module.scss';
import { AppAudioContext } from 'app/context/audio.context';
import { PlayerEventsEnum } from 'app/enums/player-events.enum';
import { useOnTrackScroll } from 'app/hooks/on-track-scroll.hook';
import { TrackSampleInterface } from 'app/interfaces';
import TrackModel from 'app/models/track/track.model';
import { saveTrack } from 'app/store/actions/tracks.actions';
import { addTrackModel, removeTrackModel, selectSavedTracks } from 'app/store/slices/tracks.slice';

const Track = ({ onTrackRemove }: TrackPropsInterface): ReactElement => {
  const context = useContext(AppAudioContext);
  const savedTracks = useSelector(selectSavedTracks);
  const dispatch = useDispatch();

  const ref = useRef<HTMLDivElement | null>(null);
  const onScroll = useOnTrackScroll(ref);

  const [samples, setSamples] = useState<TrackSampleInterface[]>([]);
  const [track, setTrack] = useState<TrackModel>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [trackName, setTrackName] = useState('');

  useEffect((): void => {
    if (track) {
      track.stop();
      dispatch(removeTrackModel(track.id));
    }
    const trackInstance = new TrackModel(samples, context);
    trackInstance.addListener(PlayerEventsEnum.IS_PLAYING, ({ isPlaying }) => setIsPlaying(isPlaying));
    setTrack(trackInstance);
    dispatch(addTrackModel(trackInstance));
    //eslint-disable-next-line
  }, [samples, context, dispatch]);

  useEffect((): (() => void) => {
    return (): void => {
      if (!track) {
        return;
      }
      track.removeAllListeners();
      dispatch(removeTrackModel(track.id));
    };
  }, [track, dispatch]);

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
    } as SavedTrackInterface;
    dispatch(saveTrack(trackToSave));
  };

  const onMuteToggle = (): void => {
    track?.toggleMute();
    setIsMuted(!isMuted);
  };

  return (
    <div className={styles.container}>
      <RemoveButton onClick={onTrackRemove} className={styles.removeTrackButton} isWhiteIcon />
      <div className={styles.options}>
        <input
          onChange={event => setTrackName(event.target.value)}
          value={trackName}
          placeholder={'Track Name'}
          className={styles.trackName}
        />
        <ActionButton className={styles.saveButton} label={'Save'} onClick={onTrackSave} isDisabled={!samples.length} />
        <PlayButton className={styles.playButton} onClick={(): void => track?.play()} isPlaying={isPlaying} />
        <ActionButton
          className={classNames(styles.muteButton, isMuted && styles.isMuted)}
          label={'Mute'}
          onClick={onMuteToggle}
        />
      </div>
      <div ref={ref} onScroll={onScroll} className={classNames(styles.arrangerContainer, isMuted && styles.trackMuted)}>
        {!samples.length && <span className={styles.placeholder}>Drag & drop samples here</span>}
        <Arranger samples={samples} setSamples={setSamples} />
      </div>
    </div>
  );
};

export default Track;
