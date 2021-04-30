import { Dispatch } from 'react';

import { PreviewRef } from 'app/components/drag-layer/drag-layer.interface';

export interface AudioSamplePreviewPropsInterface {
  name: string;
  setRef: Dispatch<PreviewRef>;
}
