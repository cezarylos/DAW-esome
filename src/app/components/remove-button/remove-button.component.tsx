import classNames from 'classnames';
import React, { ReactElement } from 'react';

import { RemoveButtonPropsInterface } from 'app/components/remove-button/remove-button.interface';
import styles from 'app/components/remove-button/remove-button.module.scss';
import close from 'assets/images/close.svg';

const RemoveButton = ({ onClick, className = '' }: RemoveButtonPropsInterface): ReactElement => (
  <div onClick={onClick} className={classNames(styles.container, className)}>
    <img src={close} alt="close" />
  </div>
);

export default RemoveButton;
