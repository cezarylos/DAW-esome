import { IAudioBufferSourceNode, IAudioContext } from 'standardized-audio-context';
import { AudioContext } from 'standardized-audio-context-mock';

import { samples } from 'app/consts/samples';
import PlayerModel from 'app/models/player/player.model';
import { loadAudioBufferUtil } from 'app/utils/load-audio-buffer.util';

let audioBuffer = {} as AudioBuffer | void;
const context = new AudioContext();
const mockedSample = samples[0];

describe('Player Model', (): void => {
  beforeEach(
    async (): Promise<void> => {
      audioBuffer = await loadAudioBufferUtil({ context, sourceUrl: mockedSample.sourceUrl });
    }
  );

  it('should start Player', async (): Promise<void> => {
    if (!audioBuffer) {
      return;
    }
    const playerModel = new PlayerModel(audioBuffer, context);
    const spy = jest.spyOn(playerModel as any, 'setIsPlaying');
    playerModel.play();
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should stop playing Player', async (): Promise<void> => {
    if (!audioBuffer) {
      return;
    }
    const playerModel = new PlayerModel(audioBuffer, context);
    playerModel.play();
    const spy = jest.spyOn(playerModel.audioBufferSourceNode as IAudioBufferSourceNode<IAudioContext>, 'stop');
    playerModel.stop();
    expect(spy).toHaveBeenCalled();
  });
});
