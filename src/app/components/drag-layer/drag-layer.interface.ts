import { DragItemTypeEnum } from 'app/enums/drag-item-type.enum';
import { TrackContainerInterface } from 'app/interfaces';

export interface PreviewRef {
  element: HTMLDivElement | null;
  type: DragItemTypeEnum;
}

export interface getPreviewPositionDataInterface {
  x: number;
  y: number;
  containers: TrackContainerInterface[];
  previewElementRect: DOMRect;
  type: DragItemTypeEnum;
}
