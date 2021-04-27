import AudioSamplePreview from 'app/components/preview-components/audio-sample-preview/audio-sample-preview.component';
import AudioTrackSamplePreview from 'app/components/preview-components/audio-track-sample-preview/audio-track-sample-preview.component';
import { DragItemTypeEnum } from 'app/enums/drag-item-type.enum';
import { TrackContainerInterface } from 'app/interfaces/track-container.interface';
import { RootState } from 'app/store/store';
import { CSSProperties, ReactElement } from 'react';
import { useDragLayer, XYCoord } from 'react-dnd';
import { useSelector } from 'react-redux';

export function snapToGrid(x: number, y: number): [number, number] {
  const snappedX = Math.round(x / 32) * 32
  const snappedY = Math.round(y / 32) * 32
  return [snappedX, snappedY]
}

const layerStyles: CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
};

function getItemStyles(
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null
) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }

  let { x, y } = currentOffset;

  // if (isSnapToGrid) {
  //   x -= initialOffset.x;
  //   y -= initialOffset.y
  //   ;[x, y] = snapToGrid(x, y);
  //   x += initialOffset.x;
  //   y += initialOffset.y;
  // }

  return {
    position: 'absolute',
    top: y,
    left: x
  } as any;
}

const isInsideTrack = (x: number, y: number, container: TrackContainerInterface): boolean => {
  const isXInside = x > container.left && x < container.right;
  const isYInside = y + 28 > container.top && y + 28 < container.bottom;
  return isXInside && isYInside;
}

const getStartPoint = (x: number = 0, y: number = 0, containers: TrackContainerInterface[]): number => {
  const matchingContainer = containers.find(container => isInsideTrack(x, y, container));
  return matchingContainer ? x - matchingContainer.left : 0;
}

export interface CustomDragLayerProps {
  snapToGrid: boolean
}

const DragLayer = (props: any): ReactElement => {
  const { containers } = useSelector((state: RootState) => state.trackContainer);
  const {
    itemType,
    isDragging,
    item,
    initialOffset,
    currentOffset,
  } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  }));

  if (!isDragging) {
    return <></>;
  }
  return (
    <div style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        <>
          {itemType === DragItemTypeEnum.AUDIO_SAMPLE && <AudioSamplePreview name={item.name}/>}
          {!!getStartPoint(currentOffset?.x, currentOffset?.y, containers) &&
            <AudioTrackSamplePreview type={item.type} audioBuffer={item.audioBuffer} previewMarker={getStartPoint(currentOffset?.x, currentOffset?.y, containers)}/>
          }
        </>
        </div>
    </div>
  );
};

export default DragLayer
