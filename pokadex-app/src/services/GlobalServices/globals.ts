export class Globals {
  public static VITE_POKEAPI_BASE_URL: string;
  public static VITE_NEXT_PAGE: string;

  public static initialize() {
    Globals.VITE_POKEAPI_BASE_URL = import.meta.env.VITE_POKEAPI_BASE_URL;
    Globals.VITE_NEXT_PAGE = import.meta.env.VITE_NEXT_PAGE;
  }
}

Globals.initialize();
