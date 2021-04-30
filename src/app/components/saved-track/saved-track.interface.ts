export interface SavedTrackPropsInterface {
  name: string;
  samples: SavedSampleInterface[];
}

export interface SavedSampleInterface {
  sourceUrl: string;
  start: number;
  id: string;
}
