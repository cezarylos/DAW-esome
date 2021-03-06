import EventEmitter from 'events';
import { IAudioContext, IGainNode } from 'standardized-audio-context';
import { v4 } from 'uuid';

import { config } from 'app/_config/config';
import { PlayerEventsEnum } from 'app/enums/player-events.enum';
import { TrackSampleInterface } from 'app/interfaces';
import PlayerModel from 'app/models/player/player.model';

class TrackModel extends EventEmitter {
  public id = v4();
  public isPlaying = false;
  public isMuted = false;
  private players: PlayerModel[] = [];
  private currentlyPlaying: string[] = [];
  private gainNode: IGainNode<IAudioContext>;

  constructor(public readonly samples: TrackSampleInterface[], private readonly context: IAudioContext) {
    super();
    this.gainNode = this.context.createGain();
  }

  public play(delay?: number): void {
    const { samples, context, isPlaying, currentlyPlaying, gainNode } = this;
    if (isPlaying) {
      this.stop();
      return;
    }
    this.players = samples.map(
      ({ audioBuffer, start = 0, id }): PlayerModel => {
        const player = new PlayerModel(audioBuffer, context, { gain: gainNode });
        player.play(start / config.timelineScale, delay);
        currentlyPlaying.push(id);
        this.listenToEndPlaybackEvent(player, id);
        return player;
      }
    );
    this.setIsPlaying(true);
  }

  public stop(): void {
    const { players } = this;
    players.forEach(player => player.stop());
    this.currentlyPlaying = [];
    this.setIsPlaying(false);
  }

  public mute(): void {
    this.gainNode.gain.value = 0;
    this.isMuted = true;
  }

  public unmute(): void {
    this.gainNode.gain.value = 1;
    this.isMuted = false;
  }

  public toggleMute(): void {
    this.isMuted ? this.unmute() : this.mute();
  }

  private listenToEndPlaybackEvent(player: PlayerModel, id: string): void {
    player.audioBufferSourceNode?.addEventListener('ended', (): void => {
      this.currentlyPlaying = this.currentlyPlaying.filter(currentlyPlayingId => currentlyPlayingId !== id);
      this.setIsPlaying(!!this.currentlyPlaying.length);
    });
  }

  private setIsPlaying(isPlaying: boolean): void {
    this.isPlaying = isPlaying;
    this.emit(PlayerEventsEnum.IS_PLAYING, { isPlaying });
  }
}

export default TrackModel;
