import React, { ReactElement } from 'react';

import DragLayer from 'app/components/drag-layer/drag-layer.component';
import styles from 'app/views/main/main.module.scss';
import SavedTracks from 'app/views/saved-tracks/saved-tracks';
import Stencil from 'app/views/stencil/stencil';
import Tracks from 'app/views/tracks/tracks';

const Main = (): ReactElement => (
  <div className={styles.container}>
    <Stencil />
    <div className={styles.tracks}>
      <Tracks />
      <SavedTracks />
    </div>
    <DragLayer />
  </div>
);

export default Main;
