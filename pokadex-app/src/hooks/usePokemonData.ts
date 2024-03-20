import { useState, useCallback } from 'react';
import axios from 'axios';
import { Globals } from '../services/GlobalServices/globals';
import { Pokemon, PokemonType } from '../Models/interface';

export const usePokemonData = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState(Globals.VITE_POKEAPI_BASE_URL);

  const fetchPokemons = useCallback(async () => {
    try {
      const response = await axios.get(nextUrl);
      const pokemonData: Pokemon[] = await Promise.all(
        response.data.results.map(
          async (result: { name: string; url: string }) => {
            const pokemonResponse = await axios.get(result.url);
            const { id, types } = pokemonResponse.data;
            return {
              ...result,
              id,
              types: types.map((type: PokemonType) => type.type.name),
            };
          }
        )
      );
      setPokemons((prevPokemons) => [
        ...new Set([...prevPokemons, ...pokemonData]),
      ]);
      setNextUrl(response.data.next);
    } catch (error) {
      console.error('There was an error fetching the Pokemon data:', error);
    }
  }, [nextUrl]);
  return { pokemons, fetchPokemons };
};
