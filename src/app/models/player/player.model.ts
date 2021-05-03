import EventEmitter from 'events';
import { IAudioBufferSourceNode, IAudioContext } from 'standardized-audio-context';

import { PlayerEventsEnum } from 'app/enums/player-events.enum';
import { AudioPluginsInterface } from 'app/interfaces/audio-plugins.interface';

class PlayerModel extends EventEmitter {
  public isPlaying = false;
  public audioBufferSourceNode: IAudioBufferSourceNode<IAudioContext> | undefined;

  constructor(
    public readonly audioBuffer: AudioBuffer,
    private readonly context: IAudioContext,
    private readonly plugins?: AudioPluginsInterface
  ) {
    super();
  }

  public play(start = 0, delay = 0): void {
    const { context, audioBuffer, isPlaying, plugins } = this;
    if (isPlaying) {
      this.stop();
      return;
    }
    let source = context.createBufferSource();
    source.buffer = audioBuffer;
    if (plugins?.gain) {
      source.connect(plugins.gain).connect(context.destination);
    } else {
      source.connect(context.destination);
    }
    const offset = start < delay ? delay - start : 0;
    source.start(context.currentTime + start - delay, offset);
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
