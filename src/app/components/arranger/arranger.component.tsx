import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { XYCoord } from 'react-dnd/dist/types/types/monitors';
import { useDispatch } from 'react-redux';
import { v4 } from 'uuid';

import { config } from 'app/_config/config';
import { ArrangerPropsInterface } from 'app/components/arranger/arranger.interface';
import styles from 'app/components/arranger/arranger.module.scss';
import TrackSample from 'app/components/track-sample/track-sample.component';
import { DragItemTypeEnum } from 'app/enums/drag-item-type.enum';
import { TrackContainerInterface, TrackSampleInterface } from 'app/interfaces';
import { addTrackContainer } from 'app/store/slices/tracks.slice';
import { getDragOffset } from 'app/utils/get-drag-offset.util';

const Arranger = ({ samples, setSamples }: ArrangerPropsInterface): ReactElement => {
  const dispatch = useDispatch();
  const arrangerRef = useRef<HTMLDivElement | null>(null);
  const [linesCount, setLinesCount] = useState<number[]>([]);

  useEffect((): void => {
    if (!arrangerRef.current) {
      return;
    }
    const { top, bottom, left, right, width } = arrangerRef.current.getBoundingClientRect();
    const parentElement = arrangerRef.current?.parentElement as HTMLDivElement;
    const container: TrackContainerInterface = { top, bottom, left, right, id: v4(), parentElement };
    dispatch(addTrackContainer(container));
    const roundedCount = Math.ceil(width / config.timelineScale);
    const countArray = Array.from(Array(roundedCount).keys());
    setLinesCount(countArray);
  }, [arrangerRef, dispatch]);

  const [, drop] = useDrop(
    () => ({
      accept: [DragItemTypeEnum.AUDIO_SAMPLE, DragItemTypeEnum.AUDIO_TRACK_SAMPLE],
      drop: (item: TrackSampleInterface, monitor): void => {
        const { id, name, audioBuffer, sourceUrl, color } = item;
        const type = monitor.getItemType() as DragItemTypeEnum;
        const delta = monitor.getSourceClientOffset() as XYCoord;
        const containerRect = arrangerRef.current?.getBoundingClientRect();
        if (!containerRect) {
          return;
        }

        let start = delta.x - containerRect.x + getDragOffset(type);
        start = start < 0 ? 0 : start;

        let updatedSamples;
        if (type === DragItemTypeEnum.AUDIO_SAMPLE) {
          const sample = { start, id: v4(), name, audioBuffer, sourceUrl, color };
          updatedSamples = [...samples, sample];
        } else {
          updatedSamples = samples.map(sample => (sample.id === id ? { ...sample, start } : sample));
        }
        setSamples(updatedSamples);
      }
    }),
    [samples]
  );

  const onSampleRemoved = (id: string): (() => void) => (): void => {
    const updatedSamples = samples.filter(sample => sample.id !== id);
    setSamples(updatedSamples);
  };

  return (
    <>
      <div ref={arrangerRef} className={styles.arranger} style={{ width: config.width }}>
        <div ref={drop} className={styles.droppableArea}>
          {linesCount.map(count => (
            <div key={count} className={styles.verticalLine} style={{ left: count * config.timelineScale }} />
          ))}
          {samples.map(
            ({ id, start, name, audioBuffer, sourceUrl, color }): ReactElement => (
              <TrackSample
                key={id}
                id={id}
                name={name}
                audioBuffer={audioBuffer}
                start={start}
                sourceUrl={sourceUrl}
                color={color}
                onSampleRemove={onSampleRemoved(id)}
              />
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Arranger;
