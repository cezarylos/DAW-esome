export interface TrackContainerInterface {
  top: number;
  bottom: number;
  left: number;
  right: number;
  id: string;
  parentElement: HTMLDivElement;
  length?: number;
}
