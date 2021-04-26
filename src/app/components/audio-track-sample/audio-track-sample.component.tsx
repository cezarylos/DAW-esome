import { TIMELINE_SCALE } from 'app/consts/timeline-scale';
import { DragItemTypeEnum } from 'app/enums/drag-item-type.enum';
import Player from 'app/models/player/Player.model';
import React, { CSSProperties, ReactElement, useMemo } from 'react';
import { useDrag } from 'react-dnd';
import classnames from 'classnames';
import { uuid } from 'uuidv4';

import styles from 'app/components/audio-track-sample/audio-track-sample.module.scss';

function getStyles(
  offsetX: number,
  width: number
): CSSProperties {
  const transform = `translate3d(${offsetX}px, 0, 0)`
  return {
    width,
    transform,
    WebkitTransform: transform
  }
}

export interface AudioTrackSampleComponentInterface {
  name: string;
  audioBuffer: AudioBuffer;
  id: string;
  offsetX?: number;
  type?: DragItemTypeEnum;
}

const AudioTrackSample = ({ name, offsetX = 0, id, audioBuffer }: AudioTrackSampleComponentInterface): ReactElement => {

  const width = useMemo((): number => {
    return audioBuffer.duration * TIMELINE_SCALE;
  }, [audioBuffer])

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragItemTypeEnum.AUDIO_TRACK_SAMPLE,
    item: {
      type: DragItemTypeEnum.AUDIO_TRACK_SAMPLE,
      id
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  }));

  return <div ref={drag} className={classnames(styles.container, isDragging && styles.isDragging)} style={getStyles(offsetX, width)}>
    <span className={styles.name}>{name}</span>
  </div>;
};

export default AudioTrackSample;
