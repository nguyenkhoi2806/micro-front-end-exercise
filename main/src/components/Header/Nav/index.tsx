import React, { useCallback } from 'react';
import { NavLink, useLocation  } from 'react-router-dom';


import styles from '../Header.module.scss';

const Nav = () => {
  const location = useLocation(); 

  const menuClassActive = useCallback((pathname: string) =>  {
    if(location.pathname === pathname) {
      return styles.menu__active
    }
  }, [location.pathname])

  return (
    <nav className={styles.header__menu}>
      <ul>
        <li className={menuClassActive("/")}>
          <NavLink to="/">Home</NavLink>
        </li>
        <li className={menuClassActive("/shop")}>
          <NavLink to="/shop">Shop</NavLink>
        </li>
        <li className={menuClassActive("/contact")}>
          <NavLink to="/contact">Contact</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
