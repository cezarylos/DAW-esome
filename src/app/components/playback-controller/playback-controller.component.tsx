import React, {
  MutableRefObject,
  ReactElement,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { useSelector } from 'react-redux';

import PlayButton from 'app/components/play-button/play-button.component';
import styles from 'app/components/playback-controller/playback-controller.module.scss';
import { TIMELINE_SCALE } from 'app/consts/timeline-scale';
import { PlayerEventsEnum } from 'app/enums/player-events.enum';
import TrackModel from 'app/models/track/track.model';
import { selectTrackModels } from 'app/store/slices/tracks.slice';
import { parseSecondsToMinutesAndSeconds } from 'app/utils/parse-seconds-to-mintes-and-seconds';

const PlaybackController = (): ReactElement => {
  const trackModels = useSelector(selectTrackModels);

  const ref = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<MutableRefObject<NodeJS.Timeout>>();

  const [isPlaying, setIsPlaying] = useState(false);
  const [linesCount, setLinesCount] = useState<number[]>([]);
  const [timerPosition, setTimerPosition] = useState<number>(0);

  useEffect((): void => {
    const width = ref.current?.clientWidth || 0;
    const roundedCount = Math.ceil(width / TIMELINE_SCALE);
    const countArray = Array.from(Array(roundedCount).keys());
    setLinesCount(countArray);
  }, []);

  const prepareTimer = useCallback((): NodeJS.Timeout => {
    let timerValue = 0;
    return setInterval(() => {
      timerValue += 1 / 100;
      setTimerPosition(timerValue);
    }, 10);
  }, []);

  const isPlayButtonDisabled = useMemo((): boolean => {
    return !trackModels.length || trackModels.some((trackModel: TrackModel) => !trackModel.samples.length);
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

  const timeLabel = useMemo((): string => parseSecondsToMinutesAndSeconds(timerPosition, true), [timerPosition]);

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
      <div ref={ref} className={styles.timeline}>
        <div className={styles.countContainer} />
        {linesCount.map(count => (
          <>
            <span className={styles.count} style={{ left: count * TIMELINE_SCALE }}>
              {parseSecondsToMinutesAndSeconds(count, true)}
            </span>
            <div key={count} className={styles.verticalLine} style={{ left: count * TIMELINE_SCALE }} />
          </>
        ))}
        <div className={styles.timer} style={{ transform: `translate3d(${timerPosition * TIMELINE_SCALE}px, 0, 0)` }} />
      </div>
    </div>
  );
};

export default PlaybackController;
