import classNames from 'classnames';
import React, { ReactElement } from 'react';

import PlayButton from 'app/components/play-button/play-button.component';
import { AudioSamplePreviewPropsInterface } from 'app/components/preview-components/audio-sample-preview/audio-sample-preview.interface';
import styles from 'app/components/preview-components/audio-sample-preview/audio-sample-preview.module.scss';
import { DragItemTypeEnum } from 'app/enums/drag-item-type.enum';
import { useGetPreviewRefHook } from 'app/hooks/get-preview-ref.hook';

const AudioSamplePreview = ({ name, setRef }: AudioSamplePreviewPropsInterface): ReactElement => {
  const ref = useGetPreviewRefHook({ setRef, type: DragItemTypeEnum.AUDIO_SAMPLE });

  return (
    <div ref={ref} className={classNames(styles.container)}>
      <PlayButton isPreview />
      <span className={styles.name}>{name}</span>
    </div>
  );
};

export default AudioSamplePreview;
