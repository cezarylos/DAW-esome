import classNames from 'classnames';
import React, { CSSProperties, MutableRefObject, ReactElement, useCallback, useMemo, useRef } from 'react';

import { config } from 'app/_config/config';
import PlayButton from 'app/components/play-button/play-button.component';
import usePlaybackControllerEncapsulation from 'app/components/playback-controller/playback-controller-encapsulation.hook';
import styles from 'app/components/playback-controller/playback-controller.module.scss';
import { PlayerEventsEnum } from 'app/enums/player-events.enum';
import { useOnTrackScroll } from 'app/hooks/on-track-scroll.hook';
import TrackModel from 'app/models/track/track.model';
import { parseSecondsToMinutesAndSeconds } from 'app/utils/parse-seconds-to-mintes-and-seconds';

const PlaybackController = (): ReactElement => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const onScroll = useOnTrackScroll(containerRef);

  const ref = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<MutableRefObject<NodeJS.Timeout>>();

  const {
    isPlaying,
    setIsPlaying,
    linesCount,
    timerPosition,
    setTimerPosition,
    trackModels
  } = usePlaybackControllerEncapsulation(containerRef);

  const prepareTimer = useCallback((): NodeJS.Timeout => {
    let timerValue = timerPosition;
    return setInterval((): void => {
      timerValue += 1 / 10;
      setTimerPosition(timerValue);
    }, 100);
  }, [timerPosition, setTimerPosition]);

  const isPlayButtonDisabled = useMemo((): boolean => {
    return !trackModels.length || trackModels.every((trackModel: TrackModel) => !trackModel.samples.length);
  }, [trackModels]);

  const resetTimer = useCallback(
    (isPause?: boolean): void => {
      clearInterval((timerRef.current as unknown) as NodeJS.Timeout);
      if (isPause) {
        setIsPlaying(false);
        return;
      }
      setTimerPosition(0);
    },
    [setIsPlaying, setTimerPosition]
  );

  const play = useCallback((): void => {
    let currentlyPlaying = [] as string[];
    ((timerRef.current as unknown) as NodeJS.Timeout) = prepareTimer();

    trackModels.forEach((trackModel: TrackModel) => {
      const listener = ({ isPlaying }: { isPlaying: boolean }): void => {
        if (isPlaying) {
          setIsPlaying(true);
          return;
        }
        currentlyPlaying = currentlyPlaying.filter(id => trackModel.id !== id);
        trackModel.removeListener(PlayerEventsEnum.IS_PLAYING, listener);
        if (currentlyPlaying.length) {
          return;
        }
        setIsPlaying(false);
        resetTimer(true);
      };
      if (!trackModel.samples.length) {
        return;
      }
      trackModel.addListener(PlayerEventsEnum.IS_PLAYING, listener);
      trackModel.play(timerPosition);
      currentlyPlaying = [...currentlyPlaying, trackModel.id];
    });
  }, [trackModels, prepareTimer, timerPosition, setIsPlaying, resetTimer]);

  const stop = useCallback(
    (isPause?: boolean): void => {
      resetTimer(isPause);
      trackModels.forEach((trackModel: TrackModel) => trackModel.stop());
    },
    [trackModels, resetTimer]
  );

  const timeLabel = useMemo((): string => parseSecondsToMinutesAndSeconds(timerPosition), [timerPosition]);

  return (
    <div className={styles.container}>
      <div className={styles.options}>
        <PlayButton
          isPreview
          isDisabled={isPlayButtonDisabled}
          className={styles.playButton}
          onClick={(): void => (isPlaying ? stop(true) : play())}
          isPlaying={isPlaying}
          isPause
        />
        <PlayButton isPreview isDisabled={isPlayButtonDisabled} onClick={(): void => stop()} isPlaying />
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
            style={
              {
                '--duration': config.duration,
                '--width': config.width
              } as CSSProperties
            }
            className={classNames(
              styles.tick,
              isPlaying && styles.animatedTick,
              !isPlaying && !timerPosition && styles.animationStopped
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default PlaybackController;
