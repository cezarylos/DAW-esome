import styles from 'app/components/audio-sample/audio-sample.module.scss';
import PlayButton from 'app/components/play-button/play-button.component';
import { DragItemTypeEnum } from 'app/enums/drag-item-type.enum';
import { PlayerEventsEnum } from 'app/enums/player-events.enum';
import Player from 'app/models/player/Player.model';
import { RootState } from 'app/store/store';

import { loadAudioBufferUtil } from 'app/utils/load-audio-buffer.util';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';

interface AudioSampleComponentInterface {
  name: string;
  sourceUrl: string;
}

const AudioSample = ({ name, sourceUrl }: AudioSampleComponentInterface): ReactElement => {
  const { context } = useSelector((state: RootState) => state.audioContext);

  const [player, setPlayer] = useState<Player>();
  const [isPlaying, setIsPlaying] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => {
    return {
      type: DragItemTypeEnum.AUDIO_SAMPLE,
      item: {
        type: DragItemTypeEnum.AUDIO_SAMPLE,
        name,
        audioBuffer: player?.audioBuffer
      },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      })
    }
  }, [name, sourceUrl, player])

  useEffect((): void => {
    const loadAudioBuffer = async () => {
      const loadedAudioBuffer = await loadAudioBufferUtil({ context, sourceUrl });
      if (loadedAudioBuffer) {
        const playerInstance = new Player(loadedAudioBuffer, context)
        playerInstance.addListener(PlayerEventsEnum.IS_PLAYING, ({ isPlaying }) => setIsPlaying(isPlaying));
        setPlayer(playerInstance);
      }
    }
    loadAudioBuffer();
  }, [context, sourceUrl]);

  useEffect((): () => void => {
    return (): void => {
      player?.removeAllListeners();
    }
  }, [player])

  if (!player) {
    return <></>;
  }

  return <div ref={drag} className={styles.container}>
    <PlayButton onClick={() => player?.play()} isPlaying={isPlaying}/>
    <span className={styles.name}>{name}</span>
  </div>;
};

export default AudioSample;
