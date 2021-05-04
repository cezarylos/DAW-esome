import { Dispatch, MutableRefObject, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { config } from 'app/_config/config';
import { TrackContainerInterface } from 'app/interfaces';
import TrackModel from 'app/models/track/track.model';
import { addTrackContainer, selectTrackModels } from 'app/store/slices/tracks.slice';

interface PlaybackControllerEncapsulationHookInterface {
  isPlaying: boolean;
  setIsPlaying: Dispatch<boolean>;
  linesCount: number[];
  timerPosition: number;
  setTimerPosition: Dispatch<number>;
  trackModels: TrackModel[];
}

const usePlaybackControllerEncapsulation = (
  containerRef: MutableRefObject<HTMLDivElement | null>
): PlaybackControllerEncapsulationHookInterface => {
  const dispatch = useDispatch();
  const trackModels = useSelector(selectTrackModels);

  const [isPlaying, setIsPlaying] = useState(false);
  const [linesCount, setLinesCount] = useState<number[]>([]);
  const [timerPosition, setTimerPosition] = useState<number>(0);

  useEffect((): void => {
    const countArray = Array.from(Array(config.duration).keys());
    setLinesCount(countArray);
    const container = { parentElement: containerRef.current } as TrackContainerInterface;
    dispatch(addTrackContainer(container));
  }, [containerRef, dispatch]);

  useEffect(
    (): (() => void) => () => {
      return (): void => {
        trackModels.forEach((trackModel: TrackModel) => trackModel.removeAllListeners());
      };
    },
    [trackModels]
  );

  return {
    isPlaying,
    setIsPlaying,
    linesCount,
    timerPosition,
    setTimerPosition,
    trackModels
  };
};

export default usePlaybackControllerEncapsulation;
