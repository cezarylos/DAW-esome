import { AudioContext } from 'standardized-audio-context-mock';

import { samples } from 'app/consts/samples';
import { loadAudioBufferUtil } from 'app/utils/load-audio-buffer.util';

describe('load audio buffer util', (): void => {
  const mockedSample = samples[0];
  const context = new AudioContext();

  it('should test load audio buffer util', async (): Promise<void> => {
    const audioBuffer = (await loadAudioBufferUtil({ context, sourceUrl: mockedSample.sourceUrl })) || {};
    const expectedProps = expect.arrayContaining(['sampleRate', 'length', 'numberOfChannels']);
    expect(Object.keys(audioBuffer)).toEqual(expectedProps);
  });
});
