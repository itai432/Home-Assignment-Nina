import React from 'react';
import backgroundImage from '../images/pokemonBackground.jpg';
import { BackgroundImageProps } from '../Models/interface';

const BackgroundImage: React.FC<BackgroundImageProps> = ({ children }) => {
  return (
    <div
      className=" bg-repeat min-h-screen overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {children}
    </div>
  );
};

export default BackgroundImage;
