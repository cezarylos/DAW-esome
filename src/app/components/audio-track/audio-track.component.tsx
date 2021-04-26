import React, { ReactElement, useState } from 'react';

import Arranger from 'app/components/arranger/arranger.component';
import { AudioTrackSampleComponentInterface } from 'app/components/audio-track-sample/audio-track-sample.component';
import styles from 'app/components/audio-track/audio-track.module.scss';
import PlayButton from 'app/components/play-button/play-button.component';

const AudioTrack = (): ReactElement => {
  const [samples, setSamples] = useState<AudioTrackSampleComponentInterface[]>([]);

  return (
    <div className={styles.container}>
      <div className={styles.options}>
        <PlayButton onClick={() => console.log(123)}/>
      </div>
      <Arranger samples={samples} setSamples={setSamples}/>
    </div>
  );
};

export default AudioTrack;
