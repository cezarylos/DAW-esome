import { IAudioContext } from 'standardized-audio-context';

interface LoadAudioBufferUtilInterface {
  context: IAudioContext;
  sourceUrl: string;
}

export const loadAudioBufferUtil = async ({
  context,
  sourceUrl
}: LoadAudioBufferUtilInterface): Promise<AudioBuffer | void> => {
  try {
    const response = await fetch(sourceUrl);
    const arrayBuffer = await response.arrayBuffer();
    return await context.decodeAudioData(arrayBuffer);
  } catch (e) {
    console.error(e);
  }
};
