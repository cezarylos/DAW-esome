import { PreviewRef } from 'app/components/drag-layer/drag-layer.interface';
import { DragItemTypeEnum } from 'app/enums/drag-item-type.enum';
import { Dispatch } from 'react';

export interface TrackSamplePreviewPropsInterface {
  setRef: Dispatch<PreviewRef>;
  audioBuffer: AudioBuffer;
  type: DragItemTypeEnum;
  previewTimestamp?: number;
  start?: number;
}
