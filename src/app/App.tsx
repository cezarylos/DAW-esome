import React, { ReactElement } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AudioContext } from 'standardized-audio-context';

import styles from 'app/App.module.scss';
import DragLayer from 'app/components/drag-layer/drag-layer.component';
import Navbar from 'app/components/navbar/navbar.component';
import SavedTracks from 'app/components/saved-tracks/saved-tracks.component';
import Stencil from 'app/components/stencil/stencil.component';
import Track from 'app/components/track/track.component';
import { AppAudioContext } from 'app/context/audio.context';

const App = (): ReactElement => (
  <AppAudioContext.Provider value={new AudioContext()}>
    <div className={styles.container}>
      <Navbar />
      <div className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <Stencil />
          <div className={styles.explorer}>
            <div className={styles.tracks}>
              <Track />
              <DragLayer />
            </div>
            <SavedTracks />
          </div>
        </DndProvider>
      </div>
    </div>
  </AppAudioContext.Provider>
);
export default App;
