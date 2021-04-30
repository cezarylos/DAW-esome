import React, { CSSProperties, ReactElement, useEffect, useMemo } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import styles from 'app/components/track-sample/track-sample.module.scss';
import { TIMELINE_SCALE } from 'app/consts/timeline-scale';
import { DragItemTypeEnum } from 'app/enums/drag-item-type.enum';
import { TrackSampleInterface } from 'app/interfaces';

const getStyles = (start: number, width: number): CSSProperties => {
  const transform = `translate3d(${start}px, 0, 0)`;
  return {
    width,
    transform,
    WebkitTransform: transform
  };
};

const TrackSample = ({ id, name, audioBuffer, start = 0 }: TrackSampleInterface): ReactElement => {
  const width = useMemo((): number => {
    return audioBuffer.duration * TIMELINE_SCALE;
  }, [audioBuffer]);

  const [, drag, preview] = useDrag(
    () => ({
      type: DragItemTypeEnum.AUDIO_TRACK_SAMPLE,
      item: {
        type: DragItemTypeEnum.AUDIO_TRACK_SAMPLE,
        id,
        audioBuffer,
        name
      }
    }),
    [name, start, id, audioBuffer]
  );

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return (
    <div ref={drag} className={styles.container} style={getStyles(start, width)}>
      <span className={styles.name}>{name}</span>
    </div>
  );
};

export default TrackSample;
