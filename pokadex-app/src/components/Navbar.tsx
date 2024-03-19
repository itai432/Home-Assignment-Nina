import React from 'react';
import { Link } from 'react-router-dom';
// import { mdiMagnify } from '@mdi/js';
// import Icon from '@mdi/react';

const Navbar: React.FC = () => {
  // const [searchTerm, setSearchTerm] = useState('');

  // const handleSearch = (e: React.FormEvent) => {
  //   e.preventDefault();
  // };

  return (
    <nav className="bg-white bg-opacity-25 shadow-lg">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/" className="py-2">
            <span className="text-2xl font-bold text-gray-800">PokéDex</span>
          </Link>
          <div className="flex justify-center flex-grow ml-5">
            {/* <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="search"
                placeholder="Search Pokémon by name or ID"
                className="bg-purple-200 outline-none text-xs placeholder-gray-500 px-2 py-3 rounded-l-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="p-2 rounded-r-full bg-purple-200 hover:bg-purple-300"
              >
                <Icon path={mdiMagnify} size={1} />
              </button>
            </form> */}
          </div>
          <div className="py-2 invisible">
            <span className="text-2xl font-bold text-transparent">PokéDex</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
