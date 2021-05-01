import { AudioContext } from 'standardized-audio-context-mock';
import { v4 } from 'uuid';

import { samples } from 'app/consts/samples';
import { TrackSampleInterface } from 'app/interfaces';
import TrackModel from 'app/models/track/track.model';
import { loadAudioBufferUtil } from 'app/utils/load-audio-buffer.util';

let audioBuffer = {} as AudioBuffer | void;
const context = new AudioContext();
const mockedSample = samples[0];

describe('Track Model', (): void => {
  beforeEach(
    async (): Promise<void> => {
      audioBuffer = await loadAudioBufferUtil({ context, sourceUrl: mockedSample.sourceUrl });
    }
  );

  it('should start Track', async (): Promise<void> => {
    if (!audioBuffer) {
      return;
    }
    const trackSample: TrackSampleInterface = { ...mockedSample, audioBuffer, id: v4(), start: 0 };
    const trackModel = new TrackModel([trackSample], context);
    const spy = jest.spyOn(trackModel as any, 'setIsPlaying');
    trackModel.play();
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should stop playing Track', async (): Promise<void> => {
    if (!audioBuffer) {
      return;
    }
    const trackSample: TrackSampleInterface = { ...mockedSample, audioBuffer, id: v4(), start: 0 };
    const trackModel = new TrackModel([trackSample], context);
    trackModel.play();
    const spy = jest.spyOn(trackModel as any, 'setIsPlaying');
    trackModel.stop();
    expect(spy).toHaveBeenCalledWith(false);
  });
});
