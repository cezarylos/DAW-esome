import React, { ReactElement } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from 'app/App.module.scss';
import DragLayer from 'app/components/drag-layer/drag-layer.component';
import Track from 'app/components/track/track.component';
import { AppAudioContext } from 'app/context/audio.context';
import Navbar from 'app/views/navbar/navbar.component';
import Stencil from 'app/views/stencil/stencil.component';

const App = (): ReactElement => (
  <AppAudioContext.Provider value={new AudioContext()}>
    <div className={styles.container}>
      <Navbar />
      <DndProvider backend={HTML5Backend}>
        <div className={styles.main}>
          <Stencil />
          <div className={styles.tracks}>
            <Track />
            <DragLayer />
          </div>
        </div>
      </DndProvider>
    </div>
  </AppAudioContext.Provider>
);
export default App;
