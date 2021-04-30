import { PlayerEventsEnum } from 'app/enums/player-events.enum';
import EventEmitter from 'events';

class PlayerModel extends EventEmitter {
  public isPlaying = false;
  public audioBufferSourceNode: AudioBufferSourceNode | undefined;

  constructor(public readonly audioBuffer: AudioBuffer, private readonly context: AudioContext) {
    super();
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
    source.start(context.currentTime + start, 0);
    this.setIsPlaying(true);
    this.audioBufferSourceNode = source;
    this.listenToEndPlaybackEvent();
  }

  public stop(): void {
    this.audioBufferSourceNode?.stop();
    this.setIsPlaying(false);
  }

  private listenToEndPlaybackEvent(): void {
    const { audioBufferSourceNode } = this;
    audioBufferSourceNode?.addEventListener('ended', (): void => {
      this.stop();
    });
  }

  private setIsPlaying(isPlaying: boolean): void {
    this.isPlaying = isPlaying;
    this.emit(PlayerEventsEnum.IS_PLAYING, { isPlaying });
  }
}

export default PlayerModel;
