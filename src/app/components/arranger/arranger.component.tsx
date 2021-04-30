import styles from 'app/components/arranger/arranger.module.scss';
import AudioTrackSample from 'app/components/audio-track-sample/audio-track-sample.component';
import { DragItemTypeEnum } from 'app/enums/drag-item-type.enum';
import { AudioTrackSampleInterface } from 'app/interfaces';
import { TrackContainerInterface } from 'app/interfaces';
import { addTrackContainer } from 'app/store/slices/track-container.slice';
import { getDragOffset } from 'app/utils/get-drag-offset.util';
import React, { Dispatch, ReactElement, useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { XYCoord } from 'react-dnd/dist/types/types/monitors';
import { useDispatch } from 'react-redux';
import { v4 } from 'uuid';

interface ArrangerPropsInterface {
  samples: AudioTrackSampleInterface[];
  setSamples: Dispatch<AudioTrackSampleInterface[]>;
}

const Arranger = ({ samples, setSamples }: ArrangerPropsInterface): ReactElement => {
  const arrangerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect((): void => {
    if (!arrangerRef.current) {
      return;
    }
    const { top, bottom, left, right } = arrangerRef.current.getBoundingClientRect();
    const container: TrackContainerInterface = { top, bottom, left, right, id: v4() };
    dispatch(addTrackContainer(container));
  }, [arrangerRef, dispatch]);


  const [, drop] = useDrop(() => ({
    accept: [DragItemTypeEnum.AUDIO_SAMPLE, DragItemTypeEnum.AUDIO_TRACK_SAMPLE],
    drop: (item: AudioTrackSampleInterface, monitor): void => {
      const { id, name, audioBuffer } = item;
      const type = monitor.getItemType() as DragItemTypeEnum;
      const delta = monitor.getSourceClientOffset() as XYCoord;
      const containerRect = arrangerRef.current?.getBoundingClientRect();
      if (!containerRect) {
        return;
      }

      const start = delta.x - containerRect.x + getDragOffset(type);
      if (start < 0) {
        return;
      }

      let updatedSamples;
      if (type === DragItemTypeEnum.AUDIO_SAMPLE) {
        const sample = { start, id: v4(), name, audioBuffer };
        updatedSamples = [...samples, sample];
      } else {
        updatedSamples = samples.map(sample => sample.id === id ? { ...sample, start } : sample);
      }
      setSamples(updatedSamples);
    }
  }), [samples]);

  return (
    <>
      <div ref={arrangerRef} className={styles.arranger}>
        <div ref={drop} className={styles.droppableArea}>
          {samples.map(({ id, start, name, audioBuffer }): ReactElement =>
            <AudioTrackSample key={id} id={id} name={name} audioBuffer={audioBuffer} start={start}/>)}
        </div>
      </div>
    </>
  );
};

export default Arranger;
