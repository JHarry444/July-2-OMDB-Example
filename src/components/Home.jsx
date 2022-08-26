import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Film from './Film';
import consts from '../consts.json';

function Home() {
  const location = useLocation();

  console.log('LOC:', location);
  const [search, setSearch] = useState(location?.state?.oldSearch || '');
  const [films, setFilms] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (search) {
        const { data: { Search } } = await axios.get(`http://www.omdbapi.com/?apikey=${consts.apiKey}&s=${search}`);
        if (Search) return setFilms(Search);
      }
      return setFilms([]);
    }

    fetchData();
  }, [search]);

  return (
    <>
      <section>
        <label htmlFor="filmSearch">
          Search:
          <input type="text" id="filmSearch" value={search} onChange={(e) => setSearch(e.target.value)} />
        </label>
      </section>
      <section>
        {films.map(({ imdbID, Title, Year }) => (
          <Film
            key={imdbID}
            id={imdbID}
            title={Title}
            year={Year}
            search={search}
          />
        ))}
      </section>
    </>
  );
}

export default Home;
