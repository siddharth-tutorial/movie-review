import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import Movie from './pages/Movie';
import Header from './pages/Header';
import Tv from './pages/Tv';
import Footer from './pages/Footer';
import New from './pages/New';
import './App.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NetflixLoader from './pages/NetflixLoader';

function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element ={<Home/>}/>
        <Route path='/movie' element={<Movie/>}/>
        <Route path='/tv' element={<Tv/>}/> 
        <Route path='/new' element={<New/>}/>
        <Route path='/netflixloader' element={<NetflixLoader/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
