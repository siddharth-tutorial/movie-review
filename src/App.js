import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import Movie from './pages/Movie';
import { useState } from 'react';
import Header from './pages/Header';
import Moviedetail from './pages/Moviedetail';
import Tv from './pages/Tv';
import Footer from './pages/Footer';
import New from './pages/New';
import './App.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <div className="App">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <Routes>
        <Route path='/' element ={<Home/>}/>
        <Route path='/movie' element={<Movie/>}/>
        <Route path='/tv' element={<Tv/>}/> 
        <Route path='/new' element={<New/>}/>
         {/* Unified route for movie and tv show details */}
       <Route path="/detail/:id" element={<Moviedetail />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
