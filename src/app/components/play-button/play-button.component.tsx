import classNames from 'classnames';
import React, { ReactElement } from 'react';

import { PlayButtonPropsInterface } from 'app/components/play-button/play-button.interface';
import styles from 'app/components/play-button/play-button.module.scss';
import play from 'assets/images/play.svg';
import play_light from 'assets/images/play_light.svg';
import stop from 'assets/images/stop.svg';

const PlayButton = ({ onClick, isPlaying = false, isPreview, className }: PlayButtonPropsInterface): ReactElement => (
  <div className={classNames(styles.container, isPreview && styles.isPreview, className)} onClick={onClick}>
    {isPreview ? (
      <img src={play_light} alt="play" />
    ) : (
      <img className={isPlaying ? styles.stop : ''} src={isPlaying ? stop : play} alt="play/pause" />
    )}
  </div>
);

export default PlayButton;
