import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

interface PokemonDetails {
    name: string;
    id: number;
    height: number; 
    weight: number; 
    types: [ 
      {
        slot: number;
        type: {
          name: string;
          url: string;
        };
      }
    ];
    sprites: { 
      front_default: string;
      back_default: string;
      front_shiny?: string;
      back_shiny?: string;
    };
  }
  export const PokemonDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(null);
  
    useEffect(() => {
      const fetchPokemonDetails = async () => {
        try {
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
          setPokemonDetails(response.data);
        } catch (error) {
          console.error('There was an error fetching the details:', error);
        }
      };
  
      fetchPokemonDetails();
    }, [id]);
  
    if (!pokemonDetails) return <div>Loading...</div>;
  
    return (
      <div>
        <h1>{pokemonDetails.name}</h1>
        <p>ID: {pokemonDetails.id}</p>
        <p>Height: {pokemonDetails.height} dm</p>
        <p>Weight: {pokemonDetails.weight} hg</p>
        <div>
          Types:
          <ul>
            {pokemonDetails.types.map((typeInfo) => (
              <li key={typeInfo.slot}>{typeInfo.type.name}</li>
            ))}
          </ul>
        </div>
        <img src={pokemonDetails.sprites.front_default} alt={`Front sprite of ${pokemonDetails.name}`} />
        <button>
            <Link to={'/'}>back</Link>
        </button>
      </div>
    );
  };
  
  export default PokemonDetails;
  