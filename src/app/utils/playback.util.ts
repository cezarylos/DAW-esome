import { IAudioBufferSourceNode, IAudioContext } from 'standardized-audio-context';

export interface PlaySoundInterface {
  context: IAudioContext;
  audioBuffer: AudioBuffer;
  start?: number;
}

export const playSound = ({
  context,
  audioBuffer,
  start = 0
}: PlaySoundInterface): IAudioBufferSourceNode<IAudioContext> => {
  const source = context.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(context.destination);
  source.start(start);
  return source;
};
