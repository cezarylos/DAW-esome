import { Dispatch } from 'react';

class Player {

  public isPlaying = false;
  public timer: any;
  private audioBufferSourceNode: AudioBufferSourceNode | undefined;

  constructor(private readonly context: AudioContext,
              private readonly audioBuffer: AudioBuffer,
              private readonly dispatchers: Record<string, Dispatch<any>> = {}) {
  }

  public play(start = 0, offset = 0): void {
    const { context, audioBuffer, isPlaying } = this;
    if (isPlaying) {
      this.stop();
      return;
    }
    const source = context.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(context.destination);
    source.start(start, 0);
    this.setIsPlaying(true);
    this.audioBufferSourceNode = source;
    this.listenToEndPlaybackEvent();
  }

  public stop(): void {
    this.audioBufferSourceNode?.stop();
    this.setIsPlaying(false);
    clearInterval(this.timer);
  }

  private listenToEndPlaybackEvent(): void {
    const { audioBufferSourceNode } = this;
    audioBufferSourceNode?.removeEventListener('ended', (): void => {});
    audioBufferSourceNode?.addEventListener('ended', (): void => {
      this.stop();
    });
  }

  private setIsPlaying(isPlaying: boolean): void {
    this.isPlaying = isPlaying;
    this.dispatchers.setIsPlaying?.(isPlaying);
  }
}

export default Player
