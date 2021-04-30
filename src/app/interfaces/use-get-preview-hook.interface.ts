import { PreviewRef } from 'app/components/drag-layer/drag-layer.interface';
import { DragItemTypeEnum } from 'app/enums/drag-item-type.enum';
import { Dispatch } from 'react';

export interface UseGetPreviewRefHookInterface {
  setRef: Dispatch<PreviewRef>;
  type: DragItemTypeEnum;
}
