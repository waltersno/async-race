import React from 'react';
import './button.scss';

interface BtnProps {
  title?: string;
  onClick: (event: React.FormEvent<HTMLButtonElement>) => void;
  type?: string;
  image?: string;
  isDisabled?: boolean;
}

const Button: React.FC<BtnProps> = ({
  title,
  onClick,
  type,
  image,
  isDisabled,
}): JSX.Element => (
  <button
    disabled={isDisabled}
    onClick={onClick}
    className={`button ${type}`}
    type="submit"
  >
    {title && title}
    {image && <img src={image} alt="" />}
  </button>
);

Button.defaultProps = {
  title: '',
  type: '',
  image: '',
  isDisabled: false,
};

export default Button;
