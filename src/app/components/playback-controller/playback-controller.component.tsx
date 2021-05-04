import classNames from 'classnames';
import React, {
  CSSProperties,
  MutableRefObject,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
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

  const prepareTimer = useCallback((): NodeJS.Timeout | any => {
    let timerValue = timerPosition;
    return setInterval((): void => {
      timerValue += 1 / 10;
      setTimerPosition(timerValue);
    }, 100);
  }, [timerPosition]);

  const isPlayButtonDisabled = useMemo((): boolean => {
    return !trackModels.length || trackModels.every((trackModel: TrackModel) => !trackModel.samples.length);
  }, [trackModels]);

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
  }, [trackModels, prepareTimer, timerPosition]);

  const stop = useCallback(
    (isPause?: boolean): void => {
      resetTimer(isPause);
      trackModels.forEach((trackModel: TrackModel) => trackModel.stop());
    },
    [trackModels]
  );

  const resetTimer = (isPause?: boolean): void => {
    clearInterval((timerRef.current as unknown) as NodeJS.Timeout);
    if (isPause) {
      setIsPlaying(false);
      return;
    }
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
