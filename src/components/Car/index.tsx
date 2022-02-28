import React from 'react';
import { CarProps } from '../../common-types';
import { APIContext } from '../../context';
import './car.scss';
import CarHeader from './CarHeader';
import CarRace from './CarRace';

const Car: React.FC<CarProps> = ({ id, color, name }): JSX.Element => {
  const {
    cars: { selectedCar },
  } = React.useContext(APIContext);

  return (
    <li className={`car ${selectedCar && selectedCar.id === id ? 'selected' : ''}`}>
      <CarHeader name={name} id={id} color={color} />
      <CarRace color={color} id={id} />
    </li>
  );
};

export default Car;
