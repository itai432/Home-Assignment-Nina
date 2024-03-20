import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white bg-opacity-90 shadow-lg">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/" className="py-2">
            <span className="text-2xl font-bold text-gray-800">PokéDex</span>
          </Link>
          <div className="flex justify-center flex-grow ml-5"></div>
          <div className="py-2 invisible">
            <span className="text-2xl font-bold text-transparent">PokéDex</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
