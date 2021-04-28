import styles from 'app/components/preview-components/audio-track-sample-preview/audio-track-sample-preview.module.scss';
import { TIMELINE_SCALE } from 'app/consts/timeline-scale';
import { DragItemTypeEnum } from 'app/enums/drag-item-type.enum';
import classNames from 'classnames';
import React, { CSSProperties, ReactElement, useMemo } from 'react';

const getStyles = (start: number, width: number): CSSProperties => {
  const transform = `translate3d(${start}px, 0, 0)`;
  return {
    width,
    transform,
    WebkitTransform: transform
  };
};

const AudioTrackSamplePreview = ({ audioBuffer, start = 0, previewMarker, type }: any): ReactElement => {

  const width = useMemo((): number => {
    return audioBuffer.duration * TIMELINE_SCALE;
  }, [audioBuffer]);

  return <div className={classNames(styles.container, type === DragItemTypeEnum.AUDIO_SAMPLE && styles.alreadyOnTrack)}
              style={getStyles(start, width)}>
    <span className={styles.marker}>{previewMarker / TIMELINE_SCALE}s</span>
  </div>;
};

export default AudioTrackSamplePreview;
