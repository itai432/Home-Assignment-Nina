import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

interface Pokemon {
  name: string;
  url: string;
}

export const Home: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  let nextUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=18';

  const fetchPokemons = useCallback(async () => {
    try {
      const response = await axios.get(nextUrl);
      setPokemons((prevPokemons) => {
        const combinedPokemons = [...prevPokemons, ...response.data.results];
        const uniquePokemons = Array.from(
          new Map(
            combinedPokemons.map((pokemon) => [
              getPokemonId(pokemon.url),
              pokemon,
            ])
          ).values()
        );
        return uniquePokemons;
      });
      nextUrl = response.data.next;
    } catch (error) {
      console.error('There was an error fetching the Pokemon data:', error);
    }
  }, []);

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  const loadMorePokemons = () => {
    fetchPokemons();
  };

  const getPokemonId = (url: string) => {
    const idPattern = /\/pokemon\/(\d+)\//;
    const match = url.match(idPattern);
    return match ? match[1] : null;
  };

  return (
    <div className="py-4 px-4 flex flex-col items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-6 gap-2">
        {pokemons.map((pokemon) => {
          const pokemonId = getPokemonId(pokemon.url);
          const imageUrl = pokemonId
            ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`
            : 'placeholder-image-url';
          return (
            <div
              key={pokemonId}
              className="bg-white bg-opacity-80 rounded-lg overflow-hidden shadow-sm p-1"
            >
              <Link to={`/pokemon/${pokemon.name}`} className="block">
                <div className="flex justify-center">
                  <img
                    className="w-37 h-37"
                    src={imageUrl}
                    alt={pokemon.name}
                  />
                </div>
                <div className="mt-1 text-center capitalize text-sm">
                  {pokemon.name}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <Button
        className="mt-4 bg-blue-500 text-white hover:bg-blue-700"
        onClick={loadMorePokemons}
      >
        Load More
      </Button>
    </div>
  );
};
