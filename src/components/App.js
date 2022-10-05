import { CharacterList } from './CharacterList';
import { NavBar } from './NavBar';
import { Searchform } from './Searchform';
import { Likes } from './Likes';
import { Routes, Route } from 'react-router-dom';
import { Episodes } from './Episodes';
import { Locations } from './Locations'
import { WatchList } from './WatchList';

function App() { 

  return (
    <div className='container-fluid px-0'>
      <NavBar />
      <Routes>
        <Route path='/' element={<Searchform />} />
        <Route path='characters' element={<CharacterList />} />
        <Route path='likes' element={<Likes />} />
        <Route path='episodes' element={<Episodes />} />
        <Route path='locations' element={<Locations />} />
        <Route path='watchlist' element={<WatchList />} />
      </Routes>
    </div>
  );
}

export default App;
