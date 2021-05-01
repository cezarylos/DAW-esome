export interface SavedTrackInterface {
  name: string;
  samples: SavedSampleInterface[];
  id: string;
}

export interface SavedSampleInterface {
  sourceUrl: string;
  start: number;
  id: string;
}
