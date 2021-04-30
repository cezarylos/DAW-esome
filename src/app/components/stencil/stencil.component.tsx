import React, { ReactElement } from 'react';

import AudioSample from 'app/components/audio-sample/audio-sample.component';
import styles from 'app/components/stencil/stencil.module.scss';
import { samples } from 'app/consts/samples';

const Stencil = (): ReactElement => (
  <div className={styles.container}>
    <h5 className={styles.header}>Samples</h5>
    <div className={styles.samples}>
      {samples.map(({ name, sourceUrl }) => (
        <AudioSample key={sourceUrl} name={name} sourceUrl={sourceUrl} />
      ))}
    </div>
  </div>
);

export default Stencil;
