import EventEmitter from 'events';
import { IAudioBufferSourceNode, IAudioContext } from 'standardized-audio-context';

import { PlayerEventsEnum } from 'app/enums/player-events.enum';

class PlayerModel extends EventEmitter {
  public isPlaying = false;
  public audioBufferSourceNode: IAudioBufferSourceNode<IAudioContext> | undefined;

  constructor(public readonly audioBuffer: AudioBuffer, private readonly context: IAudioContext) {
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
