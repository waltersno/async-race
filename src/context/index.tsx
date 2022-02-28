import React from 'react';
import ServerAPI from '../server-api';
import {
  ICar, ICarNoID, IWinner, SortParams,
} from '../server-api/server-types';

interface ISortSettings {
  whatToSort: undefined | 'wins' | 'time',
  sortType: undefined | SortParams
}

interface ICarsState {
  cars: {
    fullCars: ICar[];
    setFullCars: React.Dispatch<React.SetStateAction<ICar[]>>;
    isLoading: boolean;
    carsList: ICar[];
    fetchCars: (carPage: number) => Promise<void>;
    selectedCar: ICar | null;
    setSelectedCar: React.Dispatch<React.SetStateAction<ICar | null>>;
    creatingCar: ICarNoID;
    setCreatingCar: React.Dispatch<React.SetStateAction<ICarNoID>>;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    carCount: number;
    fetchFullCars: () => Promise<void>;
  };
  winners: {
    winnersCount: number;
    winnersPage: number;
    setWinnersPage: React.Dispatch<React.SetStateAction<number>>;
    winnersList: IWinner[];
    setWinnersList: React.Dispatch<React.SetStateAction<IWinner[]>>;
    fetchWinners: (
      page: number,
      whatToSort?: string | undefined,
      sortParam?:
      SortParams | undefined,
    ) => void;
    sortSettings: ISortSettings;
    setSortSettings: React.Dispatch<React.SetStateAction<ISortSettings>>;
  };
}

export const APIContext = React.createContext<ICarsState>(
  {} as unknown as ICarsState,
);

const APIContextProvider: React.FC = ({ children }): JSX.Element => {
  const [fullCars, setFullCars] = React.useState<ICar[]>([]);
  const [carsList, setCars] = React.useState<ICar[]>([]);
  const [selectedCar, setSelectedCar] = React.useState<ICar | null>(null);
  const [creatingCar, setCreatingCar] = React.useState<ICarNoID>({
    name: '',
    color: '#000000',
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [carCount, setCarCount] = React.useState<number>(0);

  const [winnersList, setWinnersList] = React.useState<IWinner[]>([]);
  const [winnersCount, setWinnersCount] = React.useState<number>(0);
  const [winnersPage, setWinnersPage] = React.useState<number>(1);
  const [sortSettings, setSortSettings] = React.useState<ISortSettings>({
    whatToSort: undefined,
    sortType: undefined,
  });

  const fetchCars = async (carPage: number): Promise<void> => {
    setIsLoading(true);
    const cars = await ServerAPI.getData<ICar[]>('garage', carPage, 7);
    if (cars) {
      setCars(cars[0]);
      setIsLoading(false);
      if (+cars[1] !== carCount) {
        setCarCount(+cars[1]);
      }
    }
  };

  const fetchWinners = async (
    page: number,
    whatToSort?: string | undefined,
    sortParam?:
    SortParams | undefined,
  ): Promise<void> => {
    const winners = await ServerAPI.fetchSortedWinners(page, whatToSort, sortParam);
    if (winners) {
      setWinnersList(winners[0]);
      if (+winners[1] !== winnersCount) {
        setWinnersCount(+winners[1]);
      }
    }
  };

  const fetchFullCars = async (): Promise<void> => {
    const cars = await ServerAPI.getFullCars();
    if (cars) {
      setFullCars(cars);
    }
  };

  const carState = React.useMemo(
    () => ({
      cars: {
        fullCars,
        setFullCars,
        isLoading,
        carsList,
        fetchCars,
        selectedCar,
        setSelectedCar,
        currentPage,
        setCurrentPage,
        carCount,
        creatingCar,
        setCreatingCar,
        fetchFullCars,
      },
      winners: {
        winnersCount,
        winnersPage,
        setWinnersPage,
        winnersList,
        setWinnersList,
        fetchWinners,
        sortSettings,
        setSortSettings,
      },
    }),
    [
      isLoading,
      selectedCar,
      currentPage,
      carCount,
      creatingCar,
      winnersPage,
      winnersCount,
      fetchWinners,
      fetchFullCars,
    ],
  );

  React.useEffect(() => {
    fetchFullCars();
    fetchCars(1);
    fetchWinners(1);
  }, []);

  return <APIContext.Provider value={carState}>{children}</APIContext.Provider>;
};

export default APIContextProvider;
