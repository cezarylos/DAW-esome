import styles from 'app/components/preview-components/audio-track-sample-preview/audio-track-sample-preview.module.scss';
import { TIMELINE_SCALE } from 'app/consts/timeline-scale';
import { DragItemTypeEnum } from 'app/enums/drag-item-type.enum';
import React, { CSSProperties, ReactElement, useMemo } from 'react';

const getStyles = (start: number, width: number, type: DragItemTypeEnum): CSSProperties => {
  const transform = `translate3d(${start}px, 0, 0)`;
  return {
    width,
    transform,
    WebkitTransform: transform,
    margin: type === DragItemTypeEnum.AUDIO_SAMPLE ? 'auto' : 'initial'
  };
};

const AudioTrackSamplePreview = ({ audioBuffer, start = 0, previewMarker, type }: any): ReactElement => {

  const width = useMemo((): number => {
    return audioBuffer.duration * TIMELINE_SCALE;
  }, [audioBuffer]);

  return <div className={styles.container} style={getStyles(start, width, type)}>
    <span className={styles.marker}>{(previewMarker || 0) / TIMELINE_SCALE}</span>
  </div>;
};

export default AudioTrackSamplePreview;
