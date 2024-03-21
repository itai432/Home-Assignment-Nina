import { useState, useCallback } from 'react';
import axios from 'axios';
import { Globals } from '../services/GlobalServices/globals';
import { Pokemon, PokemonType } from '../Models/interface';

export const usePokemonData = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string>(Globals.VITE_POKEAPI_BASE_URL);

  const fetchPokemons = useCallback(async () => {
    try {
      const response = await axios.get<{ results: { name: string; url: string }[], next: string }>(nextUrl);
      const newPokemons: Pokemon[] = await Promise.all(
        response.data.results.map(async (result: { name: string; url: string }) => {
          const pokemonResponse = await axios.get<{ id: number, types: PokemonType[] }>(result.url);
          const { id, types } = pokemonResponse.data;
          return {
            name: result.name,
            url: result.url,
            id,
            types: types.map((typeInfo) => typeInfo.type.name),
          };
        })
      );

      setPokemons((prevPokemons) => {
        const pokemonMap = new Map<number, Pokemon>(prevPokemons.map((pokemon) => [pokemon.id, pokemon]));
        newPokemons.forEach((pokemon) => pokemonMap.set(pokemon.id, pokemon));
        return Array.from(pokemonMap.values());
      });

      setNextUrl(response.data.next);
    } catch (error) {
      console.error('There was an error fetching the Pokemon data:', error);
    }
  }, [nextUrl]);

  return { pokemons, fetchPokemons };
};