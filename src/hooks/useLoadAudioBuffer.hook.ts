import { AppAudioContext } from 'App';
import { useContext, useEffect, useState } from 'react';

export const useLoadAudioBuffer = (sourceUrl: string): AudioBuffer | undefined => {
  const audioContext = useContext(AppAudioContext)

  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer>();

  useEffect((): void => {
    const request = new XMLHttpRequest();
    request.addEventListener('load', fileLoaded);
    request.open('GET', sourceUrl);
    request.responseType = 'arraybuffer';
    request.send();

    async function fileLoaded(): Promise<void> {
      if (request.status < 400) {
        const loadedAudioBuffer = await audioContext.decodeAudioData(request.response);
        setAudioBuffer(loadedAudioBuffer);
      }
    }

  }, [audioContext, sourceUrl])

  if (audioBuffer) {
    return audioBuffer;
  }
}
