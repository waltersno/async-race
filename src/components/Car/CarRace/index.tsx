import './raceRoad.scss';
import React from 'react';
import { ReactComponent as CarIcon } from '../../../assets/newcar.svg';
import { ReactComponent as FinishIcon } from '../../../assets/goal-svgrepo-com.svg';
import ServerAPI from '../../../server-api';
import { IPathData } from '../../../server-api/server-types';

interface ICarRace {
  color: string;
  id: number;
}

const CarRace: React.FC<ICarRace> = ({ color, id }): JSX.Element => {
  const carImage = React.useRef<SVGSVGElement>(null);
  const startBtnRef = React.useRef<HTMLButtonElement>(null);
  const endBtnRef = React.useRef<HTMLButtonElement>(null);

  const startRaceHandler = async (): Promise<void> => {
    if (startBtnRef.current && endBtnRef.current) {
      startBtnRef.current.disabled = true;
      endBtnRef.current.disabled = true;
    }

    const response = await ServerAPI.enginePath(id, 'started');
    const pathData: IPathData = await response?.json();

    if (response && carImage.current && carImage.current.parentElement) {
      const roadTime = pathData.distance / pathData.velocity;
      carImage.current.style.animationDuration = `${(roadTime / 1000).toFixed(2)}s`;
      carImage.current.classList.add('drive');
    }

    if (startBtnRef.current && endBtnRef.current) {
      startBtnRef.current.disabled = true;
      endBtnRef.current.disabled = false;
    }

    const drivedData = await ServerAPI.enginePath(id, 'drive');

    if (drivedData?.status === 500) {
      carImage.current?.classList.add('crash');
    }
  };

  const resetRaceHandler = async () => {
    if (startBtnRef.current && endBtnRef.current) {
      endBtnRef.current.disabled = true;
    }
    await ServerAPI.enginePath(id, 'stopped');
    if (carImage.current && carImage.current.style) {
      carImage.current.classList.remove('crash', 'drive');
    }
    if (startBtnRef.current && endBtnRef.current) {
      startBtnRef.current.disabled = false;
    }
  };

  React.useEffect(() => {
    if (endBtnRef.current) {
      endBtnRef.current.disabled = true;
    }
  }, []);

  return (
    <div className="race-road">
      <div className="race-road__btns">
        <button
          onClick={startRaceHandler}
          type="submit"
          className="race-road__btn race-road__btn_start"
          ref={startBtnRef}
        >
          A
        </button>
        <button
          onClick={resetRaceHandler}
          type="submit"
          className="race-road__btn race-road__btn_finish"
          ref={endBtnRef}
        >
          B
        </button>
      </div>
      <div className="race-road__body">
        <CarIcon fill={color} ref={carImage} className="car-icon" />
        <FinishIcon />
      </div>
    </div>
  );
};

export default CarRace;
