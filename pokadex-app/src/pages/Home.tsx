import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

interface Pokemon {
  name: string;
  url: string;
  id: number;
  types: string[];
}

export const Home: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  let nextUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=18';

  const fetchPokemons = useCallback(async () => {
    try {
      const response = await axios.get(nextUrl);
      const pokemonData = await Promise.all(
        response.data.results.map(
          async (result: { name: string; url: string }) => {
            const pokemonResponse = await axios.get(result.url);
            const { id, types } = pokemonResponse.data;
            return {
              ...result,
              id,
              types: types.map(
                (type: { type: { name: string } }) => type.type.name
              ),
            };
          }
        )
      );
      setPokemons((prevPokemons) => {
        const combinedPokemons = [...prevPokemons, ...pokemonData];
        const uniquePokemons = Array.from(
          new Map(
            combinedPokemons.map((pokemon) => [pokemon.id, pokemon])
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
        placeholder="Search Pokémon by name or ID or Type"
        className="bg-purple-200 outline-none text-xs placeholder-gray-500 px-2 py-3 rounded-full mb-4 w-80 text-center"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-6 gap-2">
        {filteredPokemons.map((pokemon) => {
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
          return (
            <div
              key={pokemon.id}
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
