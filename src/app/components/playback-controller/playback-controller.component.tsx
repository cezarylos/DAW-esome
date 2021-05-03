import React, { MutableRefObject, ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { config } from 'app/_config/config';
import PlayButton from 'app/components/play-button/play-button.component';
import styles from 'app/components/playback-controller/playback-controller.module.scss';
import { PlayerEventsEnum } from 'app/enums/player-events.enum';
import { useOnTrackScroll } from 'app/hooks/on-track-scroll.hook';
import { TrackContainerInterface } from 'app/interfaces';
import TrackModel from 'app/models/track/track.model';
import { addTrackContainer, selectTrackModels } from 'app/store/slices/tracks.slice';
import { parseSecondsToMinutesAndSeconds } from 'app/utils/parse-seconds-to-mintes-and-seconds';

const PlaybackController = (): ReactElement => {
  const dispatch = useDispatch();
  const trackModels = useSelector(selectTrackModels);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const onScroll = useOnTrackScroll(containerRef);

  const ref = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<MutableRefObject<NodeJS.Timeout>>();

  const [isPlaying, setIsPlaying] = useState(false);
  const [linesCount, setLinesCount] = useState<number[]>([]);
  const [timerPosition, setTimerPosition] = useState<number>(0);

  useEffect((): void => {
    const countArray = Array.from(Array(config.duration).keys());
    setLinesCount(countArray);
    const container = { parentElement: containerRef.current } as TrackContainerInterface;
    dispatch(addTrackContainer(container));
  }, [dispatch]);

  const prepareTimer = useCallback((): NodeJS.Timeout => {
    let timerValue = 0;
    return setInterval(() => {
      timerValue += 1 / 100;
      setTimerPosition(timerValue);
    }, 10);
  }, []);

  const isPlayButtonDisabled = useMemo((): boolean => {
    return !trackModels.length || trackModels.every((trackModel: TrackModel) => !trackModel.samples.length);
  }, [trackModels]);

  const play = useCallback((): void => {
    let currentlyPlaying = [] as string[];
    ((timerRef.current as unknown) as NodeJS.Timeout) = prepareTimer();
    setIsPlaying(true);
    trackModels.forEach((trackModel: TrackModel) => {
      const listener = ({ isPlaying }: { isPlaying: boolean }): void => {
        if (isPlaying) {
          return;
        }
        currentlyPlaying = currentlyPlaying.filter(id => trackModel.id !== id);
        trackModel.removeListener(PlayerEventsEnum.IS_PLAYING, listener);
        if (currentlyPlaying.length) {
          return;
        }
        setIsPlaying(false);
        resetTimer();
      };
      if (!trackModel.samples.length) {
        return;
      }
      trackModel.addListener(PlayerEventsEnum.IS_PLAYING, listener);
      trackModel.play();
      currentlyPlaying = [...currentlyPlaying, trackModel.id];
    });
  }, [trackModels, prepareTimer]);

  const stop = useCallback((): void => {
    resetTimer();
    trackModels.forEach((trackModel: TrackModel) => trackModel.stop());
  }, [trackModels]);

  const resetTimer = (): void => {
    clearInterval((timerRef.current as unknown) as NodeJS.Timeout);
    setTimerPosition(0);
  };

  useEffect(
    (): (() => void) => () => {
      return (): void => {
        trackModels.forEach((trackModel: TrackModel) => trackModel.removeAllListeners());
      };
    },
    [trackModels]
  );

  const timeLabel = useMemo((): string => parseSecondsToMinutesAndSeconds(timerPosition), [timerPosition]);

  return (
    <div className={styles.container}>
      <div className={styles.options}>
        <PlayButton
          isPreview
          isDisabled={isPlayButtonDisabled}
          className={styles.playButton}
          onClick={isPlaying ? stop : play}
          isPlaying={isPlaying}
        />
        <span className={styles.trackName}>{timeLabel}</span>
      </div>
      <div ref={containerRef} onScroll={onScroll} className={styles.timelineContainer}>
        <div ref={ref} className={styles.timeline} style={{ width: config.width }}>
          <div className={styles.countContainer} />
          {linesCount.map(count => (
            <div key={count}>
              <span className={styles.count} style={{ left: count * config.timelineScale }}>
                {parseSecondsToMinutesAndSeconds(count)}
              </span>
              <div className={styles.verticalLine} style={{ left: count * config.timelineScale }} />
            </div>
          ))}
          <div
            className={styles.timer}
            style={{ transform: `translate3d(${timerPosition * config.timelineScale}px, 0, 0)` }}
          />
        </div>
      </div>
    </div>
  );
};

export default PlaybackController;
