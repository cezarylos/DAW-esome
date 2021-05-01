export interface TrackSampleInterface {
  id: string;
  audioBuffer: AudioBuffer;
  start: number;
  name?: string;
  sourceUrl?: string;
  onSampleRemove?: () => any;
}
