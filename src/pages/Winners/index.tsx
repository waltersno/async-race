import React from 'react';
import { ReactComponent as ArrowIcon } from '../../assets/up-arrow-svgrepo-com.svg';
import PageHeader from '../../components/PageHeader';
import WinnerRow from '../../components/WinnerRow';
import { APIContext } from '../../context';
import ServerAPI from '../../server-api';
import './winners.scss';
import { SortParams } from '../../server-api/server-types';

const Winners: React.FC = (): JSX.Element => {
  const {
    winners: {
      winnersList, winnersPage, setWinnersList, sortSettings, setSortSettings,
    },
    cars: { fullCars },
  } = React.useContext(APIContext);

  const sorByWinsHandle = async () => {
    let sortParam: SortParams;
    if (sortSettings.sortType === 'ASC') {
      sortParam = 'DESC';
    } else {
      sortParam = 'ASC';
    }
    const sortedWinners = await ServerAPI.fetchSortedWinners(winnersPage, 'wins', sortParam);
    if (sortedWinners) {
      setWinnersList(sortedWinners[0]);
      setSortSettings({ whatToSort: 'wins', sortType: sortParam });
    }
  };

  const sortByTimes = async () => {
    let sortParam: SortParams;
    if (sortSettings.sortType === 'ASC') {
      sortParam = 'DESC';
    } else {
      sortParam = 'ASC';
    }
    const sortedWinners = await ServerAPI.fetchSortedWinners(winnersPage, 'time', sortParam);
    if (sortedWinners) {
      setWinnersList(sortedWinners[0]);
      setSortSettings({ whatToSort: 'time', sortType: sortParam });
    }
  };

  let winsArrow = '';
  let timeArrow = '';

  if (sortSettings.whatToSort === 'wins') {
    if (sortSettings.sortType === 'ASC') {
      winsArrow = 'asc';
    } else if (sortSettings.sortType === 'DESC') {
      winsArrow = 'desc';
    }
  } else if (sortSettings.whatToSort === 'time') {
    if (sortSettings.sortType === 'ASC') {
      timeArrow = 'asc';
    } else if (sortSettings.sortType === 'DESC') {
      timeArrow = 'desc';
    }
  }

  return (
    <div className="winners">
      <PageHeader title="Winners" />
      <table className="winners__table">
        <thead>
          <tr>
            <th>Number</th>
            <th>Car</th>
            <th>Name</th>
            <th>
              <button type="submit" onClick={sorByWinsHandle} className="sort-btns-wrapper">
                <span>Wins</span>
                <ArrowIcon fill="#fff" className={`${winsArrow}`} />
              </button>
            </th>
            <th>
              <button onClick={sortByTimes} type="submit" className="sort-btns-wrapper">
                <span>Best time (seconds)</span>
                <ArrowIcon fill="#fff" className={`${timeArrow}`} />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {winnersList.map((winner) => {
            const car = fullCars.find((item) => item.id === winner.id);
            if (car) {
              return (
                <WinnerRow
                  key={winner.id}
                  number={winner.id}
                  color={car.color}
                  carModel={car.name}
                  winsTime={winner.wins}
                  bestTime={winner.time}
                />
              );
            }
            return null;
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Winners;
