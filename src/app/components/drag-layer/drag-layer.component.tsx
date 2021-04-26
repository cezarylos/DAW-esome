import AudioTrackSample from 'app/components/audio-track-sample/audio-track-sample.component';
import { CSSProperties, ReactElement } from 'react';
import { useDragLayer, XYCoord } from 'react-dnd';

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
  currentOffset: XYCoord | null,
  isSnapToGrid: boolean,
) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }

  let { x, y } = currentOffset;

  console.log(currentOffset);

  if (isSnapToGrid) {
    x -= initialOffset.x;
    y -= initialOffset.y
    ;[x, y] = snapToGrid(x, y);
    x += initialOffset.x;
    y += initialOffset.y;
  }

  const transform = `translate(${x}px, 0)`;
  return {
    position: 'absolute',
    top: y - 70 + 56 / 2 ,
    left: x - 100 + 313 / 2
  } as any;
}

export interface CustomDragLayerProps {
  snapToGrid: boolean
}

const DragLayer = (props: any): ReactElement => {
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
      <div style={getItemStyles(initialOffset, currentOffset, props.snapToGrid)}>
        <AudioTrackSample name={item.name} offsetX={0} id={item.id}/>
      </div>
    </div>
  );
};

export default DragLayer
