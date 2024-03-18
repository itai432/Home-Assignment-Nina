import React, { ReactNode } from 'react';
import backgroundImage from '../images/backgroundSite.jpeg';

interface BackgroundImageProps {
  children: ReactNode;
}

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
