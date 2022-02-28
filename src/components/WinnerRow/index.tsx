import React from 'react';
import { ReactComponent as CarIcon } from '../../assets/newcar.svg';

interface IWinnerRow {
  number: number;
  color: string;
  carModel: string;
  winsTime: number;
  bestTime: number;
}

const WinnerRow: React.FC<IWinnerRow> = ({
  number,
  color,
  carModel,
  winsTime,
  bestTime,
}): JSX.Element => (
  <tr>
    <td>{number}</td>
    <td>
      <CarIcon fill={color} />
    </td>
    <td>{carModel}</td>
    <td>{winsTime}</td>
    <td>{bestTime}</td>
  </tr>
);

export default WinnerRow;
