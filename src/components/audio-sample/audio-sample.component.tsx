import { useLoadAudioBuffer } from 'hooks/useLoadAudioBuffer.hook';
import React, { ReactElement } from 'react';

interface AudioSampleComponentInterface {
  sourceUrl: string;
  onPlay: (audioBuffer: AudioBuffer) => void;
}

const AudioSample = ({ sourceUrl, onPlay }: AudioSampleComponentInterface): ReactElement => {
  const audioBuffer = useLoadAudioBuffer(sourceUrl);
  return audioBuffer ?
    <button onClick={(): void => onPlay(audioBuffer)}>PLAY</button> :
    <></>;
};

export default AudioSample;
