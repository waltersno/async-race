import React from 'react';
import './navigation.scss';
import { NavLink } from 'react-router-dom';

const Navigation: React.FC = (): JSX.Element => (
  <ul className="navigation">
    <li className="navigation__item">
      <NavLink to="/garage">Garage</NavLink>
    </li>
    <li className="navigation__item">
      <NavLink to="/winners">Winners</NavLink>
    </li>
  </ul>
);

export default Navigation;
