import axios from 'axios';
import { Globals } from '../services/GlobalServices/globals';

export const fetchPokemonDetails = async (id: string) => {
  try {
    const response = await axios.get(`${Globals.VITE_NEXT_PAGE}${id}`);
    return response.data;
  } catch (error) {
    console.error('There was an error fetching the details:', error);
    throw error;
  }
};
