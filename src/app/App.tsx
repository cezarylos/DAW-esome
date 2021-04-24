import styles from 'app/App.module.scss';
import Navbar from 'app/views/navbar/navbar.component';
import Stencil from 'app/views/stencil/stencil.component';
import React, { ReactElement } from 'react';

const App = (): ReactElement =>
  <div className={styles.App}>
    <div className={styles.container}>
      <Navbar/>
      <div className={styles.main}>
        <Stencil/>
      </div>
    </div>
  </div>;

export default App;