import { PlayButtonPropsInterface } from 'app/components/play-button/play-button.interface';
import React, { ReactElement } from 'react';

import styles from 'app/components/play-button/play-button.module.scss';
import play from 'assets/images/play.svg';

const PlayButton = ({ onClick }: PlayButtonPropsInterface): ReactElement =>
  <div className={styles.container} onClick={onClick}>
    <img src={play} alt='play'/>
  </div>

export default PlayButton;
