import DragLayer from 'app/components/drag-layer/drag-layer.component';
import React, { ReactElement } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from 'app/App.module.scss';
import AudioTrack from 'app/components/audio-track/audio-track.component';
import Navbar from 'app/views/navbar/navbar.component';
import Stencil from 'app/views/stencil/stencil.component';
import { AppAudioContext } from './context/audio.context';

const App = (): ReactElement =>
  <AppAudioContext.Provider value={new AudioContext()}>
    <div className={styles.container}>
      <Navbar/>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.main}>
          <Stencil/>
          <div className={styles.tracks}>
            <AudioTrack/>
            <DragLayer/>
          </div>
        </div>
      </DndProvider>
    </div>
  </AppAudioContext.Provider>;
export default App;
