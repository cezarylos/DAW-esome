import React, { ReactElement } from 'react';

import styles from 'app/views/navbar/navbar.module.scss';
import logo from 'assets/images/logo.svg';

const Navbar = (): ReactElement => (
  <div className={styles.container}>
    <img src={logo} alt="logo" />
    <h5>My Studio</h5>
  </div>
);

export default Navbar;
