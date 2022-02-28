import React from 'react';
import { CarProps } from '../../../common-types';
import { APIContext } from '../../../context';
import ServerAPI from '../../../server-api';
import Button from '../../Atoms/Button';

const CarHeader: React.FC<CarProps> = ({ id, name, color }): JSX.Element => {
  const {
    cars: {
      fetchCars, selectedCar, setSelectedCar, currentPage, fetchFullCars,
    },
  } = React.useContext(APIContext);

  const selectHandler = () => {
    if (selectedCar && id === selectedCar!.id) {
      setSelectedCar(null);
    } else {
      setSelectedCar({ id, color, name });
    }
  };

  const removeCarHandler = async () => {
    await ServerAPI.removeCar(id);
    await ServerAPI.removeWinner(id);
    await fetchCars(currentPage);
    await fetchFullCars();
    if (selectedCar && selectedCar.id === id) {
      setSelectedCar(null);
    }
  };

  return (
    <div className="car__header">
      <Button
        onClick={selectHandler}
        title="Select"
        type={`${selectedCar && selectedCar.id === id ? 'reset' : 'success'}`}
        // className={selectedCar && selectedCar.id === id ? 'success' : ''}
      />
      <Button onClick={removeCarHandler} title="Remove" type="reset" />
      <span>{name}</span>
    </div>
  );
};

export default CarHeader;
