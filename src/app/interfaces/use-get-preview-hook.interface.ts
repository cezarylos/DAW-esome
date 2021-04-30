import { Dispatch } from 'react';

import { PreviewRef } from 'app/components/drag-layer/drag-layer.interface';
import { DragItemTypeEnum } from 'app/enums/drag-item-type.enum';

export interface UseGetPreviewRefHookInterface {
  setRef: Dispatch<PreviewRef>;
  type: DragItemTypeEnum;
}
