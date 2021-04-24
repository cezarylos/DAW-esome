import styles from 'app/components/audio-track/audio-track.module.scss';
import PlayButton from 'app/components/play-button/play-button.component';
import React, { ReactElement } from 'react';

const AudioTrack = (): ReactElement => {
  return (
    <div className={styles.container}>
      <div className={styles.options}>
        <PlayButton onClick={() => console.log(123)}/>
      </div>
      <div className={styles.arranger}/>
    </div>
  )
}

export default AudioTrack;
