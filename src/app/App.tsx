import React, { ReactElement } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AudioContext } from 'standardized-audio-context';

import styles from 'app/App.module.scss';
import { AppAudioContext } from 'app/context/audio.context';
import Main from 'app/views/main/main';
import Navbar from 'app/views/navbar/navbar.component';

const App = (): ReactElement => (
  <AppAudioContext.Provider value={new AudioContext()}>
    <div className={styles.container}>
      <Navbar />
      <DndProvider backend={HTML5Backend}>
        <Main />
      </DndProvider>
    </div>
  </AppAudioContext.Provider>
);
export default App;
