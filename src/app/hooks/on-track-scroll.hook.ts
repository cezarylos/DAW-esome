import { RefObject, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { TrackContainerInterface } from 'app/interfaces';
import { selectContainers } from 'app/store/slices/tracks.slice';

export const useOnTrackScroll = (ref: RefObject<HTMLDivElement>): (() => void) => {
  const containers = useSelector(selectContainers);

  return useCallback((): void => {
    if (!ref.current) {
      return;
    }
    const scrollLeft = ref.current.scrollLeft;
    containers.forEach((container: TrackContainerInterface) => {
      if (!container.parentElement) {
        return;
      }
      container.parentElement.scrollLeft = scrollLeft;
    });
  }, [ref, containers]);
};
