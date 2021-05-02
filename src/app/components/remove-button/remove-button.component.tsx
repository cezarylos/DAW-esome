import classNames from 'classnames';
import React, { ReactElement } from 'react';

import { RemoveButtonPropsInterface } from 'app/components/remove-button/remove-button.interface';
import styles from 'app/components/remove-button/remove-button.module.scss';
import close from 'assets/images/close.svg';
import close_white from 'assets/images/close_white.svg';

const RemoveButton = ({ onClick, className = '', isWhiteIcon }: RemoveButtonPropsInterface): ReactElement => (
  <div onClick={onClick} className={classNames(styles.container, className)}>
    <img src={isWhiteIcon ? close_white : close} alt="close" />
  </div>
);

export default RemoveButton;
