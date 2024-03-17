import { Route, Routes, BrowserRouter } from 'react-router-dom';
import {Home} from '../src/pages/Home';
import {PokemonDetails} from './pages/PokemonDetails';



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;