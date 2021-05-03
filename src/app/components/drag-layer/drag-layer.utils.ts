import { CSSProperties } from 'react';
import { XYCoord } from 'react-dnd';

import { config } from 'app/_config/config';
import { getPreviewPositionDataInterface, PreviewPositionData } from 'app/components/drag-layer/drag-layer.interface';
import { TrackContainerInterface } from 'app/interfaces';
import { getDragOffset } from 'app/utils/get-drag-offset.util';

export const dragLayerPreviewStyles = (initialOffset: XYCoord | null, currentOffset: XYCoord | null): CSSProperties => {
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

export const getPreviewPositionData = ({
  x,
  y,
  containers,
  previewElementRect,
  type
}: getPreviewPositionDataInterface): PreviewPositionData => {
  const offset = getDragOffset(type);
  const verticalOffset = (previewElementRect?.height || 0) / 2;

  const isInsideTrack = (container: TrackContainerInterface): boolean => {
    const MARGIN = config.timelineScale + offset;
    const { left, right, top, bottom } = container;
    const isXInside = x >= left - MARGIN && x <= right + MARGIN;
    const isYInside = y + verticalOffset >= top && y + verticalOffset <= bottom;
    return isXInside && isYInside;
  };

  const matchingContainer = containers.find(container => isInsideTrack(container));
  return {
    previewTimestamp: matchingContainer
      ? x - matchingContainer.left + offset + matchingContainer.parentElement.scrollLeft
      : undefined,
    isInsideTrack: !!matchingContainer
  };
};
