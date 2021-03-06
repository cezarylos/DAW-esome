import React, { ReactElement, useContext, useEffect, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import { AudioSamplePropsInterface } from 'app/components/audio-sample/audio-sample.interface';
import styles from 'app/components/audio-sample/audio-sample.module.scss';
import PlayButton from 'app/components/play-button/play-button.component';
import { AppAudioContext } from 'app/context/audio.context';
import { DragItemTypeEnum } from 'app/enums/drag-item-type.enum';
import { PlayerEventsEnum } from 'app/enums/player-events.enum';
import PlayerModel from 'app/models/player/player.model';
import { loadAudioBufferUtil } from 'app/utils/load-audio-buffer.util';

const AudioSample = ({ name, sourceUrl, color }: AudioSamplePropsInterface): ReactElement => {
  const context = useContext(AppAudioContext);
  const ref = useRef<HTMLDivElement | null>(null);

  const [player, setPlayer] = useState<PlayerModel>();
  const [isPlaying, setIsPlaying] = useState(false);

  const [, drag, preview] = useDrag(() => {
    return {
      type: DragItemTypeEnum.AUDIO_SAMPLE,
      item: {
        type: DragItemTypeEnum.AUDIO_SAMPLE,
        name,
        audioBuffer: player?.audioBuffer,
        sourceUrl,
        color
      },
      collect: monitor => ({
        isDragging: monitor.isDragging()
      })
    };
  }, [name, sourceUrl, player, ref.current]);

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  useEffect((): void => {
    const loadAudioBuffer = async (): Promise<void> => {
      const loadedAudioBuffer = await loadAudioBufferUtil({ context, sourceUrl });
      if (!loadedAudioBuffer) {
        return;
      }
      const playerInstance = new PlayerModel(loadedAudioBuffer, context);
      playerInstance.addListener(PlayerEventsEnum.IS_PLAYING, ({ isPlaying }) => setIsPlaying(isPlaying));
      setPlayer(playerInstance);
    };
    loadAudioBuffer();
  }, [context, sourceUrl]);

  useEffect((): (() => void) => {
    return (): void => {
      player?.removeAllListeners();
    };
  }, [player]);

  if (!player) {
    return <></>;
  }

  return (
    <div ref={drag} className={styles.container}>
      <PlayButton onClick={() => player?.play()} isPlaying={isPlaying} />
      <span className={styles.name}>{name}</span>
    </div>
  );
};

export default AudioSample;
