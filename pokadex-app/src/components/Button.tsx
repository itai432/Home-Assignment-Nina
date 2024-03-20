import React from 'react';
import { ButtonProps } from '../Models/interface';

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;