import { Dispatch } from 'react';

import { TrackSampleInterface } from 'app/interfaces';

export interface ArrangerPropsInterface {
  samples: TrackSampleInterface[];
  setSamples: Dispatch<TrackSampleInterface[]>;
}
