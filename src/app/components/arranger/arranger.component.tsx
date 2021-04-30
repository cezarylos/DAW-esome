import React, { Dispatch, ReactElement, useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { XYCoord } from 'react-dnd/dist/types/types/monitors';
import { useDispatch } from 'react-redux';
import { v4 } from 'uuid';

import styles from 'app/components/arranger/arranger.module.scss';
import TrackSample from 'app/components/track-sample/track-sample.component';
import { TIMELINE_SCALE } from 'app/consts/timeline-scale';
import { DragItemTypeEnum } from 'app/enums/drag-item-type.enum';
import { TrackSampleInterface } from 'app/interfaces';
import { TrackContainerInterface } from 'app/interfaces';
import { addTrackContainer } from 'app/store/slices/track-container.slice';
import { getDragOffset } from 'app/utils/get-drag-offset.util';

interface ArrangerPropsInterface {
  samples: TrackSampleInterface[];
  setSamples: Dispatch<TrackSampleInterface[]>;
}

const Arranger = ({ samples, setSamples }: ArrangerPropsInterface): ReactElement => {
  const dispatch = useDispatch();
  const arrangerRef = useRef<HTMLDivElement | null>(null);
  const [linesCount, setLinesCount] = useState<number[]>([]);

  useEffect((): void => {
    if (!arrangerRef.current) {
      return;
    }
    const { top, bottom, left, right, width } = arrangerRef.current.getBoundingClientRect();
    const container: TrackContainerInterface = { top, bottom, left, right, id: v4() };
    dispatch(addTrackContainer(container));
    const roundedCount = Math.ceil(width / TIMELINE_SCALE);
    const countArray = Array.from(Array(roundedCount).keys());
    setLinesCount(countArray);
  }, [arrangerRef, dispatch]);

  const [, drop] = useDrop(
    () => ({
      accept: [DragItemTypeEnum.AUDIO_SAMPLE, DragItemTypeEnum.AUDIO_TRACK_SAMPLE],
      drop: (item: TrackSampleInterface, monitor): void => {
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
          updatedSamples = samples.map(sample =>
            sample.id === id ? { ...sample, start } : sample
          );
        }
        setSamples(updatedSamples);
      }
    }),
    [samples]
  );

  return (
    <>
      <div ref={arrangerRef} className={styles.arranger}>
        <div ref={drop} className={styles.droppableArea}>
          {linesCount.map(count => (
            <div
              key={count}
              className={styles.verticalLine}
              style={{ left: count * TIMELINE_SCALE }}
            />
          ))}
          {!samples.length && <span className={styles.placeholder}>Drag & drop samples here</span>}
          {samples.map(
            ({ id, start, name, audioBuffer }): ReactElement => (
              <TrackSample key={id} id={id} name={name} audioBuffer={audioBuffer} start={start} />
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Arranger;
