import React, { ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import PlayButton from 'app/components/play-button/play-button.component';
import styles from 'app/components/playback-controller/playback-controller.module.scss';
import { TIMELINE_SCALE } from 'app/consts/timeline-scale';
import { PlayerEventsEnum } from 'app/enums/player-events.enum';
import TrackModel from 'app/models/track/track.model';
import { selectTrackModels } from 'app/store/slices/tracks.slice';

const PlaybackController = (): ReactElement => {
  const trackModels = useSelector(selectTrackModels);

  const ref = useRef<HTMLDivElement | null>(null);

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

  const play = useCallback((): void => {
    const timer = prepareTimer();
    setTimerPosition(0);
    let currentlyPlaying = [] as string[];
    setIsPlaying(true);
    trackModels.forEach((trackModel: TrackModel) => {
      trackModel.addListener(PlayerEventsEnum.IS_PLAYING, ({ isPlaying }): void => {
        if (isPlaying) {
          return;
        }
        currentlyPlaying = currentlyPlaying.filter(id => trackModel.id !== id);
        if (!currentlyPlaying.length) {
          setIsPlaying(false);
          clearInterval(timer);
          setTimerPosition(0);
        }
      });
      trackModel.play();
      currentlyPlaying = [...currentlyPlaying, trackModel.id];
    });
    // eslint-disable-next-line
  }, [trackModels]);

  useEffect(
    (): (() => void) => () => {
      return (): void => {
        trackModels.forEach((trackModel: TrackModel) => trackModel.removeAllListeners());
      };
    },
    [trackModels]
  );

  const timeLabel = useMemo((): string => `00:${timerPosition.toFixed(0)}`, [timerPosition]);

  return (
    <div className={styles.container}>
      <div className={styles.options}>
        <PlayButton className={styles.playButton} onClick={play} isPlaying={isPlaying} />
        <span className={styles.trackName}>{timeLabel}</span>
      </div>
      <div ref={ref} className={styles.timeline}>
        {linesCount.map(count => (
          <div key={count} className={styles.verticalLine} style={{ left: count * TIMELINE_SCALE }} />
        ))}
        <div className={styles.timer} style={{ left: timerPosition * TIMELINE_SCALE }} />
      </div>
    </div>
  );
};

export default PlaybackController;
