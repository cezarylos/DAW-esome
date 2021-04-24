import Player from 'app/models/player/Player.model';
import React, { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store/store';
import { loadAudioBufferUtil } from 'app/utils/load-audio-buffer.util';

interface AudioSampleComponentInterface {
  sourceUrl: string;
}
const AudioSample = ({ sourceUrl }: AudioSampleComponentInterface): ReactElement => {
  const { context } = useSelector((state: RootState) => state.audioContext);

  const [player, setPlayer] = useState<Player>();

  useEffect((): void => {
    const loadAudioBuffer = async () => {
      const loadedAudioBuffer = await loadAudioBufferUtil({ context, sourceUrl });
      setPlayer(new Player(context, loadedAudioBuffer));
    }
    loadAudioBuffer();
  }, [context, sourceUrl]);

  return player ?
    <button onClick={() => player?.play()}>TEST</button> :
    <></>;
};

export default AudioSample;
