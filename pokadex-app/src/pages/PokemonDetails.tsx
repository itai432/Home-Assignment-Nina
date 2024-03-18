import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';

interface PokemonDetails {
  name: string;
  id: number;
  height: number;
  weight: number;
  types: {
    slot: number;
    type: {
      name: string;
    };
  }[];
  sprites: {
    front_default: string;
    back_default: string;
    front_shiny?: string;
    back_shiny?: string;
    other?: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
}
export const PokemonDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        setPokemonDetails(response.data);
      } catch (error) {
        console.error('There was an error fetching the details:', error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  if (loading) return <Loader />;
  if (!pokemonDetails)
    return <div className="flex justify-center">Failed to fetch data...</div>;

  const officialArtwork =
    pokemonDetails.sprites.other?.['official-artwork'].front_default ||
    pokemonDetails.sprites.front_default;

  return (
    <div className="flex justify-center items-center py-8 px-8">
      <div className="relative bg-white bg-opacity-80 shadow-2xl rounded-lg p-8 w-full max-w-md text-center mx-auto">
        <h1 className="text-4xl font-extrabold mb-4 capitalize">
          {pokemonDetails.name}
        </h1>
        <img
          src={officialArtwork}
          alt={`Front view of ${pokemonDetails.name}`}
          className="mx-auto my-4 w-60 h-60 object-contain"
        />
        <p className="text-lg mb-1">Pokemon ID: {pokemonDetails.id}</p>
        <p className="text-lg mb-1">
          Height: {pokemonDetails.height / 10} m
        </p>{' '}
        <p className="text-lg mb-3">Weight: {pokemonDetails.weight / 10} kg</p>{' '}
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
