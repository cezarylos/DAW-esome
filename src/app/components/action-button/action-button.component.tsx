import classNames from 'classnames';
import React, { ReactElement } from 'react';

import { ActionButtonPropsInterface } from 'app/components/action-button/action-button.interface';
import styles from 'app/components/action-button/action-button.module.scss';

const ActionButton = ({ label, onClick, className = '', isDisabled }: ActionButtonPropsInterface): ReactElement => (
  <button disabled={isDisabled} onClick={onClick} className={classNames(styles.container, className)}>
    <span>{label}</span>
  </button>
);

export default ActionButton;
