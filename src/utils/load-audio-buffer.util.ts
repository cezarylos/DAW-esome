interface LoadAudioBufferUtilInterface {
  context: AudioContext;
  sourceUrl: string;
}

export const loadAudioBufferUtil = async ({ context, sourceUrl }: LoadAudioBufferUtilInterface): Promise<AudioBuffer> => {
  const response = await fetch(sourceUrl);
  const arrayBuffer =  await response.arrayBuffer();
  return await context.decodeAudioData(arrayBuffer);
}
