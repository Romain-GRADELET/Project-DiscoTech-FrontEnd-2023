/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable no-alert */

// = Import : npm
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import api from '../../api/api';

// = Import : JSX
import Login from '../Form/Login/Login';
import SignUp from '../Form/SignUp/SignUp';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import LegalNotices from '../LegalNotices/LegalNotices';
import TermsofService from '../TermsofService/TermsofService';
import Favorites from '../Favorites/Favorites';
import AlbumPage from '../AlbumPage/AlbumPage';
import AboutUs from '../AboutUs/AboutUs';
import UserProfile from '../Form/UserProfile/UserProfile';
import HomePage from '../HomePage/HomePage';
import StylesPage from '../StylesPage/StylesPage';
import Header from '../Header/Header';
import SearchResult from '../SearchBar/SearchResult/SearchResult';
import BottomNavigation from '../BottomNavigation/BottomNavigation';

// = Import : Redux Actions
import { saveLoginSuccessful } from '../../actions/user';

// = Import : Style
import './App.scss';

// = App Component
function App() {
  const dispatch = useDispatch();
  const logged = useSelector((state) => state.user.logged);
  const [showToast, setShowToast] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [search, setSearch] = useState('');
  const [styles, setStyles] = useState([]);

  // for HomePage, get suggestions albums from api
  const getSuggestions = () => {
    api
      .post('/albums/random', { search: search })
      .then((res) => {
        console.log(res.data);
        setSuggestions(res.data);
      })
      .catch((err) => {
        console.log("Erreur, l'API ne fonctionne plus. Rechargez plus tard.");
        console.error(err);
      });
  };
  useEffect(getSuggestions, [search]);

  // for HomePage, get styles from api
  useEffect(() => {
    api.get('/styles')
      .then((res) => {
        setStyles(res.data);
      })
      .catch((err) => {
        alert('Erreur !');
        console.log('Erreur, l\'API ne fonctionne plus. Rechargez plus tard.');
        console.err(err);
      });
  }, []);

  // save token in localstorage
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      dispatch(saveLoginSuccessful());
    }
  }, []);
  // if user logged, show the toast (notification)
  useEffect(() => {
    if (logged) {
      setShowToast(true);
    }
  }, [logged]);

  return (
    <div className="App">
      {/* Components available on every page */}
      <NavBar />
      <Header />
      {/* URL routes for each component */}
      <Routes>
        <Route
          path="/"
          element={(
            <HomePage
              suggestions={suggestions}
              styles={styles}
              setSearch={setSearch}
              getSuggestions={getSuggestions}
              search={search}
            />
)}
        />
        <Route path="/connexion" element={<Login />} />
        <Route path="/inscription" element={<SignUp />} />
        <Route path="/styles" element={<StylesPage styles={styles} />} />
        <Route path="/favoris" element={<Favorites />} />
        <Route path="/mentions-legales" element={<LegalNotices />} />
        <Route path="/equipe-dev" element={<AboutUs />} />
        <Route path="/conditions-generales-utilisation" element={<TermsofService />} />
        <Route path="/le-projet" />
        <Route path="/albums/:id" element={<AlbumPage />} />
        <Route path="/profil" element={<UserProfile />} />
        <Route path="/resultat-recherche/:type/:search" element={<SearchResult />} />
        <Route path="/*" />
      </Routes>
      {/* Toast notification for connexion */}
      <Toast show={showToast} onClose={() => setShowToast(false)} style={{ position: 'fixed', left: '20px', bottom: '20px' }} delay={3000} autohide>
        <Toast.Body style={{ color: 'black' }}>
          Vous êtes bien connecté.
        </Toast.Body>
      </Toast>
      {/* Navigation for mobile users */}
      <BottomNavigation />
      <Footer />
    </div>
  );
}

// = Export
export default App;
