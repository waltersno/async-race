import React from 'react';
import { ReactComponent as CarIcon } from '../../assets/sports-car-svgrepo-com.svg';
import { APIContext } from '../../context';
import ServerAPI from '../../server-api';
import Button from '../Atoms/Button';
import './carTuning.scss';

interface ITuning {
  title: string;
}

const CarTuning: React.FC<ITuning> = ({ title }): JSX.Element => {
  const [color, setColor] = React.useState<string>('#000000');
  const [input, setInput] = React.useState<string>('');
  const {
    cars: {
      fetchCars,
      selectedCar,
      setSelectedCar,
      currentPage,
      creatingCar,
      setCreatingCar,
      fetchFullCars,
    },
  } = React.useContext(APIContext);

  const colorInput = React.useRef<HTMLInputElement>(null);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const isUnclickable = !selectedCar && title === 'Update';

  const updateConfSelectedCar = (value: string, prop: 'color' | 'name') => {
    setSelectedCar((prev) => {
      if (prev) {
        return {
          ...prev,
          [prop]: value,
        };
      }
      return null;
    });
  };

  const fillInputsForCreatingCar = (value: string, prop: 'color' | 'name') => {
    setCreatingCar((prev) => ({
      ...prev,
      [prop]: value,
    }));
  };

  const changeColor = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target as HTMLInputElement;
    setColor(value);
    if (title === 'Update' && selectedCar) {
      updateConfSelectedCar(value, 'color');
    } else {
      fillInputsForCreatingCar(value, 'color');
    }
  };

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target as HTMLInputElement;
    setInput(value);
    if (title === 'Update' && selectedCar) {
      updateConfSelectedCar(value, 'name');
    } else {
      fillInputsForCreatingCar(value, 'name');
    }
  };

  const createCar = async (): Promise<void> => {
    const newCar = {
      name: input,
      color,
    };
    await ServerAPI.postCar(newCar);
    await fetchCars(currentPage);
    await fetchFullCars();
    setCreatingCar({
      name: '',
      color: '#000000',
    });
  };

  const updateCar = async (): Promise<void> => {
    if (selectedCar && fetchCars) {
      const updatedData = {
        name: input,
        color,
      };
      await ServerAPI.updateCar(selectedCar.id, updatedData);
      await fetchCars(currentPage);
      await fetchFullCars();
      setSelectedCar(null);
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  };

  const submitHandler = (event: React.FormEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    if (title === 'Create') {
      createCar();
    } else {
      updateCar();
    }
    setInput('');
    setColor('#000000');
  };

  React.useEffect(() => {
    if (title === 'Update' && selectedCar && inputRef.current) {
      setColor(selectedCar.color);
      setInput(selectedCar.name);
    } else if (title === 'Create' && creatingCar) {
      setColor(creatingCar.color);
      setInput(creatingCar.name);
    }
  }, [selectedCar]);

  return (
    <form className={`tuning ${isUnclickable ? 'tuning_unclickable' : ''}`}>
      <input type="text" value={input} onChange={inputHandler} ref={inputRef} />
      <input
        ref={colorInput}
        type="color"
        name="car-color"
        value={color}
        onChange={changeColor}
      />
      <CarIcon fill={color} />
      <Button title={title} onClick={submitHandler} type="success" />
    </form>
  );
};

export default CarTuning;
