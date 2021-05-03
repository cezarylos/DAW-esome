import React, { CSSProperties, ReactElement, useEffect, useMemo } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import { config } from 'app/_config/config';
import RemoveButton from 'app/components/remove-button/remove-button.component';
import styles from 'app/components/track-sample/track-sample.module.scss';
import { DragItemTypeEnum } from 'app/enums/drag-item-type.enum';
import { TrackSampleInterface } from 'app/interfaces';

const getStyles = (start: number, width: number, color: string): CSSProperties => {
  const transform = `translate3d(${start}px, 0, 0)`;
  return {
    width,
    transform,
    WebkitTransform: transform,
    background: color
  };
};

const DEFAULT_COLOR = '#44837D';

const TrackSample = ({
  id,
  name,
  audioBuffer,
  start = 0,
  onSampleRemove,
  color = DEFAULT_COLOR
}: TrackSampleInterface): ReactElement => {
  const width = useMemo((): number => {
    return audioBuffer.duration * config.timelineScale;
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
    <div ref={drag} className={styles.container} style={getStyles(start, width, color)}>
      <span className={styles.name}>{name}</span>
      <RemoveButton onClick={onSampleRemove} className={styles.removeButton} />
    </div>
  );
};

export default TrackSample;
