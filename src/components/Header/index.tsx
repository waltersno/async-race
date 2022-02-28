import React from 'react';
import logo from '../../assets/races-speed-svgrepo-com.svg';
import Navigation from './Navigation';
import './header.scss';

const Header: React.FC = (): JSX.Element => (
  <header className="header">
    <div className="header__logo">
      <img src={logo} alt="" />
      <div className="header__logo-name">
        <p>ASYNC</p>
        <p>RACE</p>
      </div>
    </div>
    <div className="header__nav">
      <Navigation />
    </div>
  </header>
);

export default Header;
