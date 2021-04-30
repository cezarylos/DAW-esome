import { TIMELINE_SCALE } from 'app/consts/timeline-scale';
import { PlayerEventsEnum } from 'app/enums/player-events.enum';
import { AudioTrackSampleInterface } from 'app/interfaces';
import Player from 'app/models/player/Player.model';
import EventEmitter from 'events';

class Track extends EventEmitter {
  public isPlaying = false;
  private players: Player[] = [];
  private currentlyPlaying: string[] = [];

  constructor(
    private readonly samples: AudioTrackSampleInterface[],
    private readonly context: AudioContext
  ) {
    super();
  }

  public play(): void {
    const { samples, context, isPlaying } = this;
    if (isPlaying) {
      this.stop();
      return;
    }
    this.players = samples.map(({ audioBuffer, start = 0, id }) => {
      const player = new Player(audioBuffer, context);
      player.play(start / TIMELINE_SCALE);
      this.currentlyPlaying.push(id);
      this.listenToEndPlaybackEvent(player, id);
      return player;
    });
    this.setIsPlaying(true);
  }

  public stop(): void {
    const { players } = this;
    players.forEach(player => player.stop());
    this.currentlyPlaying = [];
    this.setIsPlaying(false);
  }

  private listenToEndPlaybackEvent(player: Player, id: string): void {
    player.audioBufferSourceNode?.addEventListener('ended', (): void => {
      this.currentlyPlaying = this.currentlyPlaying.filter(
        currentlyPlayingId => currentlyPlayingId !== id
      );
      this.setIsPlaying(!!this.currentlyPlaying.length);
    });
  }

  private setIsPlaying(isPlaying: boolean): void {
    this.isPlaying = isPlaying;
    this.emit(PlayerEventsEnum.IS_PLAYING, { isPlaying });
  }
}

export default Track;
