export interface PlaySoundInterface {
  context: AudioContext,
  audioBuffer: AudioBuffer,
  start?: number;
}

export const playSound = ({ context, audioBuffer, start = 0 }: PlaySoundInterface): AudioBufferSourceNode => {
  const source = context.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(context.destination);
  source.start(start);
  return source;
}
