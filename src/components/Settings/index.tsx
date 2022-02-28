import React, { useState } from 'react';
import { APIContext } from '../../context';
import ServerAPI from '../../server-api';
import { ICar, IPathData, IWinner } from '../../server-api/server-types';
import Button from '../Atoms/Button';
import { carBrand, carModel } from './cars';
import './settings.scss';

interface IFinishedcar {
  roadTime: number;
  id: number;
  name: string;
}

const Settings: React.FC = (): JSX.Element => {
  const {
    cars: {
      carsList, fetchCars, currentPage, fetchFullCars,
    },
    winners: { winnersPage, fetchWinners },
  } = React.useContext(APIContext);
  const winnerPopup = React.useRef<HTMLDivElement>(null);
  const [finishedCar, setFinishedCar] = useState<IFinishedcar | null>(null);
  const [raceStartBtnDisabled, setRaceStartBtnDisabled] = useState<boolean>(false);

  const createOrUpdateWinner = async (data: IWinner) => {
    const response = await ServerAPI.postWinner(data);
    if (response?.status === 500) {
      const oldWinner = await ServerAPI.getWinner(data.id);
      if (oldWinner) {
        const newWinner = {
          ...oldWinner,
          wins: oldWinner.wins + 1,
          time: oldWinner.time < data.time ? oldWinner.time : data.time,
        };
        await ServerAPI.updateWinner(newWinner);
      }
    }
    fetchWinners(winnersPage);
  };

  const turnOnEngine = (
    carIcon: SVGSVGElement,
    carItem: ICar,
    allFinishedTimes: IFinishedcar[],
  ): void => {
    ServerAPI.enginePath(carItem.id, 'started')
      .then((res) => res?.json())
      .then((data: IPathData) => {
        if (data && carIcon && carIcon.parentElement) {
          const roadTime = ((data.distance / data.velocity) / 1000).toFixed(2);
          allFinishedTimes.push({ roadTime: +roadTime, id: carItem.id, name: carItem.name });
          carIcon.style.animationDuration = `${roadTime}s`;
          carIcon.classList.add('drive');
        }
      });
  };

  const turnOnDriveMode = (
    carIcon: SVGSVGElement,
    carItem: ICar,
    allFinishedTimes: IFinishedcar[],
    raceFininshers: ICar[],
  ): void => {
    ServerAPI.enginePath(carItem.id, 'drive').then((drivedData) => {
      if (drivedData?.status === 500) {
        carIcon.classList.add('crash');
      } else if (drivedData?.status === 200) {
        if (!raceFininshers.length) {
          raceFininshers.push(carItem);
          const finishedCarItem = allFinishedTimes.find((car) => car.id === carItem.id);
          if (finishedCarItem) {
            createOrUpdateWinner({
              id: finishedCarItem.id,
              wins: 1,
              time: finishedCarItem.roadTime,
            });
            setFinishedCar(finishedCarItem);
            setTimeout(() => {
              setFinishedCar(null);
            }, 3000);
          }
        }
      }
    });
  };

  const raceStartHandler = async () => {
    setRaceStartBtnDisabled(true);
    const cars: NodeListOf<SVGSVGElement> = document.querySelectorAll('.car-icon');
    const buttonWrappers: NodeListOf<HTMLDivElement> = document.querySelectorAll('.race-road__btns');
    const raceFininshers: ICar[] = [];
    const allFinishedTimes: IFinishedcar[] = [];

    for (let index = 0; index < carsList.length; index += 1) {
      const startBtn = buttonWrappers[index].firstChild as HTMLButtonElement;
      const endBtn = buttonWrappers[index].lastChild as HTMLButtonElement;
      startBtn.disabled = true;
      endBtn.disabled = true;
      const carIcon = cars[index];
      const carItem = carsList[index];

      turnOnEngine(carIcon, carItem, allFinishedTimes);

      turnOnDriveMode(carIcon, carItem, allFinishedTimes, raceFininshers);

      endBtn.disabled = false;
    }
  };

  const resetHandler = () => {
    const cars: NodeListOf<SVGSVGElement> = document.querySelectorAll('.car-icon');
    const buttonWrappers: NodeListOf<HTMLDivElement> = document.querySelectorAll('.race-road__btns');
    for (let index = 0; index < carsList.length; index += 1) {
      const startBtn = buttonWrappers[index].firstChild as HTMLButtonElement;
      const endBtn = buttonWrappers[index].lastChild as HTMLButtonElement;
      const carIcon = cars[index];
      const carItem = carsList[index];
      endBtn.disabled = true;
      ServerAPI.enginePath(carItem.id, 'stopped').then(() => {
        carIcon.classList.remove('crash', 'drive');
      });
      startBtn.disabled = false;
    }
    setRaceStartBtnDisabled(false);
  };

  const generateCarsHandler = () => {
    const carArray: Promise<void>[] = [];
    for (let index = 0; index < 100; index += 1) {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      const randomBrand = Math.floor(Math.random() * 10);
      const randomModel = Math.floor(Math.random() * 10);
      const postData = {
        name: `${carBrand[randomBrand]} ${carModel[randomModel]}`,
        color: `#${randomColor}`,
      };
      const postedCarPromise = ServerAPI.postCar(postData);
      carArray.push(postedCarPromise);
    }
    Promise.all(carArray).then(() => {
      fetchCars(currentPage);
      fetchFullCars();
    });
  };

  return (
    <div className="settings-wrapper">
      <Button title="Race" onClick={raceStartHandler} isDisabled={raceStartBtnDisabled} />
      <Button title="Reset" onClick={resetHandler} type="reset" />
      <Button title="Generate cars" onClick={generateCarsHandler} />
      {finishedCar && (
      <div className="winner-popup" ref={winnerPopup}>
        <p>
          {finishedCar.name}
          {' '}
          went first
          {' '}
          {finishedCar.roadTime}
        </p>
      </div>
      )}

    </div>
  );
};

export default Settings;
