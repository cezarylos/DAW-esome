import { DragItemTypeEnum } from 'app/enums/drag-item-type.enum';
import { TrackContainerInterface } from 'app/interfaces/track-container.interface';

export interface PreviewRef {
  element: HTMLDivElement;
  type: DragItemTypeEnum;
}

export interface getPreviewPositionDataInterface {
  x: number;
  y: number;
  containers: TrackContainerInterface[];
  previewElementRect: DOMRect;
  type: DragItemTypeEnum;
}
