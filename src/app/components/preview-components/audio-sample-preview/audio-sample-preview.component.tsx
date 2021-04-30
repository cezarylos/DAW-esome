import PlayButton from 'app/components/play-button/play-button.component';
import styles from 'app/components/preview-components/audio-sample-preview/audio-sample-preview.module.scss';
import { DragItemTypeEnum } from 'app/enums/drag-item-type.enum';
import { useGetPreviewRefHook } from 'app/hooks/get-preview-ref.hook';
import classNames from 'classnames';
import React, { ReactElement } from 'react';

const AudioSamplePreview = ({ name, setRef }: any): ReactElement => {

  const ref = useGetPreviewRefHook({ setRef, type: DragItemTypeEnum.AUDIO_SAMPLE });

  return <div ref={ref} className={classNames(styles.container)}>
    <PlayButton isPreview/>
    <span className={styles.name}>{name}</span>
  </div>;
};

export default AudioSamplePreview;
