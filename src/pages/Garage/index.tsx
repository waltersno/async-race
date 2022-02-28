import React from 'react';
import CarTuning from '../../components/CarTuning';
import Race from '../../components/Race';
import Settings from '../../components/Settings';
import './garage.scss';

const Garage: React.FC = (): JSX.Element => (
  <div className="garage">
    <div className="tuning-wrapper">
      <CarTuning title="Create" />
      <CarTuning title="Update" />
    </div>
    <Settings />
    <Race />
  </div>
);

export default Garage;
