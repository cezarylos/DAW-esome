import { getPreviewPositionDataInterface } from 'app/components/drag-layer/drag-layer.interface';
import { TIMELINE_SCALE } from 'app/consts/timeline-scale';
import { TrackContainerInterface } from 'app/interfaces';
import { getDragOffset } from 'app/utils/get-drag-offset.util';
import { CSSProperties } from 'react';
import { XYCoord } from 'react-dnd';

export const dragLayerPreviewStyles = (
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null
): CSSProperties => {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none'
    };
  }
  let { x, y } = currentOffset;
  return {
    position: 'absolute',
    top: y,
    left: x
  };
};

export interface PreviewPositionData {
  previewTimestamp: number | undefined;
  isInsideTrack: boolean;
}

export const getPreviewPositionData = ({
  x,
  y,
  containers,
  previewElementRect,
  type
}: getPreviewPositionDataInterface): PreviewPositionData => {
  const offset = getDragOffset(type);
  const verticalOffset = (previewElementRect?.height || 0) / 2;

  const isInsideTrack = (trackContainer: TrackContainerInterface): boolean => {
    const MARGIN = TIMELINE_SCALE + offset;
    const { left, right, top, bottom } = trackContainer;
    const isXInside = x >= left - MARGIN && x <= right + MARGIN;
    const isYInside = y + verticalOffset >= top && y + verticalOffset <= bottom;
    return isXInside && isYInside;
  };

  const matchingContainer = containers.find(container => isInsideTrack(container));
  return {
    previewTimestamp: matchingContainer ? x - matchingContainer.left + offset : undefined,
    isInsideTrack: !!matchingContainer
  };
};
