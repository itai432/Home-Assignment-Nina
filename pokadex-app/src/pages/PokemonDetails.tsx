import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import Loader from '../components/Loader';
import { Globals } from '../services/GlobalServices/globals';
import { PokemonDetailsProps } from '../Models/interface';

const fetchPokemonDetails = async (id: string) => {
  const response = await axios.get(`${Globals.VITE_NEXT_PAGE}${id}`);
  return response.data;
};

export const PokemonDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: pokemonDetails,
    isError,
    isLoading,
    error,
  } = useQuery<PokemonDetailsProps, Error>(
    ['pokemonDetails', id],
    () => fetchPokemonDetails(id!),
    { enabled: !!id }
  );

  if (isLoading) return <Loader />;

  if (isError) {
    console.error('There was an error fetching the details:', error);
    return <div className="flex justify-center">Failed to fetch data...</div>;
  }

  if (!pokemonDetails) return null;

  const officialArtwork =
    pokemonDetails.sprites.other?.['official-artwork'].front_default ||
    pokemonDetails.sprites.front_default;

  return (
    <div className="flex justify-center items-center py-8 px-8">
      <div className="relative bg-white bg-opacity-90 shadow-2xl rounded-lg p-8 w-full max-w-md text-center mx-auto">
        <h1 className="text-4xl font-extrabold mb-4 capitalize">
          {pokemonDetails.name}
        </h1>
        <img
          src={officialArtwork}
          alt={`Front view of ${pokemonDetails.name}`}
          className="mx-auto my-4 w-60 h-60 object-contain"
        />
        <p className="text-lg mb-1">Pokemon ID: {pokemonDetails.id}</p>
        <p className="text-lg mb-1">Height: {pokemonDetails.height / 10} m</p>
        <p className="text-lg mb-3">Weight: {pokemonDetails.weight / 10} kg</p>
        <div className="mb-4">
          Types:
          <ul className="flex justify-center">
            {pokemonDetails.types.map((typeInfo, index) => (
              <li
                key={index}
                className="capitalize bg-blue-200 text-blue-800 px-3 py-1 rounded-full m-1"
              >
                {typeInfo.type.name}
              </li>
            ))}
          </ul>
        </div>
        <Link
          to={'/'}
          className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-lg mt-4 transition-colors duration-300"
        >
          Back
        </Link>
      </div>
    </div>
  );
};
