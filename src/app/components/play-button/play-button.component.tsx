import { PlayButtonPropsInterface } from 'app/components/play-button/play-button.interface';
import React, { ReactElement } from 'react';

import styles from 'app/components/play-button/play-button.module.scss';
import play from 'assets/images/play.svg';
import stop from 'assets/images/stop.svg';

const PlayButton = ({ onClick, isPlaying = false }: PlayButtonPropsInterface): ReactElement =>
  <div className={styles.container} onClick={onClick}>
    <img className={isPlaying ? styles.stop : ''} src={isPlaying ? stop : play} alt='play/pause'/>
  </div>

export default PlayButton;
