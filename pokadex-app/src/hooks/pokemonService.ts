import axios from 'axios';
import { Globals } from '../services/GlobalServices/globals';
import { useQuery } from 'react-query';
import { PokemonDetailsProps } from '../Models/interface';

export const fetchPokemonDetails = async (id: string) => {
  try {
    const response = await axios.get(`${Globals.VITE_NEXT_PAGE}${id}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('There was an error fetching the details:', error);
    throw error;
  }
};


export const usePokemonWebCards = (id: string) => {
  return useQuery<PokemonDetailsProps, Error>(
    ['pokemonDetails', id], 
    () => fetchPokemonDetails(id), 
    {
      enabled: !!id, 
    }
  );
};