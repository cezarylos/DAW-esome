import AudioSamplePreview from 'app/components/preview-components/audio-sample-preview/audio-sample-preview.component';
import AudioTrackSamplePreview from 'app/components/preview-components/audio-track-sample-preview/audio-track-sample-preview.component';
import { TIMELINE_SCALE } from 'app/consts/timeline-scale';
import { DragItemTypeEnum } from 'app/enums/drag-item-type.enum';
import { TrackContainerInterface } from 'app/interfaces/track-container.interface';
import { RootState } from 'app/store/store';
import { CSSProperties, ReactElement, useMemo } from 'react';
import { useDragLayer, XYCoord } from 'react-dnd';
import { useSelector } from 'react-redux';

export function snapToGrid(x: number, y: number): [number, number] {
  const snappedX = Math.round(x / 32) * 32;
  const snappedY = Math.round(y / 32) * 32;
  return [snappedX, snappedY];
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

const isInsideTrack = ({ x, y, container }: IsInsideTrackInterface): boolean => {
  const MARGIN = TIMELINE_SCALE;
  const { left, right, top, bottom } = container;
  const isXInside = x > left - MARGIN && x < right + MARGIN;
  const isYInside = y + 28 > top && y + 28 < bottom;
  return isXInside && isYInside;
};

interface GetPreviewMarkerInterface {
  x: number;
  y: number;
  containers: TrackContainerInterface[];
}

interface IsInsideTrackInterface {
  x: number;
  y: number;
  container: TrackContainerInterface;
}

const getPreviewMarker = ({ x, y, containers }: GetPreviewMarkerInterface): number | undefined => {
  const matchingContainer = containers.find(container => isInsideTrack({ x, y, container }));
  return matchingContainer ? x - matchingContainer.left : undefined;
};

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

  const previewMarker = useMemo((): number | void => {
    if (!currentOffset) {
      return;
    }
    const { x, y } = currentOffset;
    return getPreviewMarker({ x, y, containers });
  }, [currentOffset, containers]);

  console.log(previewMarker);

  if (!isDragging) {
    return <></>;
  }
  return (
    <div style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        <>
          {itemType === DragItemTypeEnum.AUDIO_SAMPLE && <AudioSamplePreview name={item.name}/>}
          {previewMarker >= 0 && <AudioTrackSamplePreview type={item.type} audioBuffer={item.audioBuffer} previewMarker={previewMarker}/>}
        </>
      </div>
    </div>
  );
};

export default DragLayer;
