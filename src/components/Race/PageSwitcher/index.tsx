import React from 'react';
import Button from '../../Atoms/Button';
import prevBtn from '../../../assets/previous-svgrepo-com.svg';
import nextBtn from '../../../assets/next-svgrepo-com.svg';
import './pageSwitcher.scss';
import { APIContext } from '../../../context';

interface IPageSwitcher {
  title: string;
}

const PageSwitcher: React.FC<IPageSwitcher> = ({ title }) => {
  const {
    cars: {
      currentPage,
      setCurrentPage,
      carCount,
      fetchCars,
    },
    winners: {
      winnersPage,
      setWinnersPage,
      winnersCount,
      fetchWinners,
      sortSettings,
    },
  } = React.useContext(APIContext);

  const [disabledLeft, setDisabledLeft] = React.useState<boolean>(true);
  const [disabledRight, setDisabledRight] = React.useState<boolean>(false);

  const prevPageHandler = () => {
    if (title === 'Garage') {
      if (!(currentPage === 1)) {
        setCurrentPage((prev) => prev - 1);
      }
    } else if (!(winnersPage === 1)) {
      setWinnersPage((prev) => prev - 1);
    }
  };
  const nextPageHandler = () => {
    if (title === 'Garage') {
      setCurrentPage((prev) => prev + 1);
    } else {
      setWinnersPage((prev) => prev + 1);
    }
  };

  React.useEffect(() => {
    if (title === 'Garage') {
      if (currentPage === 1) {
        setDisabledLeft(true);
      } else {
        setDisabledLeft(false);
      }
      if (carCount / currentPage > 7) {
        setDisabledRight(false);
      } else {
        setDisabledRight(true);
      }
      if (fetchCars) {
        fetchCars(currentPage);
      }
    }
  }, [currentPage, setCurrentPage, carCount]);

  React.useEffect(() => {
    if (title === 'Winners') {
      if (winnersPage === 1) {
        setDisabledLeft(true);
      } else {
        setDisabledLeft(false);
      }
      if (winnersCount / winnersPage > 10) {
        setDisabledRight(false);
      } else {
        setDisabledRight(true);
      }
      if (fetchWinners) {
        fetchWinners(winnersPage, sortSettings.whatToSort, sortSettings.sortType);
      }
    }
  }, [winnersPage, setWinnersPage, winnersCount]);

  return (
    <div className="page-switcher">
      <Button
        isDisabled={disabledLeft}
        onClick={prevPageHandler}
        image={prevBtn}
      />
      <p>{title === 'Garage' ? currentPage : winnersPage}</p>
      <Button
        isDisabled={disabledRight}
        onClick={nextPageHandler}
        image={nextBtn}
      />
    </div>
  );
};

export default PageSwitcher;
