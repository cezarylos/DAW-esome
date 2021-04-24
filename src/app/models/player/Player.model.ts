import * as buffer from 'buffer';

class Player {

  private audioBufferSourceNode: AudioBufferSourceNode | undefined;

  constructor(private readonly context: AudioContext,
              private readonly audioBuffer: AudioBuffer) {
  }

  public play(start = 0, offset = 0): void {
    const { context, audioBuffer, audioBufferSourceNode } = this;
    audioBufferSourceNode?.stop();
    const source = context.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(context.destination);
    source.start(start, 0);
    this.audioBufferSourceNode = source;
  }

  public stop(): void {
    this.audioBufferSourceNode?.stop();
  }
}

export default Player
