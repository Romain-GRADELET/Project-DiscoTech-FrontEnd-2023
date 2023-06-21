import AlbumCard from '../HomePage/AlbumCard/AlbumCard';
// import favoritesAlbums from '../../data/data';
import './Favorites.scss';
import Header from '../Header/Header';

function Favorites({ albums }) {
  return (
    <>
      <Header />
      <header className="Favorites-Title">
        <h2>Mes Favoris :</h2>
      </header>
      <div className="HomePage-Container">
        {albums.map((album) => (
          <AlbumCard
            className="HomePage-Card"
            key={album.id}
            albumname={album.name}
            artistfullname={album.artist?.fullname ?? 'Artiste inconnu'}
            image={album.image}
          />
        ))}
      </div>
    </>
  );
}
export default Favorites;
