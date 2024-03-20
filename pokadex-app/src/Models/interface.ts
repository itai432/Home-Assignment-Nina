import { ReactNode } from 'react';

export interface PokemonDetailsProps {
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

export interface BackgroundImageProps {
  children: ReactNode;
}

export interface PokemonType {
  name: any;
  type: { name: string };
}

export interface Pokemon {
  name: string;
  url: string;
  id: number;
  types: string[];
}

export interface ButtonProps {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}
