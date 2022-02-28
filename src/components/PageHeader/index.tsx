import React, { useContext } from 'react';
import { APIContext } from '../../context';
import PageSwitcher from '../Race/PageSwitcher';
import './pageHeader.scss';

interface IPageHeader {
  title: string;
}

const PageHeader: React.FC<IPageHeader> = ({ title }): JSX.Element => {
  const {
    cars: { carCount },
    winners: { winnersCount },
  } = useContext(APIContext);
  return (
    <div className="page-header">
      <h3>
        {title}
        {' '}
        (
        {title === 'Garage' ? carCount : winnersCount}
        )
      </h3>
      <PageSwitcher title={title} />
    </div>
  );
};
export default PageHeader;
