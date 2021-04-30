import { SavedSampleInterface } from 'app/components/saved-track/saved-track.interface';
import { TrackSampleInterface } from 'app/interfaces';
import { loadAudioBufferUtil } from 'app/utils/load-audio-buffer.util';

export const loadTrackSamples = async (
  samples: SavedSampleInterface[],
  context: AudioContext
): Promise<(TrackSampleInterface | void)[]> => {
  return await Promise.all(
    samples.map(({ sourceUrl, start, id }) =>
      loadSample(
        {
          sourceUrl,
          start,
          id
        },
        context
      )
    )
  );
};

const loadSample = async (
  { sourceUrl, start, id }: SavedSampleInterface,
  context: AudioContext
): Promise<TrackSampleInterface | void> => {
  const audioBuffer = await loadAudioBufferUtil({ context, sourceUrl });
  if (!audioBuffer) {
    return;
  }
  return {
    audioBuffer,
    start,
    id
  };
};
