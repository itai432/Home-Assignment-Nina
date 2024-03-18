import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Home } from '../src/pages/Home';
import { PokemonDetails } from './pages/PokemonDetails';
import Navbar from './components/Navbar';
import BackgroundImage from './components/BackgroundImage';

const App = () => {
  return (
    <BrowserRouter>
      <BackgroundImage>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:id" element={<PokemonDetails />} />
        </Routes>
      </BackgroundImage>
    </BrowserRouter>
  );
};

export default App;
