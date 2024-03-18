import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Pokemon {
  name: string;
  url: string;
}

export const Home: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=30');
        setPokemons(response.data.results);
      } catch (error) {
        console.error('There was an error fetching the Pokemon data:', error);
      }
    };
    fetchPokemons();
  }, []);

  const getPokemonId = (url: string) => {
    const idPattern = /\/pokemon\/(\d+)\//;
    const match = url.match(idPattern);
    return match ? match[1] : null;
  };

  return (
    <div className="py-4 px-4 flex justify-center">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
        {pokemons.map((pokemon) => {
          const pokemonId = getPokemonId(pokemon.url);
          const imageUrl = pokemonId
            ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`
            : 'placeholder-image-url';
          return (
            <div key={pokemon.name} className="bg-white bg-opacity-80 rounded-lg overflow-hidden shadow-sm p-1">
              <Link to={`/pokemon/${pokemon.name}`} className="block">
                <div className="flex justify-center"> 
                  <img
                    className="w-38 h-38"
                    src={imageUrl}
                    alt={pokemon.name}
                  />
                </div>
                <div className="mt-1 text-center capitalize text-sm">{pokemon.name}</div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};