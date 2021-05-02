import React, { ReactElement } from 'react';

import AudioSample from 'app/components/audio-sample/audio-sample.component';
import { samples } from 'app/consts/samples';
import styles from 'app/views/stencil/stencil.module.scss';

const Stencil = (): ReactElement => (
  <div className={styles.container}>
    <h5 className={styles.header}>Samples</h5>
    <div className={styles.samples}>
      {samples.map(({ name, sourceUrl, color }) => (
        <AudioSample key={sourceUrl} name={name} sourceUrl={sourceUrl} color={color} />
      ))}
    </div>
  </div>
);

export default Stencil;
