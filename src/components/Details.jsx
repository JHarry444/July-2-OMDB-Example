import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import consts from '../consts.json';

function Details() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [film, setFilm] = useState({ Title: '' });

  useEffect(() => {
    async function getFilm() {
      const { data } = await axios.get(`http://www.omdbapi.com/?apikey=${consts.apiKey}&i=${id}`);
      setFilm(data);
    }
    getFilm();
  }, [id]);

  const { Poster, Title, ...rest } = film;
  return (
    <>
      <button type="button" onClick={() => navigate('/', { state: { oldSearch: location.state.search } })}>{'<- Back to search'}</button>
      <h1>{Title}</h1>
      <div style={{
        display: 'flex',
        'justify-content': 'space-around',
      }}
      >
        <div>
          <img src={Poster} alt="film-poster" />
        </div>
        <div>
          {Object.keys(rest).map((key) => <p key={key}>{`${key}: ${rest[key]}`}</p>)}
        </div>
      </div>
    </>
  );
}

export default Details;
