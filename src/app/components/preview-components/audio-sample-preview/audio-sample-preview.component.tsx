import styles from 'app/components/preview-components/audio-sample-preview/audio-sample-preview.module.scss';
import PlayButton from 'app/components/play-button/play-button.component';
import classNames from 'classnames';
import React, { ReactElement } from 'react';

const AudioSamplePreview = ({ name }: any): ReactElement => {

  return <div className={classNames(styles.container)}>
    <PlayButton isPreview/>
    <span className={styles.name}>{name}</span>
  </div>;
};

export default AudioSamplePreview;
