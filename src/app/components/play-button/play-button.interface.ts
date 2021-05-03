export interface PlayButtonPropsInterface {
  onClick?: () => void;
  isPlaying?: boolean;
  isDisabled?: boolean;
  isPreview?: boolean;
  className?: string;
  isPause?: boolean;
}
