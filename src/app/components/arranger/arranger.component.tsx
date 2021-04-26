import AudioTrackSample, { AudioTrackSampleComponentInterface } from 'app/components/audio-track-sample/audio-track-sample.component';
import styles from 'app/components/arranger/arranger.module.scss';
import { DragItemTypeEnum } from 'app/enums/drag-item-type.enum';
import React, { Dispatch, ReactElement, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { v4 } from 'uuid';

interface ArrangerComponentPropsInterface {
  samples: AudioTrackSampleComponentInterface[];
  setSamples: Dispatch<AudioTrackSampleComponentInterface[]>;
}

const Arranger = ({ samples, setSamples }: ArrangerComponentPropsInterface): ReactElement => {
  const arrangerRef = useRef<any>();

  const [, drop] = useDrop(() => ({
    accept: [DragItemTypeEnum.AUDIO_SAMPLE, DragItemTypeEnum.AUDIO_TRACK_SAMPLE],
    drop: (item: AudioTrackSampleComponentInterface, monitor): void => {
      const { id, name, type } = item;

      const delta = monitor.getSourceClientOffset() as {
        x: number
        y: number
      };
      const containerRect = arrangerRef.current.getBoundingClientRect();
      const offsetX = delta.x - containerRect.x;

      let updatedSamples;
      if (type === DragItemTypeEnum.AUDIO_SAMPLE) {
        updatedSamples = [...samples, { offsetX, id: v4(), name }];
      } else {
        updatedSamples = samples.map(sample => sample.id === id ? { ...sample, offsetX } : sample);
      }
      setSamples(updatedSamples);
    }
  }), [samples]);

  return (
    <>
      <div ref={arrangerRef} className={styles.arranger}>
        <div ref={drop} className={styles.droppableArea}>
          {samples.map(({ id, offsetX, name }): ReactElement =>
            <AudioTrackSample key={id} id={id} name={name} offsetX={offsetX}/>)}
        </div>
      </div>
      {/*<DragLayer/>*/}
    </>
  );
};

export default Arranger;
