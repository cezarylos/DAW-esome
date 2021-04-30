import { AudioTrackSamplePreviewPropsInterface } from 'app/components/preview-components/audio-track-sample-preview/audio-track-sample-preview.interface';
import styles from 'app/components/preview-components/audio-track-sample-preview/audio-track-sample-preview.module.scss';
import { TIMELINE_SCALE } from 'app/consts/timeline-scale';
import { DragItemTypeEnum } from 'app/enums/drag-item-type.enum';
import { useGetPreviewRefHook } from 'app/hooks/get-preview-ref.hook';
import { getDragOffset } from 'app/utils/get-drag-offset.util';
import classNames from 'classnames';
import React, { CSSProperties, ReactElement, RefObject, useMemo } from 'react';

const getStyles = (width: number, type: DragItemTypeEnum, start?: number,): CSSProperties => {
  const transform = start ? `translate3d(${start}px, 0, 0)` : 'none';
  return {
    width,
    transform,
    WebkitTransform: transform,
    left: getDragOffset(type)
  };
};

const AudioTrackSamplePreview = ({
                                   audioBuffer,
                                   start = 0,
                                   previewTimestamp,
                                   type,
                                   setRef
                                 }: AudioTrackSamplePreviewPropsInterface): ReactElement => {

  const audioTrackSampleRef = useGetPreviewRefHook({ setRef, type: DragItemTypeEnum.AUDIO_TRACK_SAMPLE });
  const ref = useMemo((): RefObject<HTMLDivElement> | null =>
    type === DragItemTypeEnum.AUDIO_SAMPLE ? null : audioTrackSampleRef, [type, audioTrackSampleRef]);

  const width = useMemo((): number => {
    return audioBuffer.duration * TIMELINE_SCALE;
  }, [audioBuffer]);

  return <div ref={ref} className={classNames(styles.container, type === DragItemTypeEnum.AUDIO_SAMPLE && styles.alreadyOnTrack)}
              style={getStyles(width, type, start)}>
    {
      previewTimestamp !== undefined &&
      previewTimestamp >= 0 &&
      <span className={styles.marker}>{previewTimestamp / TIMELINE_SCALE}s</span>
    }
  </div>;
};

export default AudioTrackSamplePreview;
