import { DragItemTypeEnum } from 'app/enums/drag-item-type.enum';
import React, { CSSProperties, ReactElement } from 'react';
import { useDrag } from 'react-dnd';
import classnames from 'classnames';
import { uuid } from 'uuidv4';

import styles from 'app/components/audio-track-sample/audio-track-sample.module.scss';

function getTransform(
  offsetX: number,
): CSSProperties {
  const transform = `translate3d(${offsetX}px, 0, 0)`
  return {
    transform,
    WebkitTransform: transform
  }
}

export interface AudioTrackSampleComponentInterface {
  name: string;
  id: string;
  offsetX?: number;
  type?: DragItemTypeEnum;
}

const AudioTrackSample = ({ name, offsetX = 0, id }: AudioTrackSampleComponentInterface): ReactElement => {

  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: DragItemTypeEnum.AUDIO_TRACK_SAMPLE,
    item: {
      type: DragItemTypeEnum.AUDIO_TRACK_SAMPLE,
      id
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    })
  }));

  return <div ref={drag} className={classnames(styles.container, isDragging && styles.isDragging)} style={getTransform(offsetX)}>
    <span className={styles.name}>{name}</span>
  </div>;
};

export default AudioTrackSample;
