import classNames from 'classnames';
import React, { ReactElement } from 'react';

import { PlayButtonPropsInterface } from 'app/components/play-button/play-button.interface';
import styles from 'app/components/play-button/play-button.module.scss';
import pause from 'assets/images/pause.svg';
import play from 'assets/images/play.svg';
import play_light from 'assets/images/play_light.svg';
import stop from 'assets/images/stop.svg';
import stop_light from 'assets/images/stop_light.svg';

const PlayButton = ({
  onClick,
  isPlaying = false,
  isPreview,
  className = '',
  isDisabled,
  isPause
}: PlayButtonPropsInterface): ReactElement => {
  const renderButton = (): ReactElement => {
    if (!isPreview) {
      return <img className={classNames(isPlaying && styles.stop)} src={isPlaying ? stop : play} alt="play/stop" />;
    } else if (isPause && isPlaying) {
      return <img className={styles.pause} src={pause} alt="pause" />;
    }
    return (
      <img className={classNames(isPlaying && styles.stop)} src={isPlaying ? stop_light : play_light} alt="play/stop" />
    );
  };

  return (
    <div
      className={classNames(
        styles.container,
        isPreview && styles.isPreview,
        isDisabled && styles.isDisabled,
        className
      )}
      onClick={onClick}
    >
      {renderButton()}
    </div>
  );
};

export default PlayButton;
