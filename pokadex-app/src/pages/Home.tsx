import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { usePokemonData } from '../hooks/usePokemonData';

export const Home: React.FC = () => {
  const { pokemons, fetchPokemons } = usePokemonData();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
      pokemon.id.toString().startsWith(searchTerm) ||
      pokemon.types.some((type) =>
        type.toLowerCase().startsWith(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="py-4 px-4 flex flex-col items-center">
      <input
        type="search"
        placeholder="Search Pokémon by name, ID, or type"
        className="bg-purple-200 outline-none text-xs placeholder-gray-500 px-2 py-3 rounded-full mb-4 w-80 text-center"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 gap-2">
        {filteredPokemons.map((pokemon, index) => (
          <div
            key={`${pokemon.id}-${index}`}
            className="bg-white bg-opacity-90 rounded-lg overflow-hidden shadow-sm p-1"
          >
            <Link to={`/pokemon/${pokemon.name}`} className="block">
              <div className="flex justify-center">
                <img
                  className="w-37 h-37"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                  alt={pokemon.name}
                />
              </div>
              <div className="mt-1 text-center capitalize text-sm">
                {pokemon.name}
              </div>
            </Link>
          </div>
        ))}
      </div>
      <Button
        className="mt-4 bg-blue-500 text-white hover:bg-blue-700"
        onClick={fetchPokemons}
      >
        Load More
      </Button>
    </div>
  );
};
