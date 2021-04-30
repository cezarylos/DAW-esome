import { PreviewRef } from 'app/components/drag-layer/drag-layer.interface';
import styles from 'app/components/drag-layer/drag-layer.module.scss';
import { dragLayerPreviewStyles, getPreviewPositionData, PreviewPositionData } from 'app/components/drag-layer/drag-layer.utils';
import AudioSamplePreview from 'app/components/preview-components/audio-sample-preview/audio-sample-preview.component';
import AudioTrackSamplePreview from 'app/components/preview-components/audio-track-sample-preview/audio-track-sample-preview.component';
import { DragItemTypeEnum } from 'app/enums/drag-item-type.enum';
import { RootState } from 'app/store/store';
import { ReactElement, useCallback, useMemo, useState } from 'react';
import { useDragLayer } from 'react-dnd';
import { useSelector } from 'react-redux';

const DragLayer = (): ReactElement => {
  const { containers } = useSelector((state: RootState) => state.trackContainer);
  const [previewRef, setPreviewRef] = useState<HTMLDivElement>();

  const setRef = useCallback((ref: PreviewRef): void => {
    if (!ref.element) {
      return;
    }
    setPreviewRef(ref.element);
  }, []);

  const {
    itemType,
    isDragging,
    item,
    initialOffset,
    currentOffset,
  } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType() as DragItemTypeEnum,
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  }));

  const previewPositionData = useMemo((): PreviewPositionData | undefined => {
    if (!currentOffset || !previewRef) {
      return;
    }
    const { x, y } = currentOffset;
    const previewElementRect = previewRef.getBoundingClientRect();
    return getPreviewPositionData({ x, y, containers, previewElementRect, type: itemType });
  }, [currentOffset, containers, previewRef, itemType]);

  if (!isDragging) {
    return <></>;
  }

  return (
    <div className={styles.layer}>
      <div style={dragLayerPreviewStyles(initialOffset, currentOffset)}>
        <>
          {itemType === DragItemTypeEnum.AUDIO_SAMPLE && <AudioSamplePreview setRef={setRef} name={item.name}/>}
          {previewPositionData?.isInsideTrack &&
          <AudioTrackSamplePreview setRef={setRef} type={item.type} audioBuffer={item.audioBuffer}
                                   previewTimestamp={previewPositionData?.previewTimestamp}/>
          }
        </>
      </div>
    </div>
  );
};

export default DragLayer;
