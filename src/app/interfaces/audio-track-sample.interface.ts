export interface TrackSampleInterface {
  id: string;
  audioBuffer: AudioBuffer;
  start: number;
  color?: string;
  name?: string;
  sourceUrl?: string;
  onSampleRemove?: () => any;
}
