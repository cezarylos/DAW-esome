import { AudioTrackSampleComponentInterface } from 'app/components/audio-track-sample/audio-track-sample.component';
import { TIMELINE_SCALE } from 'app/consts/timeline-scale';
import { PlayerEventsEnum } from 'app/enums/player-events.enum';
import Player from 'app/models/player/Player.model';
import EventEmitter from 'events';

class Track extends EventEmitter {

  public isPlaying = false;
  private players: Player[] = [];

  constructor(private readonly samples: AudioTrackSampleComponentInterface[],
              private readonly context: AudioContext) {
    super();
  }

  public play(): void {
    const { samples, context, isPlaying } = this;
    if (isPlaying) {
      this.stop();
      return;
    }
    this.players = samples.map(({ audioBuffer, offsetX = 0 }) => {
      const player = new Player(audioBuffer, context);
      player.play(offsetX / TIMELINE_SCALE);
      return player;
    })
    this.setIsPlaying(true);
  }

  public stop(): void {
    const { players } = this;
    players.forEach(player => player.stop());
    this.setIsPlaying(false);
  }

  private setIsPlaying(isPlaying: boolean): void {
    this.isPlaying = isPlaying;
    this.emit(PlayerEventsEnum.IS_PLAYING, { isPlaying });
  }
}

export default Track;
