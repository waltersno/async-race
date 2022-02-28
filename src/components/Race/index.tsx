import React from 'react';
import { APIContext } from '../../context';
import LoadingCircel from '../Atoms/LoadingCircle';
import Car from '../Car';
import PageHeader from '../PageHeader';
import './race.scss';

const Race = () => {
  const {
    cars: {
      isLoading, carsList, fetchCars, currentPage,
    },
  } = React.useContext(APIContext);

  const carItems = carsList.length ? (
    carsList.map((car) => (
      <Car color={car.color} name={car.name} key={car.id} id={car.id} />
    ))
  ) : (
    <h3>There are no cars in the garage</h3>
  );

  React.useEffect(() => {
    if (fetchCars) {
      fetchCars(currentPage);
    }
  }, [currentPage]);

  return (
    <div className="race">
      <PageHeader title="Garage" />
      <ul className="race__body">{isLoading ? <LoadingCircel /> : carItems}</ul>
    </div>
  );
};

export default Race;
