// == Imports : local
import { useNavigate } from 'react-router-dom';
import './AlbumCard.scss';

// == Component :
function AlbumCard({
  albumname, artistfullname, image, id,
}) {
  const navigate = useNavigate();
  const handleClick = (event) => {
    console.log(event.target.id);
    navigate(`/albums/${id}`);
  };
  return (
    <div className="AlbumCard" onClick={handleClick} style={{ backgroundImage: `linear-gradient(0deg, #00000070 28%, #00000000 33%), url(${image})` }}>
      <div className="AlbumCard-Description">
        <p className="AlbumCard-Title" id={id}>{albumname}</p>
        <p>{artistfullname}</p>
      </div>
    </div>
  );
}

export default AlbumCard;
