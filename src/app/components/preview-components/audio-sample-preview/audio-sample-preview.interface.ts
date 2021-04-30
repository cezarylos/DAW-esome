import { PreviewRef } from 'app/components/drag-layer/drag-layer.interface';
import { Dispatch } from 'react';

export interface AudioSamplePreviewPropsInterface {
  name: string;
  setRef: Dispatch<PreviewRef>;
}
